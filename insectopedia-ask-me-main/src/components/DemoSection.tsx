import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const DemoSection = () => {
  const demoQuestions = [
    {
      question: "How do monarch butterflies navigate during migration?",
      answer: "Monarch butterflies use a combination of the sun's position, magnetic fields, and genetic programming to navigate over 3,000 miles during migration. They have a circadian clock in their antennae that helps them maintain direction, and they can sense polarized light patterns in the sky even on cloudy days."
    },
    {
      question: "What makes firefly bioluminescence so efficient?",
      answer: "Firefly bioluminescence achieves nearly 96% efficiency through a chemical reaction involving luciferin, luciferase enzyme, ATP, and oxygen. This makes it one of the most efficient light sources in nature, producing almost no heat - a process called 'cold light' that far exceeds human-made lighting efficiency."
    },
    {
      question: "How strong are leafcutter ant colonies compared to humans?",
      answer: "A single leafcutter ant can carry leaf fragments 50 times its own body weight. Their colonies can contain up to 8 million ants working together, creating underground fungus gardens. If scaled to human size, an ant would be able to lift a car over its head and run marathons while carrying it."
    }
  ];

  return (
    <section className="py-20 px-6 nature-gradient">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-accent mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              See It In Action
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of Insectopedia with real questions and detailed, scientific answers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {demoQuestions.map((demo, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-accent transition-organic border-border/30 bg-card/90 backdrop-blur-sm"
            >
              <CardHeader>
                <CardTitle className="flex items-start text-lg text-card-foreground">
                  <MessageCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{demo.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-xl p-6 border-l-4 border-accent">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {demo.answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="px-8 py-4 text-lg rounded-xl">
            Try Insectopedia Now
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;