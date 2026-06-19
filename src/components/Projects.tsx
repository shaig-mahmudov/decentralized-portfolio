import type { SVGProps, ReactNode } from 'react';
import { ExternalLink, Star, Code2, ShieldAlert, Cpu, GitFork, Workflow } from 'lucide-react';

const Github = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars?: number;
  type: 'Personal' | 'M42 Labs';
  repoUrl: string;
  icon: ReactNode;
}

export default function Projects() {
  const projects: Project[] = [
    {
      name: 'rivet-api',
      fullName: 'shaig-mahmudov/rivet-api',
      description: 'Engineering workflow backend for tasks, incidents, dependencies, SLA tracking, and reliability issues. Built with Java, Spring Boot, and relational databases.',
      language: 'Java',
      languageColor: '#b07219',
      stars: 0,
      type: 'Personal',
      repoUrl: 'https://github.com/shaig-mahmudov/rivet-api',
      icon: <Workflow className="w-6 h-6 text-gold" />
    },
    {
      name: 'wreckr',
      fullName: 'shaig-mahmudov/wreckr',
      description: 'Production scenario testing for backend systems. Simulate load spikes, race conditions, rate limits, retry storms, duplicate transactions, and broken idempotency before they hit production.',
      language: 'Go',
      languageColor: '#00ADD8',
      stars: 1,
      type: 'Personal',
      repoUrl: 'https://github.com/shaig-mahmudov/wreckr',
      icon: <ShieldAlert className="w-6 h-6 text-gold" />
    },
    {
      name: 'autoreq',
      fullName: 'shaig-mahmudov/autoreq',
      description: 'A lightweight CLI tool for sending, repeating, and monitoring HTTP requests with performance telemetry logging.',
      language: 'Go',
      languageColor: '#00ADD8',
      stars: 1,
      type: 'Personal',
      repoUrl: 'https://github.com/shaig-mahmudov/autoreq',
      icon: <Cpu className="w-6 h-6 text-gold" />
    },
    {
      name: 'betelgeuse-core',
      fullName: 'shaig-m42-labs/betelgeuse-core',
      description: 'Core reliability domain service for managing backend services, active incidents, deployments, dependency tree mappings, and operational workflows.',
      language: 'Java',
      languageColor: '#b07219',
      stars: 0,
      type: 'M42 Labs',
      repoUrl: 'https://github.com/shaig-m42-labs/betelgeuse-core',
      icon: <Code2 className="w-6 h-6 text-gold" />
    },
    {
      name: 'orion-platform',
      fullName: 'shaig-m42-labs/orion-platform',
      description: 'Main system architecture definition, networking setups, and API documentation hub for the M42 Labs distributed backend ecosystem.',
      language: 'PowerShell',
      languageColor: '#012456',
      stars: 0,
      type: 'M42 Labs',
      repoUrl: 'https://github.com/shaig-m42-labs/orion-platform',
      icon: <LayersIcon className="w-6 h-6 text-gold" />
    },
    {
      name: 'm42-infra',
      fullName: 'shaig-m42-labs/m42-infra',
      description: 'Infrastructure automation setups, orchestrations, and dockerized local environments for system developers and testing.',
      language: 'Docker / Compose',
      languageColor: '#2496ED',
      stars: 0,
      type: 'M42 Labs',
      repoUrl: 'https://github.com/shaig-m42-labs/m42-infra',
      icon: <GitFork className="w-6 h-6 text-gold" />
    }
  ];

  return (
    <section id="projects" className="relative py-24 bg-dark-card/25 border-y border-dark-border/40 overflow-hidden">
      {/* Background glow positioning */}
      <div className="absolute left-10 top-1/3 ambient-glow" />
      <div className="absolute right-10 bottom-10 ambient-glow" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-medium mb-3 block">My Creations</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-slate-400 font-light">
            Highlighting core open-source repositories and infrastructure systems. Selected projects represent architectural design, API development, and distributed reliability controls.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-2xl border border-dark-border/80 flex flex-col justify-between gold-border-glow-hover"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-gold/5 border border-gold/15">
                    {project.icon}
                  </div>
                  
                  {/* Category Type Badge */}
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                    project.type === 'M42 Labs'
                      ? 'border border-gold/45 text-gold bg-gold/5'
                      : 'border border-slate-700 text-slate-400 bg-slate-800/40'
                  }`}>
                    {project.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-white mb-3 tracking-wide">{project.name}</h3>
                
                {/* Full name description */}
                <span className="text-xs text-slate-500 font-mono block mb-4">{project.fullName}</span>
                
                {/* Description */}
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-dark-border/40 flex items-center justify-between">
                {/* Language indicator */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: project.languageColor }}
                  />
                  <span className="text-xs text-slate-400 font-medium">{project.language}</span>
                </div>

                {/* Actions & telemetry */}
                <div className="flex items-center gap-4">
                  {project.stars !== undefined && project.stars > 0 && (
                    <div className="flex items-center gap-1 text-slate-500">
                      <Star className="w-3.5 h-3.5 text-gold-accent fill-gold-accent/20" />
                      <span className="text-xs">{project.stars}</span>
                    </div>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-gold transition-colors duration-200"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Organization / Affiliation Highlights */}
        <div className="mt-16 glass-panel-gold max-w-4xl mx-auto p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_35px_rgba(212,175,55,0.03)] border-gold/10">
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wide mb-2">Collaborative Ecosystem: M42 Labs</h4>
            <p className="text-slate-400 text-sm font-light max-w-2xl leading-relaxed">
              M42 Labs represents a specialized organization focused on distributed backend architectures, orchestration tools, and operational systems. I actively contribute core APIs, deployment topologies, and incident workflows.
            </p>
          </div>
          <a
            href="https://github.com/shaig-m42-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-bg border border-gold/25 text-gold-light hover:text-white hover:border-gold/60 hover:bg-gold/5 text-sm font-medium transition-all duration-300 shrink-0"
          >
            Explore Organization
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Simple helper icon for Layers
function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
