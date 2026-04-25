'use client'; // This MUST be line 1

import Hero from '../components/Hero'; // Standard import to prevent crash
import IntelligenceFeed from '../components/IntelligenceFeed';
import ContactPortal from '../components/ContactPortal';
import SystemHeader from '../components/SystemHeader';
import AdminTerminal from '../components/AdminTerminal'; 
import { SOCIALS } from '../constants/projects';

export default function Home() {
  return (
    <main className="bg-black min-h-screen selection:bg-white/30 text-white overflow-x-hidden relative">
      <AdminTerminal />
      <SystemHeader />

      <section className="relative h-screen">
        <Hero />
      </section>

      <div className="fixed right-6 bottom-12 z-50 hidden md:flex flex-col gap-8 mix-blend-difference">
        <a href={SOCIALS.x} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono vertical-text hover:text-blue-400 transition-all duration-300 tracking-[0.3em] uppercase opacity-50 hover:opacity-100">
          X_@Lithos_eth
        </a>
        <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono vertical-text hover:text-white transition-all duration-300 tracking-[0.3em] uppercase opacity-50 hover:opacity-100 flex items-center gap-2">
          GitHub_Emmaprof <span className="h-1 w-1 bg-green-500 rounded-full animate-pulse"></span>
        </a>
        <div className="h-24 w-[1px] bg-white/20 mx-auto mt-2"></div>
      </div>

      <div className="relative z-10 bg-black">
        <section id="architecture" className="scroll-mt-24">
          <IntelligenceFeed />
        </section>

        <section id="contact-portal" className="scroll-mt-24 py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 tracking-tighter uppercase">SECURE TRANSMISSION</h2>
              <ContactPortal />
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-6">
            <span className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase">© 2026 Lithos.eth // SkillChain Network</span>
          </div>
        </footer>
      </div>

      <style jsx global>{`.vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }`}</style>
    </main>
  );
}