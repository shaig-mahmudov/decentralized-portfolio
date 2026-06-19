import { useState, useEffect } from 'react';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

export default function Hero() {
  const words = ['Backend Engineer', 'Java & Spring Developer', 'System Resilience Specialist'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const fullWord = words[currentWordIndex];
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(75);

        if (currentText === fullWord) {
          // Wait before starting delete
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 ambient-glow-large" />
      <div className="absolute bottom-10 right-10 ambient-glow" />

      {/* Decorative vertical lines */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-dark-border to-transparent hidden lg:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-dark-border to-transparent hidden lg:block" />

      <div className="container mx-auto px-6 z-10 text-center flex flex-col items-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-dark-card/60 backdrop-blur-md mb-8 animate-fade-in shadow-[0_0_15px_rgba(212,175,55,0.05)]">
          <Terminal className="w-4 h-4 text-gold" />
          <span className="text-xs uppercase tracking-widest text-gold-light font-medium">JVM & Distributed Architecture</span>
        </div>

        {/* Name */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
          SHAIG <span className="bg-gradient-to-r from-gold-light via-gold to-gold-dark bg-clip-text text-transparent gold-text-glow">MAHMUDOV</span>
        </h1>

        {/* Dynamic Typewriter text */}
        <div className="h-10 md:h-12 mb-8 flex items-center justify-center">
          <span className="text-xl md:text-3xl text-slate-400 font-light tracking-wide">
            Building{' '}
            <span className="text-white font-medium typing-cursor pb-1">
              {currentText}
            </span>
          </span>
        </div>

        {/* Bio summary */}
        <p className="max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed mb-12 font-light">
          Engineering high-performance, secure, and highly resilient backend platforms. Specialized in JVM ecosystem architectures, distributed concurrency controls, and automated reliability testing.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-dark-bg font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#simulator"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/30 bg-dark-card/40 backdrop-blur-sm text-gold-light font-medium text-sm transition-all duration-300 hover:bg-gold/10 hover:border-gold/60 hover:text-white"
          >
            <Shield className="w-4 h-4 text-gold" />
            Launch Load Simulator
          </a>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Scroll to explore</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
