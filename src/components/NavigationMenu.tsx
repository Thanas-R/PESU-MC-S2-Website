import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
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
  admins: ['Reference_Frame', 'Josh', 'Edward the Enderman', 'Woduh'],
  webDev: 'DarkSpacePirate'
};
export const NavigationMenu = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenServerContents
}: NavigationMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - blurred instead of dark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-xl bg-black/20"
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-6 md:inset-12 lg:inset-20 z-50 glass-card p-8 md:p-12 overflow-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 h-full">
              {/* Navigation Section */}
              <div className="space-y-8">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">Navigation</p>

                <nav className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.section}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        onNavigate(item.section);
                        onClose();
                      }}
                      className="block text-4xl md:text-5xl font-bold text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => {
                    onOpenServerContents();
                  }}
                  className="block text-4xl md:text-5xl font-bold text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Server Contents
                </motion.button>

                <div className="flex flex-wrap gap-3 pt-6">
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    href="https://discord.com/invite/dVGj9pfG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(235,86%,65%)] hover:bg-[hsl(235,86%,58%)] rounded-xl font-semibold text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                    </svg>
                    Join Discord
                  </motion.a>

                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    href="https://pesu-mc.ddns.net:8443/status"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 glass-button rounded-xl font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Server Status
                  </motion.a>
                </div>
              </div>

              {/* Admin Panel Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass p-8 rounded-2xl self-start"
              >
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-8">Admin Panel</p>

                <div className="space-y-6">
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Owner</p>
                    <p className="text-foreground text-xl font-bold">{adminPanel.owner}</p>
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
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">CEO</p>
                    <p className="text-foreground text-lg font-semibold">{adminPanel.ceo}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Wandering Trader</p>
                    <p className="text-foreground text-lg font-semibold">{adminPanel.webDev}</p>
                    <p className="text-muted-foreground text-xs mt-1">Scripting, Website & Marketing</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};