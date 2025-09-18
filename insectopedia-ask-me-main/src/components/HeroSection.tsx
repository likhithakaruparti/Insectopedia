import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Bug } from "lucide-react";
import heroImage from "@/assets/insect-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center nature-gradient overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Beautiful butterfly wing macro photography" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-6">
          <Bug className="w-12 h-12 text-accent-glow mr-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            RAG System
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          Shoot your Query and get instant AI-powered answers. 
          Our RAG system processes your data and provides intelligent responses to any query.
        </p>
        
        {/* Search Interface */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input 
              placeholder="Click here to get started"
              className="w-full h-14 pl-6 pr-16 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-card rounded-2xl focus:ring-2 focus:ring-accent-glow transition-organic"
              disabled
            />
            <Button 
              variant="accent" 
              size="lg"
              className="absolute right-2 top-2 h-10 px-6 rounded-xl"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="px-8 py-4 text-lg rounded-xl" onClick={() => window.location.href = '/rag'}>
            Click here to Start
            <ArrowRight className="ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-xl bg-white/10 border-white/30 text-white hover:bg-white/20">
            Learn More
          </Button>
        </div>
        
        {/* Process Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            "1. Enter your query",
            "2. AI Processes Data",
            "3. Ask Questions & Get Answers"
          ].map((step, index) => (
            <div 
              key={index}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 border border-white/20"
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse delay-1000" />
    </section>
  );
};

export default HeroSection;