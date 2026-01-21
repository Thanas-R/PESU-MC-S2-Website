import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { NavigationMenu } from '@/components/NavigationMenu';
import { ServerContentsModal } from '@/components/ServerContentsModal';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowToJoinSection } from '@/components/HowToJoinSection';
import { GallerySection } from '@/components/GallerySection';
import { LoadingScreen } from '@/components/LoadingScreen';
import { TrailerPopup } from '@/components/TrailerPopup';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import heroBg from '@/assets/hero-bg.png';
import serverIcon from '@/assets/server-icon.png';

const TRAILER_SHOWN_KEY = 'pesu_trailer_shown';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServerContentsOpen, setIsServerContentsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Smooth scroll only on desktop
  useSmoothScroll();

  useEffect(() => {
    // Preload critical images
    const imagesToLoad = [heroBg, serverIcon];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= imagesToLoad.length) {
        setIsLoading(false);
        
        // Show trailer popup on first visit after loading completes
        const hasSeenTrailer = sessionStorage.getItem(TRAILER_SHOWN_KEY);
        if (!hasSeenTrailer) {
          setTimeout(() => {
            setIsTrailerOpen(true);
            sessionStorage.setItem(TRAILER_SHOWN_KEY, 'true');
          }, 500);
        }
      }
    };

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        checkAllLoaded();
      } else {
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded;
      }
    });

    // Fallback: hide loader after 5 seconds max
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  // Handle ESC key to close trailer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTrailerOpen) {
        setIsTrailerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTrailerOpen]);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      {/* Trailer Popup */}
      <TrailerPopup 
        isOpen={isTrailerOpen} 
        onClose={() => setIsTrailerOpen(false)} 
      />

      {/* Fixed Background - no blur */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Very subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Menu Toggle Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-6 right-6 z-50 p-3 glass rounded-xl hover:scale-105 transition-transform duration-300" aria-label="Toggle menu">
        <MenuToggleIcon open={isMenuOpen} className="w-6 h-6 text-foreground" duration={400} />
      </button>

      {/* Navigation Menu */}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={handleNavigate} onOpenServerContents={() => {
        setIsMenuOpen(false);
        setIsServerContentsOpen(true);
      }} />

      {/* Server Contents Modal */}
      <ServerContentsModal isOpen={isServerContentsOpen} onClose={() => setIsServerContentsOpen(false)} />

      {/* Main Content - normal scroll */}
      <main className="relative z-10">
        <HeroSection 
          onOpenServerContents={() => setIsServerContentsOpen(true)} 
          onOpenTrailer={() => setIsTrailerOpen(true)}
        />
        <FeaturesSection />
        <HowToJoinSection />
        <GallerySection />
      </main>
    </div>
  );
};
export default Index;
