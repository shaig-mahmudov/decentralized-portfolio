import { useState } from 'react';
import type { SVGProps } from 'react';
import { Mail, Send, MapPin, CheckCircle } from 'lucide-react';

const Github = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 bg-dark-card/10 border-t border-dark-border overflow-hidden">
      {/* Background glow positioning */}
      <div className="absolute left-1/3 top-1/2 ambient-glow-large" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-medium mb-3 block">Get In Touch</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Initiate Contact</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-slate-400 font-light">
            I am currently open to Internships, Junior Backend Engineer opportunities, and collaborative open-source ventures. Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left panel: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div>
              <h4 className="font-serif text-2xl font-bold text-white mb-6 tracking-wide">Contact Details</h4>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Drop me an email or find me on my social platforms. Let's discuss backend architecture, API designs, or job opportunities.
              </p>

              {/* Info cards */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/15 text-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block uppercase">Email</span>
                    <a href="mailto:mahmudovshaig@gmail.com" className="text-slate-300 hover:text-gold transition-colors text-sm font-mono">
                      mahmudovshaig@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/15 text-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold block uppercase">Location</span>
                    <span className="text-slate-300 text-sm">
                      Baku, Azerbaijan (Open to remote)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials connections */}
            <div>
              <h5 className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">Core Networks</h5>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/shaig-mahmudov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-dark-border bg-dark-bg/60 text-slate-400 hover:text-gold hover:border-gold/45 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/posts/sheetal-verma-889241395_androiddeveloper-appdeveloper-mobileappdevelopment-ugcPost-7472655476371902466-5Qrf/?utm_source=share&utm_medium=member_android&rcm=ACoAAGEeaykBoQsrohITG6caxnn7SBGZoTaC9yo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-dark-border bg-dark-bg/60 text-slate-400 hover:text-gold hover:border-gold/45 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                  title="LinkedIn Connection"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Modern Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-dark-border shadow-2xl relative">
            <h4 className="font-serif text-xl font-bold text-white mb-8 tracking-wide">Secure Messaging Portal</h4>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold/50 focus:bg-dark-bg transition-all"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email Address"
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold/50 focus:bg-dark-bg transition-all"
                />
              </div>

              {/* Message */}
              <div className="relative group">
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message..."
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold/50 focus:bg-dark-bg transition-all resize-none"
                />
              </div>

              {/* Action Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isSubmitted 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-dark-bg hover:opacity-95 shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.3)]'
                }`}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Transmission
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
