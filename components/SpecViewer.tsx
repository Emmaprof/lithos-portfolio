'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpecViewer({ isOpen, onClose, content }: { isOpen: boolean, onClose: () => void, content: any }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />
          {/* Terminal Window */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full md:w-[600px] bg-[#050505] border-l border-white/10 z-[201] p-12 overflow-y-auto font-mono"
          >
            <button onClick={onClose} className="text-gray-500 hover:text-white mb-8 text-xs tracking-widest">[ CLOSE_SESSION ]</button>
            <div className="prose prose-invert max-w-none">
              <span className="text-blue-500 text-[10px] uppercase mb-4 block">Archive // Spec_Reader v1.0</span>
              <h2 className="text-2xl font-bold mb-6 tracking-tight text-white">{content.title}</h2>
              <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                {content.spec}
              </div>
            </div>
            
            <div className="mt-12 p-4 border border-white/5 bg-white/5 rounded">
              <span className="text-[10px] text-gray-600 block mb-2">VERIFIED_BY_HARDWARE</span>
              <div className="flex gap-2">
                <div className="h-1 flex-grow bg-blue-500/20"></div>
                <div className="h-1 flex-grow bg-blue-500/40"></div>
                <div className="h-1 flex-grow bg-blue-500/60"></div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}