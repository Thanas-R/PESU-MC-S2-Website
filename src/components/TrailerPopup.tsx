import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TrailerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerPopup = ({ isOpen, onClose }: TrailerPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 sm:inset-6 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] md:max-w-4xl z-[101] bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full glass-button hover:scale-105 transition-transform"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold pr-12">Season 2 Trailer</h2>
              <p className="text-muted-foreground text-sm mt-1">Welcome to PESU Minecraft</p>
            </div>

            {/* Video */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/aZFPNr3brIk?autoplay=1&rel=0&modestbranding=1&hd=1&vq=hd1080"
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title="PESU Minecraft Season 2 Trailer"
              />
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-4 border-t border-white/10 flex justify-between items-center">
              <p className="text-muted-foreground text-xs sm:text-sm">Press ESC or click outside to close</p>
              <button
                onClick={onClose}
                className="px-4 py-2 glass-button rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
