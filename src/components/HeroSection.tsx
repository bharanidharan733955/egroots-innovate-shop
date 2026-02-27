import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#E8F0FE]" />
        <div className="absolute top-24 right-32 w-10 h-10 rounded-full bg-[#DCEBFF]" />
        <div className="absolute top-44 left-1/3 w-3 h-3 rounded-full bg-[#26A044]" />
        <div className="absolute bottom-32 left-24 w-10 h-10 rounded-full bg-[#F5EFD0]" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#1f2937]">
            Bridging Theoretical{" "}
            <span className="text-[#26A044]">Learning</span>
            <br />
            and Practical{" "}
            <span className="text-[#26A044]">Engineering</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            Empowering the next generation of engineers with hands-on STEM kits,
            robotics solutions, and custom development tools designed for real-world impact.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#1f2937] hover:bg-[#111827] text-white">
              <Link to="/products">
                Explore Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-700">
              <Link to="/about">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
          <div className="rounded-2xl bg-[#EAF7EE] px-5 py-4">
            <div className="text-2xl font-bold text-[#1f2937]">5000+</div>
            <div className="text-xs uppercase tracking-wide text-slate-600">Students Reached</div>
          </div>
          <div className="rounded-2xl bg-[#E9F0FF] px-5 py-4">
            <div className="text-2xl font-bold text-[#1f2937]">200+</div>
            <div className="text-xs uppercase tracking-wide text-slate-600">Projects Done</div>
          </div>
          <div className="rounded-2xl bg-[#FFF6D8] px-5 py-4">
            <div className="text-2xl font-bold text-[#1f2937]">50+</div>
            <div className="text-xs uppercase tracking-wide text-slate-600">Enterprise Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;