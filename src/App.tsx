import { useState, useEffect } from 'react';
import { Menu, X, ArrowUp, Cpu } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Simulator from './components/Simulator';
import Contact from './components/Contact';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update scroll metrics
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#techstack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Simulator', href: '#simulator' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className="relative min-h-screen bg-dark-bg text-slate-200 selection:bg-gold selection:text-dark-bg">
      {/* Interactive Cursor Reactive Glow (Desktop only) */}
      <div 
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-gold/3 to-gold-accent/1 blur-[120px] z-30 transition-all duration-300 hidden md:block"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-dark-border z-50">
        <div 
          className="h-full bg-gradient-to-r from-gold via-gold-light to-gold transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Glassmorphic Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-dark-border/40 bg-dark-bg/60 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gold/5 border border-gold/25 group-hover:border-gold transition-colors duration-300">
              <Cpu className="w-5 h-5 text-gold animate-pulse" />
            </div>
            <span className="font-serif text-lg font-bold tracking-widest text-white group-hover:text-gold transition-colors duration-300">
              SHAIG.M
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-slate-400 font-semibold transition-colors duration-200 hover:text-gold-light"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full border border-gold/30 text-gold-light hover:bg-gold hover:text-dark-bg text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Initiate Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-dark-border/40 bg-dark-bg px-6 py-4 flex flex-col gap-4 animate-slide-down">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-400 py-2 border-b border-dark-border/20 last:border-b-0 hover:text-gold"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-dark-bg font-semibold text-sm"
            >
              Initiate Contact
            </a>
          </nav>
        )}
      </header>

      {/* Main Pages */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Simulator />
        <Contact />
      </main>

      {/* Luxury Footer */}
      <footer className="py-12 border-t border-dark-border bg-[#050506] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-dark-border/30 pb-8 mb-8">
            <a href="#hero" className="font-serif text-2xl font-bold tracking-widest text-white hover:text-gold transition-colors">
              SHAIG MAHMUDOV
            </a>
            
            <div className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-light">
            <span>&copy; {new Date().getFullYear()} Shaig Mahmudov. Built for backend system engineering.</span>
            <span>Hosted on Fleek IPFS Distributed Network.</span>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-gold to-gold-dark text-dark-bg shadow-lg hover:scale-105 active:scale-95 transition-all z-40"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
