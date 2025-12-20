import { useState } from 'react';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { NavigationMenu } from '@/components/NavigationMenu';
import { ServerContentsModal } from '@/components/ServerContentsModal';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowToJoinSection } from '@/components/HowToJoinSection';
import { GallerySection } from '@/components/GallerySection';
import heroBg from '@/assets/hero-bg.png';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServerContentsOpen, setIsServerContentsOpen] = useState(false);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background - no blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Very subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 p-3 glass rounded-xl hover:scale-105 transition-transform duration-300"
        aria-label="Toggle menu"
      >
        <MenuToggleIcon open={isMenuOpen} className="w-6 h-6 text-foreground" duration={400} />
      </button>

      {/* Navigation Menu */}
      <NavigationMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenServerContents={() => {
          setIsMenuOpen(false);
          setIsServerContentsOpen(true);
        }}
      />

      {/* Server Contents Modal */}
      <ServerContentsModal
        isOpen={isServerContentsOpen}
        onClose={() => setIsServerContentsOpen(false)}
      />

      {/* Main Content - normal scroll */}
      <main className="relative z-10">
        <HeroSection onOpenServerContents={() => setIsServerContentsOpen(true)} />
        <FeaturesSection />
        <HowToJoinSection />
        <GallerySection />

        {/* Footer */}
        <footer className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-10 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">PESU Minecraft S2</h3>
              <p className="text-muted-foreground mb-8">
                Join our amazing community and start your adventure today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://discord.com/invite/dVGj9pfG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(235,86%,65%)] hover:bg-[hsl(235,86%,58%)] rounded-xl font-semibold transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                  </svg>
                  Join Discord
                </a>
                <a
                  href="https://pesu-mc.ddns.net:8443/status"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 glass-button rounded-xl font-semibold"
                >
                  Server Status
                </a>
              </div>
              <p className="text-muted-foreground text-sm mt-10">
                © 2024 PESU Minecraft. Made with ❤️ by DarkSpacePirate
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
