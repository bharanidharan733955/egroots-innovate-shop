import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, MessageCircle, Linkedin, Youtube, Trophy, School, Users, BookOpen, Bot, Cpu, Printer, GraduationCap, Award, Package, Zap, Hand, Wrench, UserCheck, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [openItem, setOpenItem] = useState<"STEM" | "STEAM" | "STREAM" | null>("STEM");
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  const toggleItem = (item: "STEM" | "STEAM" | "STREAM") => {
    setOpenItem(prev => (prev === item ? null : item));
  };

  // Intersection Observer for Statistics section - only trigger once
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isStatsVisible) {
            setIsStatsVisible(true);
            // Unobserve after first trigger so animation only happens once
            if (statsRef.current) {
              observer.unobserve(statsRef.current);
            }
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isStatsVisible]);

  // Social media links - update with your actual links
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/egroots.in?igsh=MXJla2V2NXA2NHRuZA%3D%3D&utm_source=qr",
      icon: Instagram,
      color: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/918015221905",
      icon: MessageCircle,
      color: "bg-green-500"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/e-groots/",
      icon: Linkedin,
      color: "bg-blue-700"
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@E-GROOTS",
      icon: Youtube,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Navigation />
      <HeroSection />

      {/* Trusted By Section */}
      <section className="bg-white pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
            Trusted by leading institutions
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-sm font-semibold text-slate-500">
            <span>TechCorp</span>
            <span>EduSmart</span>
            <span>RoboSystems</span>
            <span>InnovateX</span>
            <span>FutureLabs</span>
            <span>StemWorld</span>
          </div>
        </div>
      </section>

      {/* STREAM SECTION – dropdown + empty blue boxes */}
      <section className="bg-[#F1FFF7] pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left narrative */}
          <div>
            <h3 className="text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-[#26A044] mb-3">
              We can't perform a day‑to‑day activity without STREAM
            </h3>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              The limitation with classic STEM education is that it follows the
              same learn–demonstrate–forget model. It does not reflect the
              intelligence of the learner, but the engagement model and the
              outcome.
            </p>
            <p className="mt-4 text-sm md:text-base text-slate-700 leading-relaxed">
              At E‑Groots, STREAM brings in key differentiators such as{" "}
              <span className="font-semibold text-slate-900">PLAY</span> with
              science and art,{" "}
              <span className="font-semibold text-slate-900">PRACTICE</span> with
              engineering and technology, and{" "}
              <span className="font-semibold text-slate-900">PROGRESS</span>{" "}
              through research and innovation.
            </p>
          </div>

          {/* Right: STEM / STEAM / STREAM accordion */}
          <div className="space-y-3">
            {/* STEM */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleItem("STEM")}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Book icon */}
                  <div className="w-10 h-10 rounded-md bg-[#15315B] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="6" r="3" fill="white"/>
                      <path d="M5 12C5 12 6 11 10 11C14 11 15 12 15 12V16C15 16 14 15 10 15C6 15 5 16 5 16V12Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900 text-sm md:text-base">
                    STEM
                  </span>
                </div>
                <span className="text-xl leading-none text-slate-400">
                  {openItem === "STEM" ? "−" : "+"}
                </span>
              </button>
              {openItem === "STEM" && (
                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
                  Science, Technology, Engineering, Math – a strong technical
                  foundation but often limited in creativity, research and
                  application.
                </div>
              )}
            </div>

            {/* STEAM */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleItem("STEAM")}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#15315B] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="6" r="3" fill="white"/>
                      <path d="M5 12C5 12 6 11 10 11C14 11 15 12 15 12V16C15 16 14 15 10 15C6 15 5 16 5 16V12Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900 text-sm md:text-base">
                    STEAM
                  </span>
                </div>
                <span className="text-xl leading-none text-slate-400">
                  {openItem === "STEAM" ? "−" : "+"}
                </span>
              </button>
              {openItem === "STEAM" && (
                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
                  Adds Arts to STEM, encouraging creative expression and
                  design‑thinking alongside technical skills.
                </div>
              )}
            </div>

            {/* STREAM */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleItem("STREAM")}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#15315B] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="6" r="3" fill="white"/>
                      <path d="M5 12C5 12 6 11 10 11C14 11 15 12 15 12V16C15 16 14 15 10 15C6 15 5 16 5 16V12Z" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-900 text-sm md:text-base">
                    STREAM
                  </span>
                </div>
                <span className="text-xl leading-none text-slate-400">
                  {openItem === "STREAM" ? "−" : "+"}
                </span>
              </button>
              {openItem === "STREAM" && (
                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
                  Science, Technology, Research, Engineering, Arts and Math –
                  emphasising experimentation, data and innovation‑driven
                  projects.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STREAM formula heading */}
        <div className="max-w-6xl mx-auto px-4 mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#26A044] mb-3 uppercase">
            STREAM: beyond STEM and STEAM education
          </h3>
          <p className="text-sm md:text-base font-medium text-slate-800">
            Science + Technology + Research + Engineering + Arts + Math
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image/Graphic */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[#15315B] to-[#26A044] rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#15315B] rounded-full flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-6xl font-bold mb-4">
                      <span className="text-orange-400">S</span>
                      <span className="text-green-400">T</span>
                      <span className="text-blue-400">E</span>
                      <span className="text-yellow-400">M</span>
                    </div>
                    <p className="text-xl font-semibold mb-2">EDUCATION</p>
                    <div className="bg-[#26A044] rounded-lg px-4 py-2 inline-block mt-4">
                      <p className="text-2xl font-bold">5+</p>
                      <p className="text-sm">Years Of STEM Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#26A044] px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span>%</span>
                <span>About Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#15315B] mb-4">
                Empowering Students Through Practical STEM Learning
              </h2>
              <p className="text-base text-slate-700 mb-6 leading-relaxed">
                E-Groots STEM Academy is committed to transforming education through hands-on learning in Robotics, AI, IoT, Automation, Drones, and 3D technologies. We bridge the gap between classroom theory and real-world application.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Student-Centered Learning</h3>
                    <p className="text-sm text-slate-600">
                      We focus on practical, project-based learning that builds creativity, confidence, and problem-solving skills.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Expert Mentors</h3>
                    <p className="text-sm text-slate-600">
                      Our experienced trainers guide students with industry-relevant tools, technologies, and real-time projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-16 bg-[#15315B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className={`bg-white/10 backdrop-blur-sm border-white/20 text-center ${isStatsVisible ? 'animate-slide-up-scale' : 'opacity-0'}`} style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
              <CardContent className={`p-6 ${isStatsVisible ? 'animate-float' : ''}`} style={{ animationDelay: '0.8s' }}>
                <Trophy className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-sm text-blue-200">Student Projects Guided</div>
              </CardContent>
            </Card>
            
            <Card className={`bg-white/10 backdrop-blur-sm border-white/20 text-center ${isStatsVisible ? 'animate-slide-up-scale' : 'opacity-0'}`} style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <CardContent className={`p-6 ${isStatsVisible ? 'animate-float' : ''}`} style={{ animationDelay: '1s' }}>
                <School className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">250+</div>
                <div className="text-sm text-blue-200">Schools & Colleges Served</div>
              </CardContent>
            </Card>
            
            <Card className={`bg-white/10 backdrop-blur-sm border-white/20 text-center ${isStatsVisible ? 'animate-slide-up-scale' : 'opacity-0'}`} style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <CardContent className={`p-6 ${isStatsVisible ? 'animate-float' : ''}`} style={{ animationDelay: '1.2s' }}>
                <BookOpen className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-sm text-blue-200">Workshops & Training Programs</div>
              </CardContent>
            </Card>
            
            <Card className={`bg-white/10 backdrop-blur-sm border-white/20 text-center ${isStatsVisible ? 'animate-slide-up-scale' : 'opacity-0'}`} style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <CardContent className={`p-6 ${isStatsVisible ? 'animate-float' : ''}`} style={{ animationDelay: '1.4s' }}>
                <Award className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">20+</div>
                <div className="text-sm text-blue-200">STEM Programs Delivered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#E8F5E9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#26A044] px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span>⚙️</span>
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#15315B] mb-2">
              What We Offer To <span className="text-[#26A044]">Students & Institutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#E8F5E9] border-2 border-[#26A044]/20 hover:border-[#26A044] transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#26A044]/10 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-[#26A044]" />
                </div>
                <h3 className="text-xl font-bold text-[#15315B] mb-3">Robotics & Automation</h3>
                <p className="text-sm text-slate-700 mb-4">
                  Hands-on robotics and automation training that helps students understand real-world engineering concepts through practical projects.
                </p>
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-16 h-16 text-[#26A044] opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E8F5E9] border-2 border-[#26A044]/20 hover:border-[#26A044] transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#26A044]/10 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-8 h-8 text-[#26A044]" />
                </div>
                <h3 className="text-xl font-bold text-[#15315B] mb-3">AI & IoT</h3>
                <p className="text-sm text-slate-700 mb-4">
                  Practical learning programs in Artificial Intelligence and Internet of Things using real-time applications and devices.
                </p>
                <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-[#26A044] opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E8F5E9] border-2 border-[#26A044]/20 hover:border-[#26A044] transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#26A044]/10 rounded-lg flex items-center justify-center mb-4">
                  <Printer className="w-8 h-8 text-[#26A044]" />
                </div>
                <h3 className="text-xl font-bold text-[#15315B] mb-3">3D Design & Printing</h3>
                <p className="text-sm text-slate-700 mb-4">
                  Training in 3D designing and 3D printing to encourage creativity, prototyping, and product development skills.
                </p>
                <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center">
                  <Printer className="w-16 h-16 text-[#26A044] opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#E8F5E9] border-2 border-[#26A044]/20 hover:border-[#26A044] transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#26A044]/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-[#26A044]" />
                </div>
                <h3 className="text-xl font-bold text-[#15315B] mb-3">STEM Labs & Workshops</h3>
                <p className="text-sm text-slate-700 mb-4">
                  Complete STEM and ATL lab setup, workshops, and project guidance for schools and colleges.
                </p>
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-16 h-16 text-[#26A044] opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose E‑Groots – same background */}
      <section className="py-16 bg-[#F1FFF7]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Why choose <span className="text-primary">E‑Groots?</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              A focused catalog, engineering‑first support and infrastructure
              designed for schools, labs and high‑performance student teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Quality hardware
                </h3>
                <p className="text-sm text-slate-600">
                  Components and kits sourced from trusted partners and
                  validated in real projects.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Student‑centric design
                </h3>
                <p className="text-sm text-slate-600">
                  Kits, pricing and content tailored for classrooms, clubs and
                  hackathons.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Engineering support
                </h3>
                <p className="text-sm text-slate-600">
                  Guidance from engineers experienced in embedded systems,
                  robotics and power electronics.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-tech-orange" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Reliable logistics
                </h3>
                <p className="text-sm text-slate-600">
                  Predictable dispatch and tracking so project timelines stay
                  under control.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Building Future-Ready STEM Environments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              {/* Banner */}
              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#26A044] px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Rocket className="w-4 h-4" />
                <span>Our Vision & Mission</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#15315B]">Building Future-Ready</span>{" "}
                <span className="text-[#26A044]">STEM Environments</span>
              </h2>

              {/* Description */}
              <p className="text-base text-slate-700 mb-8 leading-relaxed">
                To build active, future-ready STEM learning environments that inspire innovation and practical skill development in every school.
              </p>

              {/* Three Feature Cards */}
              <div className="space-y-6">
                {/* Feature 1: Hands-on Mission */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#26A044] rounded-full flex items-center justify-center flex-shrink-0">
                    <Hand className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">Hands-on Mission</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We make STEM learning simple, practical, and hands-on while providing complete lab setup with dedicated technical support.
                    </p>
                  </div>
                </div>

                {/* Feature 2: STEM & ATL Lab Support */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#26A044] rounded-full flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">STEM & ATL Lab Support</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Tinkzo Labs activates school labs with structured practical sessions, clear learning modules, and dependable technical support.
                    </p>
                  </div>
                </div>

                {/* Feature 3: Dedicated Skilled Trainers */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#26A044] rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">Dedicated Skilled Trainers</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      A full-time technically skilled trainer is placed at your school to run sessions, maintain the lab, and support student learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Images */}
            <div className="space-y-4">
              {/* Top Image */}
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-6">
                  <Bot className="w-20 h-20 text-[#26A044] mx-auto mb-4 opacity-60" />
                  <p className="text-sm text-slate-600">Students working on robotics projects</p>
                </div>
              </div>

              {/* Bottom Image */}
              <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-6">
                  <Cpu className="w-20 h-20 text-[#26A044] mx-auto mb-4 opacity-60" />
                  <p className="text-sm text-slate-600">Hands-on STEM learning in action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />

      {/* Footer */}
      <footer className="bg-[#E8F5E9] border-t border-[#26A044]/20 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#26A044] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EG</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#15315B]">E‑Groots</h3>
                  <p className="text-xs text-slate-700">
                    Empowering future innovators
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-700">
                Door No. 1/144-1, Mahadhanapuram, Krishnarayapuram Taluk, Karur –
                639102.
              </p>
              <p className="text-sm text-slate-700">
                GST.No : 33ICSPP2555M1ZS
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#15315B] mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link to="/products?category=Events" className="hover:text-[#26A044] transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Educational Kits" className="hover:text-[#26A044] transition-colors">
                    Educational kits
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Competition Robots" className="hover:text-[#26A044] transition-colors">
                    Competition robots
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=PCB Design Services" className="hover:text-[#26A044] transition-colors">
                    PCB design
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#15315B] mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link to="/terms" className="hover:text-[#26A044] transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://www.youtube.com/@E-GROOTS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#26A044] transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/egroots.in?igsh=MXJla2V2NXA2NHRuZA%3D%3D&utm_source=qr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#26A044] transition-colors"
                  >
                    Community forum
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#26A044] transition-colors">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#15315B] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>
                  <Link to="/about" className="hover:text-[#26A044] transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#26A044] transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#26A044] transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#26A044] transition-colors">
                    Terms of service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-t border-[#26A044]/30 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-slate-700">
                  © {new Date().getFullYear()} E‑Groots. All rights reserved. Built
                  for the next generation of engineers and makers.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      aria-label={social.name}
                    >
                      <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group-hover:-translate-y-0.5`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
