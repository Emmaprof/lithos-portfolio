'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SpecViewer from './SpecViewer';

// Unified Source of Truth for your Feed
const masterFeed = [
  {
    id: 'kimberlite',
    type: 'Architecture',
    title: "KimberLite RWA",
    desc: "Tokenizing rough diamonds and precious commodities to bring real-world value onto the blockchain.",
    span: "md:col-span-8",
    color: "from-blue-500/10",
    link: "https://kimbertoken.io/links-hub",
    spec: `[PROTOCOL_SPEC]: KimberLite Ecosystem\nSubject: eDiamond Tokenization\n\n0x01: Overview\nKimberLite tokenizes rough diamonds, creating a practical bridge between traditional trading and blockchain. No specialized knowledge required for investors to own valuable physical assets.\n\n0x02: Core Pillars\nFocusing on transparency, efficiency, and stability to make diamond trading a secure experience for all.\n\nResources:\n- Official: https://kimbertoken.io/\n- Docs: https://kimberlite-token.gitbook.io/kimberlite`
  },
  {
    id: 'tee-research',
    type: 'Research',
    title: "Oasis TEEs",
    desc: "Confidential computing and TEEs are the production-ready standard for private dApps today.",
    span: "md:col-span-4",
    color: "from-green-500/10",
    link: "https://oasis.net/",
    spec: `[TECH_SPEC]: Trusted Execution Environments\n\n0x01: Why TEEs?\nTEEs provide protected environments for data processing, offering a practical, production-ready alternative to ZK-proofs and FHE.\n\n0x02: Security Model\nUtilizing defense-in-depth methods and secure-via-physics design to minimize hardware vulnerabilities and maximize on-chain privacy.`
  },
  {
    id: 'skillchain',
    type: 'Education',
    title: "SkillChain Network",
    desc: "Lead strategist and mentor helping developers transition to decentralized architectures.",
    span: "md:col-span-6",
    color: "from-purple-500/10",
    link: "https://x.com/SkillChain360",
    spec: "Mentorship framework for building a Web3 career. Focus on decentralized strategy and ecosystem growth."
  },
  {
    id: 'compoundos',
    type: 'Analytics',
    title: "CompoundOS",
    desc: "Live Dune dashboard tracking residential compound Naira payments and utility metrics.",
    span: "md:col-span-6",
    color: "from-orange-500/10",
    link: "https://dune.com/decentralizeddev/febraury-2026-bill-dashboard",
    spec: `[SYSTEM_SPEC]: CompoundOS v2.4\nSubject: Localized Financial Infrastructure\n\n0x01: Pipeline\nSyncs MongoDB payment logs to Dune Analytics via a secure Python worker.`
  },
  {
    id: 'x-thread-ux',
    type: 'Thread',
    title: "Product vs. Thesis",
    desc: "Learning to separate your user experience from your investment thesis is how you protect your capital.",
    span: "md:col-span-6",
    color: "from-purple-500/10",
    link: "https://x.com/Lithos_eth/status/2044321543711244580",
    spec: "A good token captures value; a good product captures users."
  },
  {
    id: 'x-thread-growth',
    type: 'Thread',
    title: "The Covalent Bond",
    desc: "Growth on Crypto Twitter as a small account: why community is actually basic chemistry.",
    span: "md:col-span-6",
    color: "from-blue-500/10",
    link: "https://x.com/Lithos_eth/status/2042528661543292996",
    spec: "Stop chasing massive accounts; build micro-communities instead."
  },
  {
    id: 'x-tweet-hl',
    type: 'Tweet',
    title: "Hyperliquid Analysis",
    desc: "One project recently that gets everything right in the current landscape is Hyperliquid.",
    span: "md:col-span-6",
    color: "from-neutral-500/10",
    link: "https://x.com/Lithos_eth/status/2042528661543292996",
    spec: "Technical breakdown of Hyperliquid's execution layer."
  }
];

const DecryptedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+{}:<>?";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((_, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return <span onMouseEnter={scramble} className="cursor-default">{displayText}</span>;
};

export default function IntelligenceFeed() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="architecture" className="py-32 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-20">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase opacity-10 absolute -mt-12 select-none">
          Archive
        </h2>
        <div className="relative border-l border-white/20 pl-8">
          <h3 className="text-4xl font-bold tracking-tight">Intelligence Feed</h3>
          <p className="font-mono text-[10px] text-gray-500 mt-2 uppercase tracking-[0.2em]">
            System Status: Decrypting Protocol Assets...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {masterFeed.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bento-card group flex flex-col justify-between min-h-[350px] bg-gradient-to-br ${item.color} to-transparent ${item.span}`}
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-[9px] px-2 py-1 border border-white/10 text-gray-400 uppercase">
                  {item.type}
                </span>
                <span className="font-mono text-[9px] text-gray-600">00{i + 1}</span>
              </div>
              
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-block group/link">
                <h4 className="text-4xl font-bold tracking-tight mb-4 group-hover:text-blue-400 transition-colors duration-500 flex items-center gap-2">
                  {item.title} <span className="text-xs opacity-0 group-hover/link:opacity-100 transition-opacity">↗</span>
                </h4>
              </a>

              <div className="text-gray-400 font-light leading-relaxed text-sm max-w-md group-hover:text-white transition-colors">
                <span className="font-mono text-[10px] text-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  [DECRYPTED]
                </span>
                <DecryptedText text={item.desc} />
              </div>
            </div>

            <div className="flex justify-between items-end mt-12">
              <div className="h-1 w-12 bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-700"></div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedProject(item)}
                  className="text-[10px] font-mono text-gray-500 hover:text-white transition-colors cursor-pointer outline-none"
                >
                  [ ACCESS_SPEC ]
                </button>
                <a 
                  href={item.link} 
                  target="_blank" 
                  className="text-[10px] font-mono text-blue-500 hover:text-blue-400 transition-colors"
                >
                  [ EXTERNAL_LINK ]
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SpecViewer 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        content={selectedProject ? { title: selectedProject.title, spec: selectedProject.spec } : {}} 
      />
    </section>
  );
}