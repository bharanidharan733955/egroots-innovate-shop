import { Button } from "@/components/ui/button";
// import heroImage from "@/assets/hero-banner.jpg";
import circuitVideo from "@/assets/circuit.mp4";
import { ArrowRight, Zap, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <video
    src={circuitVideo}  
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 left-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}} />
      <div className="absolute top-40 left-1/3 w-16 h-16 bg-secondary/20 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-foreground">Empowering</span>
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Future Innovators
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Discover cutting-edge electronics, 3D printing kits, and robotics designed 
              for young tech enthusiasts and students ready to shape tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="tech-hover group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="tech-hover border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 glass p-4 rounded-lg tech-hover">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Innovative Tech</h3>
                  <p className="text-sm text-muted-foreground">Latest electronics & kits</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 glass p-4 rounded-lg tech-hover">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Student Focused</h3>
                  <p className="text-sm text-muted-foreground">Educational & competitive</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 glass p-4 rounded-lg tech-hover">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Community</h3>
                  <p className="text-sm text-muted-foreground">Join fellow innovators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;