import React from 'react';
import { Layers, Shield, Database, Cpu, Terminal, Sparkles } from 'lucide-react';

interface TechItem {
  name: string;
  level: string;
}

interface TechCategory {
  title: string;
  icon: React.ReactNode;
  items: TechItem[];
}

export default function TechStack() {
  const categories: TechCategory[] = [
    {
      title: 'Core Backend',
      icon: <Terminal className="w-5 h-5 text-gold" />,
      items: [
        { name: 'Java 21', level: 'Advanced' },
        { name: 'Spring Boot', level: 'Advanced' },
        { name: 'Spring MVC', level: 'Intermediate' },
        { name: 'REST APIs', level: 'Advanced' },
        { name: 'Maven', level: 'Intermediate' }
      ]
    },
    {
      title: 'Persistence & ORM',
      icon: <Layers className="w-5 h-5 text-gold" />,
      items: [
        { name: 'Spring Data JPA', level: 'Advanced' },
        { name: 'Hibernate', level: 'Advanced' },
        { name: 'JPA', level: 'Advanced' },
        { name: 'JPQL / SQL', level: 'Intermediate' }
      ]
    },
    {
      title: 'Security Layer',
      icon: <Shield className="w-5 h-5 text-gold" />,
      items: [
        { name: 'Spring Security', level: 'Intermediate' },
        { name: 'JWT Authentication', level: 'Advanced' },
        { name: 'RBAC Access Controls', level: 'Intermediate' },
        { name: 'OAuth2 Concepts', level: 'Intermediate' }
      ]
    },
    {
      title: 'Databases',
      icon: <Database className="w-5 h-5 text-gold" />,
      items: [
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'MySQL', level: 'Intermediate' },
        { name: 'MS SQL Server', level: 'Intermediate' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <Cpu className="w-5 h-5 text-gold" />,
      items: [
        { name: 'Docker', level: 'Intermediate' },
        { name: 'Docker Compose', level: 'Intermediate' },
        { name: 'Linux Commands', level: 'Intermediate' },
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Swagger / OpenAPI', level: 'Advanced' },
        { name: 'Postman APIs', level: 'Advanced' }
      ]
    },
    {
      title: 'Additional Ecosystems',
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      items: [
        { name: 'C#', level: 'Intermediate' },
        { name: '.NET Core', level: 'Intermediate' },
        { name: 'ASP.NET Core APIs', level: 'Intermediate' },
        { name: 'EF Core', level: 'Intermediate' }
      ]
    }
  ];

  return (
    <section id="techstack" className="relative py-24 overflow-hidden">
      {/* Background glow positioning */}
      <div className="absolute right-0 top-1/4 ambient-glow" />
      <div className="absolute left-1/3 bottom-10 ambient-glow-large" />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold font-medium mb-3 block">My Armament</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">Technical Arsenal</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-slate-400 font-light">
            An overview of the technologies, databases, security frameworks, and orchestration tools I utilize to craft secure and performant architectures.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="glass-panel p-6 rounded-2xl border border-dark-border shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.04)] hover:border-gold/15 transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dark-border/40 group-hover:border-gold/25 transition-colors duration-300">
                <div className="p-2 rounded-xl bg-gold/5 border border-gold/10">
                  {category.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">{category.title}</h3>
              </div>

              {/* Badges Grid */}
              <div className="flex flex-wrap gap-3">
                {category.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-start px-3.5 py-2 rounded-xl border border-dark-border bg-dark-bg/60 cursor-default hover:border-gold/30 hover:bg-gold/[0.02] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 group/badge"
                  >
                    <span className="text-sm font-medium text-slate-300 group-hover/badge:text-gold-light transition-colors duration-200">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-light tracking-wider uppercase mt-0.5">
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
