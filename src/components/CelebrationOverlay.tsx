import { useState, useEffect, useCallback } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-web';

interface CelebrationOverlayProps {
  show: boolean;
  onComplete?: () => void;
}

// Lottie animation URLs from LottieFiles
const CONFETTI_URL = 'https://assets-v2.lottiefiles.com/a/76caddfc-116a-11ee-aa25-6333db7b8d8c/GpI0uQYnKa.lottie';
const FIREWORKS_URL = 'https://assets-v2.lottiefiles.com/a/d601a13e-1151-11ee-b2e2-73fdc183ef8e/eHMKup59WG.lottie';

export const CelebrationOverlay = ({ show, onComplete }: CelebrationOverlayProps) => {
  const [phase, setPhase] = useState<'confetti' | 'fireworks' | 'done'>('confetti');
  const [visible, setVisible] = useState(false);
  const [confettiInstance, setConfettiInstance] = useState<DotLottie | null>(null);
  const [fireworksInstance, setFireworksInstance] = useState<DotLottie | null>(null);

  useEffect(() => {
    if (show) {
      setPhase('confetti');
      setVisible(true);
    }
  }, [show]);

  // Handle confetti completion - switch to fireworks
  useEffect(() => {
    if (!confettiInstance) return;
    
    const handleComplete = () => {
      setPhase('fireworks');
    };
    
    confettiInstance.addEventListener('complete', handleComplete);
    return () => {
      confettiInstance.removeEventListener('complete', handleComplete);
    };
  }, [confettiInstance]);

  // Handle fireworks completion - end celebration
  useEffect(() => {
    if (!fireworksInstance) return;
    
    const handleComplete = () => {
      setPhase('done');
      setVisible(false);
      onComplete?.();
    };
    
    fireworksInstance.addEventListener('complete', handleComplete);
    return () => {
      fireworksInstance.removeEventListener('complete', handleComplete);
    };
  }, [fireworksInstance, onComplete]);

  const handleConfettiRef = useCallback((dotLottie: DotLottie | null) => {
    setConfettiInstance(dotLottie);
  }, []);

  const handleFireworksRef = useCallback((dotLottie: DotLottie | null) => {
    setFireworksInstance(dotLottie);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
      {/* Confetti Animation */}
      {phase === 'confetti' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <DotLottieReact
            src={CONFETTI_URL}
            autoplay
            loop={false}
            dotLottieRefCallback={handleConfettiRef}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      {/* Fireworks Animation */}
      {phase === 'fireworks' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <DotLottieReact
            src={FIREWORKS_URL}
            autoplay
            loop={false}
            dotLottieRefCallback={handleFireworksRef}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
};
