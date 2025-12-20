import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
  href: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link
          key={product.id}
          to={product.href}
          className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {product.badge && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
              {product.badge}
            </div>
          )}
          
          <div className="aspect-square bg-muted/30 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="p-6">
            <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">{product.price}</span>
              <Button size="sm" variant="ghost" className="rounded-full">
                Shop Now →
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
