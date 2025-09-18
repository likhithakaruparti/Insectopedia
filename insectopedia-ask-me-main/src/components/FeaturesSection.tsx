import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Database, Zap, BookOpen, Users, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-accent" />,
      title: "AI-Powered Intelligence",
      description: "Advanced RAG technology provides accurate, contextual answers about insect behavior, biology, and ecology."
    },
    {
      icon: <Database className="w-8 h-8 text-accent" />,
      title: "Comprehensive Database",
      description: "Access vast collections of entomological research, field studies, and taxonomic classifications."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Instant Responses",
      description: "Get immediate answers to complex questions about insect species, habitats, and characteristics."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-accent" />,
      title: "Educational Focus",
      description: "Perfect for students, researchers, and nature enthusiasts seeking reliable insect knowledge."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Expert Validated",
      description: "Information sourced from peer-reviewed research and validated by entomology experts."
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Always Accurate",
      description: "Reliable, up-to-date information backed by scientific literature and research data."
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose Insectopedia?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the power of AI-driven insect knowledge retrieval designed for accuracy, speed, and comprehensive understanding.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-accent transition-organic hover:scale-105 border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;