import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Terminal, BookOpen, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ServerContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabs = [
  { id: 'datapacks', label: 'Datapacks', icon: Package },
  { id: 'plugins', label: 'Plugins', icon: BookOpen },
  { id: 'commands', label: 'Commands', icon: Terminal },
];

const duelsCommands = [
  { cmd: '/duel <player>', desc: 'Challenge a player to a duel' },
  { cmd: '/duel accept', desc: 'Accept a duel request' },
  { cmd: '/duel deny', desc: 'Deny a duel request' },
  { cmd: '/duel queue', desc: 'Find a random opponent' },
  { cmd: '/duel stats', desc: 'View your duel statistics' },
  { cmd: '/duel leaderboard', desc: 'View the duel leaderboard' },
];

const partyCommands = [
  { cmd: '/party create', desc: 'Creates a new party' },
  { cmd: '/party invite <player>', desc: 'Invites a player to join your party' },
  { cmd: '/party join <leader>', desc: 'Accepts a party invitation' },
  { cmd: '/party leave', desc: 'Leaves your current party' },
  { cmd: '/party duel <leader>', desc: 'Challenges another party leader to a party vs. party match' },
];

const tpaCommands = [
  { cmd: '/tpa <player>', desc: 'Request to teleport to a player' },
  { cmd: '/tpa accept', desc: 'Accept a teleport request' },
  { cmd: '/tpa deny', desc: 'Deny a teleport request' },
];

export const ServerContentsModal = ({ isOpen, onClose }: ServerContentsModalProps) => {
  const [activeTab, setActiveTab] = useState('plugins');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 glass-card overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold">Server Contents</h2>
              <button onClick={onClose} className="p-2 rounded-full glass-button">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'glass-button'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 md:p-6">
              {activeTab === 'datapacks' && (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">Datapack documentation is being prepared.</p>
                </div>
              )}

              {activeTab === 'commands' && (
                <div className="text-center py-16">
                  <Terminal className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">Full command list is being prepared.</p>
                </div>
              )}

              {activeTab === 'plugins' && (
                <div className="space-y-8 max-w-4xl mx-auto">
                  {/* Duels Plugin */}
                  <div className="glass p-6 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <a
                          href="https://modrinth.com/plugin/duels-optimised"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:underline"
                        >
                          Duels Plugin
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        <p className="text-muted-foreground mt-1">
                          Challenge other players to 1v1 duels and climb the leaderboard. Track your stats and compete for the top position.
                        </p>
                      </div>
                    </div>

                    <div className="glass-dark p-4 rounded-xl mb-4">
                      <p className="text-primary font-medium mb-2">Quick Start</p>
                      <p className="text-sm text-muted-foreground">
                        Use <code className="px-2 py-0.5 bg-primary/20 rounded">/duel &lt;player&gt;</code> to challenge someone, or{' '}
                        <code className="px-2 py-0.5 bg-primary/20 rounded">/duel queue</code> to find a random opponent. Check your stats with{' '}
                        <code className="px-2 py-0.5 bg-primary/20 rounded">/duel stats</code>.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Commands</p>
                      {duelsCommands.map((cmd) => (
                        <div key={cmd.cmd} className="flex items-center gap-4 py-2 px-3 rounded-lg bg-secondary/30">
                          <code className="text-primary font-mono text-sm">{cmd.cmd}</code>
                          <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Party Plugin */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-2">Party Plugin</h3>
                    <p className="text-muted-foreground mb-4">
                      Create parties for group activities and team-based duels. Perfect for coordinating with multiple players.
                    </p>

                    <div className="grid gap-2 mb-6">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Commands</p>
                      {partyCommands.map((cmd) => (
                        <div key={cmd.cmd} className="flex items-center gap-4 py-2 px-3 rounded-lg bg-secondary/30">
                          <code className="text-primary font-mono text-sm">{cmd.cmd}</code>
                          <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TPA Plugin */}
                  <div className="glass p-6 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-2">Teleportation (TPA)</h3>
                    <p className="text-muted-foreground mb-4">
                      Request to teleport to other players for easy travel across the server.
                    </p>

                    <div className="grid gap-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Commands</p>
                      {tpaCommands.map((cmd) => (
                        <div key={cmd.cmd} className="flex items-center gap-4 py-2 px-3 rounded-lg bg-secondary/30">
                          <code className="text-primary font-mono text-sm">{cmd.cmd}</code>
                          <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl text-center">
                    <p className="text-muted-foreground text-sm">
                      Need help? Ask in our{' '}
                      <a href="https://discord.com/invite/dVGj9pfG" className="text-primary hover:underline">
                        Discord community
                      </a>{' '}
                      or contact a staff member in-game!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
