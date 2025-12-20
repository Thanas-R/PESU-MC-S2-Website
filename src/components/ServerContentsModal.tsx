import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Terminal, BookOpen, ExternalLink } from 'lucide-react';
import { useState } from 'react';
interface ServerContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const tabs = [{
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
  const [activeTab, setActiveTab] = useState('plugins');
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-8 bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 bg-black/30 backdrop-blur-xl border border-white/15 rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold">Server Contents</h2>
              <button onClick={onClose} className="p-2 rounded-full glass-button">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-4 border-b border-white/10">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'bg-foreground text-background' : 'glass-button'
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
                <div className="space-y-6 max-w-3xl mx-auto">
                  {/* Duels Plugin */}
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="mb-6">
                      <a
                        href="https://modrinth.com/plugin/duels-optimised"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-2xl font-bold text-foreground hover:text-muted-foreground transition-colors"
                      >
                        Duels Plugin
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <p className="text-muted-foreground mt-2">
                        Challenge other players to 1v1 duels or team battles. Track your stats and compete for the top position on the leaderboard.
                      </p>
                    </div>

                    {/* 1v1 Duels Section */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-foreground">1v1 Duels</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Challenge someone with <code className="text-foreground bg-white/10 px-1.5 py-0.5 rounded">/duel &lt;player&gt;</code> or use <code className="text-foreground bg-white/10 px-1.5 py-0.5 rounded">/duel queue</code> to find a random opponent.
                      </p>
                      <div className="grid gap-2">
                        {duelsCommands.map(cmd => (
                          <div key={cmd.cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 px-3 rounded-lg bg-white/5">
                            <code className="text-foreground font-mono text-sm">{cmd.cmd}</code>
                            <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Party Duels Section */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-foreground">Party Duels</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Create parties for group activities and team-based duels. Perfect for coordinating with multiple players.
                      </p>
                      <div className="grid gap-2">
                        {partyCommands.map(cmd => (
                          <div key={cmd.cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 px-3 rounded-lg bg-white/5">
                            <code className="text-foreground font-mono text-sm">{cmd.cmd}</code>
                            <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Better Teams Plugin */}
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-foreground">Better Teams Plugin</h3>
                      <p className="text-muted-foreground mt-2">
                        Create and manage teams for collaborative gameplay. Form alliances, declare enemies, and coordinate with your teammates.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      {teamCommands.map(cmd => (
                        <div key={cmd.cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 px-3 rounded-lg bg-white/5">
                          <code className="text-foreground font-mono text-sm">{cmd.cmd}</code>
                          <span className="text-muted-foreground text-sm">{cmd.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                    <p className="text-muted-foreground text-sm">
                      Need help? Ask in our{' '}
                      <a href="https://discord.com/invite/dVGj9pfG" className="text-foreground hover:underline">
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