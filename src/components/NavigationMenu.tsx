import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useServerStatus } from '@/hooks/use-server-status';
import { useEffect } from 'react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onOpenServerContents: () => void;
}

const navItems = [{
  label: 'Home',
  section: 'hero'
}, {
  label: 'Features',
  section: 'features'
}, {
  label: 'How to Join',
  section: 'how-to-join'
}, {
  label: 'Gallery',
  section: 'gallery'
}];

const adminPanel = {
  owner: 'PSG',
  ceo: 'Daring Dash',
  admins: ['pmmdot(ref)', 'Josh', 'Edward Enderman', 'Woduh'],
  webDev: 'DarkSpacePirate',
  wither: 'Gravityboots'
};

export const NavigationMenu = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenServerContents
}: NavigationMenuProps) => {
  const { isOnline, playerCount, maxPlayers } = useServerStatus();
  
  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop - reduced blur on mobile for performance */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.2
      }} className="fixed inset-0 z-40 backdrop-blur-sm sm:backdrop-blur-xl bg-black/40 sm:bg-white/5" onClick={onClose} />

          {/* Menu Content - Full screen on mobile */}
          <motion.div initial={{
        opacity: 0,
        x: 50
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 50
      }} transition={{
        duration: 0.2,
        ease: 'easeOut'
      }} className="fixed inset-0 sm:inset-6 md:inset-12 lg:inset-20 z-50 bg-background/95 sm:bg-black/30 backdrop-blur-md sm:backdrop-blur-xl sm:border sm:border-white/15 sm:rounded-2xl overflow-auto scrollbar-hide">
            {/* Close button - visible on mobile */}
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full glass-button z-10 sm:hidden">
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 h-full p-6 sm:p-8 md:p-12">
              {/* Navigation Section */}
              <div className="space-y-6 sm:space-y-8">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">Navigation</p>

                <nav className="space-y-2 sm:space-y-3">
                  {navItems.map((item, index) => <motion.button key={item.section} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.05
              }} onClick={() => {
                onNavigate(item.section);
                onClose();
              }} className="block text-2xl sm:text-4xl md:text-5xl font-bold text-foreground hover:text-muted-foreground transition-colors duration-300">
                      {item.label}
                    </motion.button>)}
                </nav>

                <motion.button initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.2
            }} onClick={() => {
              onOpenServerContents();
              onClose();
            }} className="block text-2xl sm:text-4xl md:text-5xl font-bold text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Server Contents
                </motion.button>

                <div className="flex flex-wrap gap-3 pt-4 sm:pt-6">
                  <motion.a initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.25
              }} href="https://discord.gg/BJuyDHBm52" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[hsl(235,86%,65%)] hover:bg-[hsl(235,86%,58%)] rounded-xl font-semibold text-white transition-all duration-300 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                    Join Discord
                  </motion.a>

                  {/* Server Status Widget - real-time with animation */}
                  <motion.div 
                    key={isOnline ? 'online' : 'offline'}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className={`inline-flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border transition-all duration-500 ${
                      isOnline 
                        ? 'bg-green-500/20 border-green-500/40' 
                        : 'bg-red-500/20 border-red-500/40'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className={`font-semibold text-sm sm:text-base transition-colors duration-500 ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                      Server {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </motion.div>

                </div>
              </div>

              {/* Admin Panel Section */}
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.15
          }} className="glass p-6 sm:p-8 rounded-2xl self-start">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-6 sm:mb-8">Admin Panel</p>

                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Owner</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {adminPanel.owner}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Admins</p>
                    <div className="flex flex-wrap gap-2">
                      {adminPanel.admins.map(admin => (
                        <span key={admin} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-sm font-medium">
                          {admin}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">CEO</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {adminPanel.ceo}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Wandering Trader</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {adminPanel.webDev}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">[Scripting, Website & Marketing]</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Wither</p>
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {adminPanel.wither}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};
