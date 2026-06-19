import { Download, ShieldCheck, Database, Server, Cpu } from 'lucide-react';
import profilePhoto from '../assets/thesaint.png';

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-dark-card/20 border-y border-dark-border overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -left-40 top-1/3 ambient-glow" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Photo Column with Sleek Circular Mask & Gold Gradient Border */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer pulsing gold radial ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark opacity-40 blur-md group-hover:opacity-75 transition duration-500 animate-pulse" />
              
              {/* Secondary offset gold line ring */}
              <div className="absolute inset-[-4px] rounded-full border border-gold/40 scale-102 group-hover:scale-105 transition-transform duration-500" />
              
              {/* Circular Image Container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-dark-bg bg-dark-card shadow-[0_10px_35px_rgba(212,175,55,0.15)] flex items-center justify-center">
                <img 
                  src={profilePhoto} 
                  alt="Shaig Mahmudov" 
                  className="w-full h-full object-cover object-center scale-102 group-hover:scale-108 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text/Bio Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs uppercase tracking-widest text-gold font-medium mb-3">Architecting Stability</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">About Me</h2>
            
            <p className="text-slate-300 font-light leading-relaxed mb-6">
              I am an aspiring <strong className="text-gold-light font-medium">Backend Engineer</strong> dedicated to building clean, secure, and highly scalable server-side systems. Utilizing modern languages and frameworks like <strong className="text-white font-medium">Java, Spring Boot, and Go</strong>, my engineering ethos revolves around clean architecture, strict authentication mechanisms, and reliable database designs.
            </p>

            <p className="text-slate-400 font-light leading-relaxed mb-8">
              Outside of building standard REST APIs, I am deeply interested in system resilience testing—simulating edge cases like rate limits, duplicate transactions, and retry storms before they impact production environments. Additionally, I am currently learning about Web3 and blockchain technologies.
            </p>

            {/* Core Interest Highlights */}
            <div className="grid grid-cols-2 gap-6 w-full mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/5 border border-gold/10 text-gold">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Spring Boot</h4>
                  <p className="text-xs text-slate-500">Robust REST APIs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/5 border border-gold/10 text-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Security</h4>
                  <p className="text-xs text-slate-500">JWT, RBAC, OAuth</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/5 border border-gold/10 text-gold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Databases</h4>
                  <p className="text-xs text-slate-500">PostgreSQL, ORM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold/5 border border-gold/10 text-gold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">DevOps / Go</h4>
                  <p className="text-xs text-slate-500">Docker, CLI Tools</p>
                </div>
              </div>
            </div>

            {/* CV Download CTA */}
            <a
              href="./shaig-mahmudov-cv.pdf"
              download="Shaig-Mahmudov-CV.pdf"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gold bg-gold/5 text-gold font-medium text-sm transition-all duration-300 hover:bg-gold hover:text-dark-bg shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
            >
              <Download className="w-4 h-4" />
              Download Curriculum Vitae
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
