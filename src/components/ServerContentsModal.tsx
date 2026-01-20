import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Terminal, BookOpen, ExternalLink, Server, Cpu, Network, Gauge } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ServerContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LAST_TAB_KEY = 'server_contents_last_tab';

const tabs = [{
  id: 'specs',
  label: 'Specifications',
  icon: Server
}, {
  id: 'datapacks',
  label: 'Datapacks',
  icon: Package
}, {
  id: 'plugins',
  label: 'Plugins',
  icon: BookOpen
}, {
  id: 'commands',
  label: 'Commands',
  icon: Terminal
}];

const duelsCommands = [{
  cmd: '/duel <player>',
  desc: 'Challenge a player to a duel'
}, {
  cmd: '/duel accept',
  desc: 'Accept a duel request'
}, {
  cmd: '/duel deny',
  desc: 'Deny a duel request'
}, {
  cmd: '/duel queue',
  desc: 'Find a random opponent'
}, {
  cmd: '/duel stats',
  desc: 'View your duel statistics'
}, {
  cmd: '/duel leaderboard',
  desc: 'View the duel leaderboard'
}];

const partyCommands = [{
  cmd: '/party create',
  desc: 'Creates a new party'
}, {
  cmd: '/party invite <player>',
  desc: 'Invites a player to join your party'
}, {
  cmd: '/party join <leader>',
  desc: 'Accepts a party invitation'
}, {
  cmd: '/party leave',
  desc: 'Leaves your current party'
}, {
  cmd: '/party duel <leader>',
  desc: 'Challenges another party leader to a party vs. party match'
}];

const teamCommands = [{
  cmd: '/tc, /teamchat, /tchat',
  desc: 'Sends a message to only the members of your current team'
}, {
  cmd: '/ac, /allychat',
  desc: 'Sends a message to all members of your team and any allied teams'
}, {
  cmd: '/team create <name>',
  desc: 'Creates a new team if you are not already in one'
}, {
  cmd: '/team disband',
  desc: 'Destroys your team (only usable by the team owner)'
}, {
  cmd: '/team leave',
  desc: 'Removes you from your current team'
}, {
  cmd: '/team invite <player>',
  desc: 'Invites a player to your team'
}, {
  cmd: '/team join <team-name>',
  desc: 'Joins a team you have been invited to'
}, {
  cmd: '/team kick <player>',
  desc: 'Kicks a player from your team'
}, {
  cmd: '/team info',
  desc: 'Displays information about your current team'
}, {
  cmd: '/team list',
  desc: 'Lists all teams on the server'
}, {
  cmd: '/team prefix <prefix>',
  desc: "Changes the prefix for your team's name in chat"
}, {
  cmd: '/team ally [add/remove] <team-name>',
  desc: 'Adds or removes an allied team'
}, {
  cmd: '/team enemy [add/remove] <team-name>',
  desc: 'Adds or removes an enemy team'
}, {
  cmd: '/team pvp',
  desc: 'Toggles the friendly fire status for your team'
}, {
  cmd: '/team [promote/demote] <player>',
  desc: 'Promotes or demotes a team member to/from team manager'
}, {
  cmd: '/team permission [add/remove] <permission>',
  desc: 'Adds or removes a permission for team managers to use specific team commands'
}];

