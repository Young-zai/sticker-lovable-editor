import { ArrowRight } from "lucide-react";

const workflowSteps = [
  {
    id: "upload",
    step: "01",
    title: "Upload Your Design",
    description: "Send us your artwork, logo, or photo – any file works.",
    gradient: "from-peach/60 to-coral/30",
    textColor: "text-coral",
  },
  {
    id: "customize",
    step: "02",
    title: "Customize Sticker",
    description: "Choose size, shape, material & any quantity.",
    gradient: "from-mint/60 to-teal/30",
    textColor: "text-teal",
  },
  {
    id: "proof",
    step: "03",
    title: "Instant Proof",
    description: "Receive instant digital proof. Unlimited edits before printing.",
    gradient: "from-lavender/60 to-primary/30",
    textColor: "text-primary",
  },
  {
    id: "ship",
    step: "04",
    title: "Print & Ship",
    description: "1-day turnaround, with shipping from the U.S.",
    gradient: "from-soft-yellow/60 to-warm-orange/30",
    textColor: "text-warm-orange",
  },
];

const ProductionWorkflow = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header - Centered */}
        <div className="text-center mb-8 md:mb-10">
          <span className="text-sm font-medium text-teal uppercase tracking-wider">HOW IT WORKS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            Production Workflow
          </h2>
        </div>

        {/* Steps - Horizontal Cards with Arrows */}
        <div className="flex flex-wrap justify-center items-stretch gap-2 max-w-5xl mx-auto">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Card */}
              <div 
                className={`bg-gradient-to-br ${step.gradient} rounded-2xl p-5 md:p-6 w-[160px] md:w-[200px] text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl border border-white/50`}
              >
                {/* Step Number Badge */}
                <span className={`inline-block text-xs font-bold ${step.textColor} bg-white/80 px-3 py-1 rounded-full mb-3 shadow-sm`}>
                  STEP {step.step}
                </span>
                
                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-foreground mb-2 leading-tight">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow Connector - Hide on last item and mobile */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:flex items-center px-2 md:px-4">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-teal/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionWorkflow;
