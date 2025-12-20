import { AutoModel, AutoProcessor, RawImage, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

let modelInstance: any = null;
let processorInstance: any = null;
let isLoading = false;

// Load the RMBG model (specifically designed for background removal)
async function loadModel(onProgress?: (progress: string) => void) {
  if (modelInstance && processorInstance) {
    return { model: modelInstance, processor: processorInstance };
  }

  if (isLoading) {
    // Wait for existing load to complete
    while (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return { model: modelInstance, processor: processorInstance };
  }

  isLoading = true;
  
  try {
    onProgress?.('Loading AI model (first time may take a moment)...');
    
    // Use RMBG-1.4 model which is specifically designed for background removal
    modelInstance = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
      // Use WebGPU if available, fallback to WASM
      device: 'webgpu',
    });
    
    processorInstance = await AutoProcessor.from_pretrained('briaai/RMBG-1.4');
    
    return { model: modelInstance, processor: processorInstance };
  } finally {
    isLoading = false;
  }
}

export const removeBackground = async (
  imageElement: HTMLImageElement,
  onProgress?: (progress: string) => void
): Promise<Blob> => {
  try {
    const { model, processor } = await loadModel(onProgress);
    
    onProgress?.('Processing image...');
    
    // Create a canvas to get the image data
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize if needed
    let width = imageElement.naturalWidth || imageElement.width;
    let height = imageElement.naturalHeight || imageElement.height;
    
    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    // Get image as blob URL for RawImage
    const imageDataUrl = canvas.toDataURL('image/png');
    
    // Load image using RawImage
    const image = await RawImage.fromURL(imageDataUrl);
    
    onProgress?.('Analyzing image...');
    
    // Process the image
    const { pixel_values } = await processor(image);
    
    onProgress?.('Removing background...');
    
    // Run the model
    const { output } = await model({ input: pixel_values });
    
    // Get the mask from model output
    const maskData = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(width, height);
    
    onProgress?.('Applying mask...');
    
    // Apply the mask to the original image
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputCtx = outputCanvas.getContext('2d');
    
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    // Draw original image
    outputCtx.drawImage(canvas, 0, 0);
    
    // Get image data and apply mask
    const outputImageData = outputCtx.getImageData(0, 0, width, height);
    const data = outputImageData.data;
    
    // Apply mask to alpha channel
    for (let i = 0; i < maskData.data.length; i++) {
      data[i * 4 + 3] = maskData.data[i]; // Set alpha from mask
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    onProgress?.('Finalizing...');
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    // Reset model instances on error to allow retry
    modelInstance = null;
    processorInstance = null;
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};

// Extract contour points from an image with transparency
export const extractContourPoints = (
  imageData: ImageData,
  threshold: number = 128,
  simplifyTolerance: number = 2
): { x: number; y: number }[] => {
  const { width, height, data } = imageData;
  const points: { x: number; y: number }[] = [];
  
  // Find edge pixels (pixels where alpha transitions from transparent to opaque)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const alpha = data[idx + 3];
      
      if (alpha >= threshold) {
        // Check if this is an edge pixel (has a transparent neighbor)
        const isEdge = 
          (x === 0 || data[((y) * width + (x - 1)) * 4 + 3] < threshold) ||
          (x === width - 1 || data[((y) * width + (x + 1)) * 4 + 3] < threshold) ||
          (y === 0 || data[((y - 1) * width + x) * 4 + 3] < threshold) ||
          (y === height - 1 || data[((y + 1) * width + x) * 4 + 3] < threshold);
        
        if (isEdge) {
          points.push({ x, y });
        }
      }
    }
  }
  
  if (points.length === 0) return [];
  
  // Order points to form a contour using nearest neighbor
  const orderedPoints: { x: number; y: number }[] = [];
  const used = new Set<number>();
  
  // Start from the topmost-leftmost point
  let currentIdx = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].y < points[currentIdx].y || 
        (points[i].y === points[currentIdx].y && points[i].x < points[currentIdx].x)) {
      currentIdx = i;
    }
  }
  
  orderedPoints.push(points[currentIdx]);
  used.add(currentIdx);
  
  // Find nearest neighbors
  while (orderedPoints.length < points.length && orderedPoints.length < 500) {
    const last = orderedPoints[orderedPoints.length - 1];
    let nearestIdx = -1;
    let nearestDist = Infinity;
    
    for (let i = 0; i < points.length; i++) {
      if (used.has(i)) continue;
      const dist = Math.sqrt(
        Math.pow(points[i].x - last.x, 2) + 
        Math.pow(points[i].y - last.y, 2)
      );
      if (dist < nearestDist && dist < 20) { // Max distance threshold
        nearestDist = dist;
        nearestIdx = i;
      }
    }
    
    if (nearestIdx === -1) break;
    
    orderedPoints.push(points[nearestIdx]);
    used.add(nearestIdx);
  }
  
  // Simplify the contour using Douglas-Peucker algorithm
  return simplifyContour(orderedPoints, simplifyTolerance);
};

function simplifyContour(
  points: { x: number; y: number }[],
  tolerance: number
): { x: number; y: number }[] {
  if (points.length <= 2) return points;
  
  // Find the point with the maximum distance
  let maxDist = 0;
  let maxIdx = 0;
  
  const first = points[0];
  const last = points[points.length - 1];
  
  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], first, last);
    if (dist > maxDist) {
      maxDist = dist;
      maxIdx = i;
    }
  }
  
  if (maxDist > tolerance) {
    const left = simplifyContour(points.slice(0, maxIdx + 1), tolerance);
    const right = simplifyContour(points.slice(maxIdx), tolerance);
    return [...left.slice(0, -1), ...right];
  }
  
  return [first, last];
}

function perpendicularDistance(
  point: { x: number; y: number },
  lineStart: { x: number; y: number },
  lineEnd: { x: number; y: number }
): number {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  
  if (dx === 0 && dy === 0) {
    return Math.sqrt(
      Math.pow(point.x - lineStart.x, 2) + 
      Math.pow(point.y - lineStart.y, 2)
    );
  }
  
  const t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (dx * dx + dy * dy);
  const closestX = lineStart.x + t * dx;
  const closestY = lineStart.y + t * dy;
  
  return Math.sqrt(
    Math.pow(point.x - closestX, 2) + 
    Math.pow(point.y - closestY, 2)
  );
}