export const ServerContentsModal = ({
  isOpen,
  onClose
}: ServerContentsModalProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    // Load last tab from storage, default to 'specs'
    const saved = localStorage.getItem(LAST_TAB_KEY);
    return saved && tabs.some(t => t.id === saved) ? saved : 'specs';
  });

  // Save tab preference
  useEffect(() => {
    localStorage.setItem(LAST_TAB_KEY, activeTab);
  }, [activeTab]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm sm:backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-3 sm:inset-4 md:inset-auto md:inset-x-0 md:inset-y-0 md:m-auto md:w-full md:max-w-4xl md:h-fit md:max-h-[85vh] z-50 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Server Contents</h2>
              <button onClick={onClose} className="p-2 rounded-full glass-button shrink-0">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 border-b border-white/10 overflow-x-auto scrollbar-hide shrink-0">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base shrink-0 ${
                    activeTab === tab.id 
                      ? 'bg-foreground text-background' 
                      : 'bg-white/10 border border-white/20 hover:bg-white/15'
                  }`}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 scrollbar-hide">
              {/* Specifications Tab */}
              {activeTab === 'specs' && (
                <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                  {/* Infrastructure Header */}
                  <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                      Infrastructure That's Simply Not Comparable
                    </h3>
                    <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
                      <p>• This is <strong className="text-foreground">not</strong> a hobby SMP.</p>
                      <p>• This is <strong className="text-foreground">enterprise-grade infrastructure</strong> repurposed for Minecraft.</p>
                      <p>• Hosted on <strong className="text-foreground">Google Cloud Platform</strong> :: the same infrastructure used by large-scale production systems, not student projects.</p>
                    </div>
                    <div className="mt-4 p-3 sm:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <p className="text-sm text-yellow-200/90">
                        While most university servers run on repurposed desktops or bargain VPS nodes or even worse <strong className="text-yellow-400">ATERNOS</strong> (which lags with just 5 ppl), this server operates on cloud-native, production-class architecture designed for high-throughput, low-latency workloads.
                      </p>
                    </div>
                  </div>

                  {/* Compute Layer */}
                  <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Cpu className="w-6 h-6 text-blue-400" />
                      <h4 className="text-lg sm:text-xl font-bold text-foreground">Compute Layer (Zero Bottlenecks)</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="font-semibold text-foreground text-sm sm:text-base">8 vCPUs — Google C3 Class (Intel Sapphire Rapids Xeon)</p>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1">Optimized for compute-intensive, single-threaded workloads (exactly what Minecraft needs)</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="font-semibold text-foreground text-sm sm:text-base">32 GB High-Performance RAM</p>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1">Headroom for massive worlds, heavy plugins, and sustained concurrency</p>
                      </div>
                    </div>
                  </div>

                  {/* Network & Access */}
                  <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Network className="w-6 h-6 text-green-400" />
                      <h4 className="text-lg sm:text-xl font-bold text-foreground">Network & Access (Enterprise Routing)</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-foreground text-sm font-medium">Dedicated Static Public IP</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-foreground text-sm font-medium">Custom DNS Records</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-foreground text-sm font-medium">Clean, Branded Server Address</p>
                      </div>
                      <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
                        <p className="text-green-400 text-sm font-bold">Ever Lowest Ping (&lt;15ms)</p>
                      </div>
                    </div>
                  </div>

                  {/* Smart Resource Management */}
                  <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <Gauge className="w-6 h-6 text-purple-400" />
                      <h4 className="text-lg sm:text-xl font-bold text-foreground">Smart Resource Management</h4>
                    </div>
                    <div className="space-y-2 text-muted-foreground text-sm sm:text-base">
                      <p>• Idle detection & automated scaling policies</p>
                      <p>• Resources used efficiently, not recklessly</p>
                      <p>• <strong className="text-foreground">Craft Controller</strong> : Insane Dashboard for moderation</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'datapacks' && (
                <div className="text-center py-12 sm:py-16">
                  <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Datapack documentation is being prepared.</p>
                </div>
              )}

              {activeTab === 'commands' && (
                <div className="text-center py-12 sm:py-16">
                  <Terminal className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">Full command list is being prepared.</p>
                </div>
              )}

              {activeTab === 'plugins' && (
                <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                  {/* Duels Plugin */}
                  <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                    <div className="mb-4 sm:mb-6">
                      <a
                        href="https://modrinth.com/plugin/duels-optimised"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors"
                      >
                        Duels Plugin
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Challenge other players to 1v1 duels or team battles. Track your stats and compete for the top position on the leaderboard.
                      </p>
                    </div>

                    {/* 1v1 Duels Section */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">1v1 Duels</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                        Challenge someone with <code className="text-foreground bg-white/10 px-1.5 py-0.5 rounded text-xs">/duel &lt;player&gt;</code> or use <code className="text-foreground bg-white/10 px-1.5 py-0.5 rounded text-xs">/duel queue</code> to find a random opponent.
                      </p>
                      <div className="grid gap-2">
                        {duelsCommands.map(cmd => (
                          <div key={cmd.cmd} className="flex flex-col gap-1 py-2 px-3 rounded-lg bg-white/8 border border-white/5">
                            <code className="text-foreground font-mono text-xs sm:text-sm">{cmd.cmd}</code>
                            <span className="text-muted-foreground text-xs sm:text-sm">{cmd.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Party Duels Section */}
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Party Duels</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                        Create parties for group activities and team-based duels. Perfect for coordinating with multiple players.
                      </p>
                      <div className="grid gap-2">
                        {partyCommands.map(cmd => (
                          <div key={cmd.cmd} className="flex flex-col gap-1 py-2 px-3 rounded-lg bg-white/8 border border-white/5">
                            <code className="text-foreground font-mono text-xs sm:text-sm">{cmd.cmd}</code>
                            <span className="text-muted-foreground text-xs sm:text-sm">{cmd.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Better Teams Plugin */}
                  <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">Better Teams Plugin</h3>
                      <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Create and manage teams for collaborative gameplay. Form alliances, declare enemies, and coordinate with your teammates.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      {teamCommands.map(cmd => (
                        <div key={cmd.cmd} className="flex flex-col gap-1 py-2 px-3 rounded-lg bg-white/8 border border-white/5">
                          <code className="text-foreground font-mono text-xs sm:text-sm">{cmd.cmd}</code>
                          <span className="text-muted-foreground text-xs sm:text-sm">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 border border-white/15 p-3 sm:p-4 rounded-xl text-center backdrop-blur-sm">
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Need help? Ask in our{' '}
                      <a href="https://discord.gg/BJuyDHBm52" className="text-foreground hover:underline">
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
