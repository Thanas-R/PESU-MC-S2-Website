import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useCelebration } from './CelebrationEffect';

interface TrailerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerPopup = ({
  isOpen,
  onClose
}: TrailerPopupProps) => {
  const { trigger: triggerCelebration } = useCelebration();

  const handleClose = () => {
    onClose();
    // Trigger celebration after closing
    setTimeout(() => {
      triggerCelebration();
    }, 300);
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Portaling to <body> avoids "fixed inside transformed parent" issues
  if (typeof document === 'undefined') return null;

  return createPortal(
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
            onClick={handleClose}
          />

          {/* Centering layer */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Season 2 Trailer"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 rounded-full glass-button hover:scale-105 transition-transform"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold pr-12">Season 2 Teaser</h2>
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
                <p className="text-muted-foreground text-xs sm:text-sm">Press ESC to close</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
