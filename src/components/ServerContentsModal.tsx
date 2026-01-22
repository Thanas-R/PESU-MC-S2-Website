import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Terminal, BookOpen, ExternalLink, Server, Cpu, Network, Gauge } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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

// Commands organized by category - TPA, Duels, Better Teams first
const tpaCommands = [
  { cmd: '/tpa', desc: 'Request to teleport to another player.' },
  { cmd: '/tpacancel', desc: 'Cancel a teleport request you sent.' },
  { cmd: '/tpaccept', desc: 'Accept a teleport request from another player.' },
  { cmd: '/tpadeny', desc: 'Deny a teleport request from another player.' },
  { cmd: '/tpahere', desc: 'Request another player to teleport to your location.' },
];

const duelsCommands = [
  { cmd: '/1v1, /duel', desc: 'Duel another player with a specified kit and map.' },
  { cmd: '/kit', desc: 'Edit / manage your duel kit layout.' },
  { cmd: '/q, /queue', desc: 'Queue a specific kit to duel.' },
  { cmd: '/spec, /spectate', desc: 'Spectate an ongoing duel.' },
  { cmd: '/return, /tpareturn', desc: 'Return to previous location (after duel/TP).' },
];

const teamCommands = [
  { cmd: '/team', desc: 'Team-related operations (Better Teams plugin).' },
  { cmd: '/tc, /teamchat, /tchat', desc: 'Sends a message to only the members of your current team.' },
  { cmd: '/ac, /allychat', desc: 'Sends a message to all members of your team and any allied teams.' },
  { cmd: '/team create <name>', desc: 'Creates a new team if you are not already in one.' },
  { cmd: '/team disband', desc: 'Destroys your team (only usable by the team owner).' },
  { cmd: '/team leave', desc: 'Removes you from your current team.' },
  { cmd: '/team invite <player>', desc: 'Invites a player to your team.' },
  { cmd: '/team join <team-name>', desc: 'Joins a team you have been invited to.' },
  { cmd: '/team kick <player>', desc: 'Kicks a player from your team.' },
  { cmd: '/team info', desc: 'Displays information about your current team.' },
  { cmd: '/team list', desc: 'Lists all teams on the server.' },
  { cmd: '/team prefix <prefix>', desc: "Changes the prefix for your team's name in chat." },
  { cmd: '/team ally [add/remove] <team-name>', desc: 'Adds or removes an allied team.' },
  { cmd: '/team enemy [add/remove] <team-name>', desc: 'Adds or removes an enemy team.' },
  { cmd: '/team pvp', desc: 'Toggles the friendly fire status for your team.' },
  { cmd: '/team [promote/demote] <player>', desc: 'Promotes or demotes a team member to/from team manager.' },
  { cmd: '/team permission [add/remove] <permission>', desc: 'Adds or removes a permission for team managers to use specific team commands.' },
];

// Remaining commands
const minecraftCommands = [
  { cmd: '/?, /help', desc: 'Show help / list of default Minecraft commands.' },
  { cmd: '/me', desc: 'Emote message (default Minecraft).' },
  { cmd: '/msg', desc: 'Send a private message to another player.' },
  { cmd: '/teammsg', desc: 'Send a message to your team.' },
  { cmd: '/tell', desc: 'Alias for private message.' },
  { cmd: '/w', desc: 'Alias for private message (whisper).' },
];

const bukkitCommands = [
  { cmd: '/about, /ver, /version, /icanhasbukkit', desc: 'Display server / Bukkit version information.' },
  { cmd: '/pl, /plugins', desc: 'Display the list of installed server plugins.' },
];

const authmeCommands = [
  { cmd: '/2fa', desc: 'AuthMe two-factor authentication command.' },
  { cmd: '/authme', desc: 'AuthMe "super-command" (main AuthMe command).' },
  { cmd: '/captcha', desc: 'AuthMe captcha authentication.' },
  { cmd: '/cp, /changepass, /changepassword', desc: 'Change player password.' },
  { cmd: '/email', desc: 'Update player email.' },
  { cmd: '/l, /login', desc: 'Log in to the server with your registered password.' },
  { cmd: '/logout', desc: 'Log out of the server.' },
  { cmd: '/reg, /register', desc: 'Register (create an account) with a password.' },
  { cmd: '/totp', desc: 'AuthMe time-based OTP (TOTP) authentication.' },
  { cmd: '/unreg, /unregister', desc: 'Unregister / remove account from the server.' },
  { cmd: '/verification', desc: 'AuthMe verification command.' },
];

const kbsCommands = [
  { cmd: '/kbs, /kbsync, /knockbacksync', desc: 'Display info / status for the KnockbackSync plugin.' },
];

const luckpermsCommands = [
  { cmd: '/lp, /luckperms', desc: 'Display LuckPerms info / commands (permissions plugin).' },
];

const multiverseCommands = [
  { cmd: '/mv', desc: 'Display Multiverse-Core info / commands (multi-world plugin).' },
];

const skinsCommands = [
  { cmd: '/skin', desc: 'Edit a custom skin with SkinsRestorer.' },
  { cmd: '/skins', desc: 'View / change skins with SkinsRestorer.' },
];

// Plugins data
const plugins = [
  {
    name: 'Anti Combatlog',
    link: 'https://modrinth.com/datapack/anti-combatlog',
    description: 'Prevents players from combat-logging by putting players into a "combat" state for a configurable time after dealing/receiving damage; if they log out while in combat, they are penalized.',
    commands: [
      { cmd: '/scoreboard players set .config xv_combat_timer_seconds <seconds>', desc: 'Configure combat timer duration.' },
    ],
  },
  {
    name: 'AuthMe ReReloaded (Fork)',
    link: 'https://modrinth.com/plugin/authmerereloaded',
    description: 'Authentication plugin for offline/cracked servers or extra protection. Prevents unauthenticated players from moving, using inventory, or commands until they register/login. Supports captcha, 2FA/TOTP, and email updates.',
    commands: [
      { cmd: '/register <password>', desc: 'Create an account.' },
      { cmd: '/login <password>', desc: 'Authenticate to the server.' },
      { cmd: '/logout', desc: 'Log out of the server.' },
      { cmd: '/changepass <old> <new>', desc: 'Change your password.' },
    ],
  },
  {
    name: 'Better Teams',
    link: 'https://www.spigotmc.org/resources/better-teams.17129/',
    description: 'Allows players to team up, share resources, and compete! Create teams, form alliances, declare enemies, and coordinate with teammates.',
    commands: teamCommands,
  },
  {
    name: 'Chunky',
    link: 'https://modrinth.com/plugin/chunky',
    description: 'High-performance chunk pre-generator — quickly pregenerates world chunks to reduce on-demand CPU spikes and lag when players explore.',
    commands: [],
  },
  {
    name: 'Dimension Control',
    link: 'https://modrinth.com/plugin/dimensioncontrol',
    description: 'Lightweight plugin to enable/disable/create/remove custom dimensions (worlds) quickly via commands. Control Nether/End portals access.',
    commands: [
      { cmd: '/dimensioncontrol create <name> <type>', desc: 'Create a world (type: NORMAL/NETHER/END).' },
      { cmd: '/dimensioncontrol remove <name>', desc: 'Remove a world.' },
      { cmd: '/dimensioncontrol toggle <dimension>', desc: 'Enable/disable a dimension.' },
    ],
  },
  {
    name: 'Duels Optimised',
    link: 'https://modrinth.com/plugin/duels-optimised',
    description: 'Allows players to duel with editable kits in various arenas, and see their stats! Challenge others to 1v1 battles.',
    commands: duelsCommands,
  },
  {
    name: 'Lightning Grim Anticheat',
    link: 'https://modrinth.com/plugin/lightning-grim-anticheat',
    description: 'Prevents players from cheating (extra reach, aim, etc). High-precision anticheat fork focused on reach checks and knockback protection with low false positives.',
    commands: [
      { cmd: '/grim status', desc: 'Display anticheat status.' },
      { cmd: '/grim debug', desc: 'Toggle debug mode.' },
    ],
  },
  {
    name: 'KnockbackSync',
    link: 'https://modrinth.com/plugin/knockbacksync',
    description: "Fixes Minecraft's knockback system which is faulty at higher latencies. Synchronizes knockback so PvP behaves fairly across varying player pings.",
    commands: [
      { cmd: '/kbs, /kbsync', desc: 'Display KnockbackSync info/status.' },
    ],
  },
  {
    name: 'LuckPerms',
    link: 'https://modrinth.com/plugin/luckperms',
    description: 'Player permissions management plugin. Industry-standard, full-featured permissions with users/groups, meta, contexts, and web editor.',
    commands: [
      { cmd: '/lp user <user> info', desc: 'Show info about a user.' },
      { cmd: '/lp user <user> permission set <node> true', desc: 'Grant a permission.' },
      { cmd: '/lp group <group> permission set <node> true', desc: 'Set group permission.' },
      { cmd: '/lp editor', desc: 'Open the web-based editor.' },
    ],
  },
  {
    name: 'Multiverse-Core',
    link: 'https://modrinth.com/plugin/multiverse-core',
    description: 'Bukkit world management plugin. Create/load/teleport between multiple worlds, manage properties per world.',
    commands: [
      { cmd: '/mv create <world> <ENV>', desc: 'Create a world (ENV = NORMAL, NETHER, END).' },
      { cmd: '/mv tp <player> <world>', desc: 'Teleport to a world.' },
      { cmd: '/mv remove <world>', desc: 'Remove a world.' },
    ],
  },
  {
    name: 'Multiverse-Inventories',
    link: 'https://modrinth.com/plugin/multiverse-inventories',
    description: 'Bukkit cross-world player data management plugin for Multiverse-Core. Separate inventories, health, XP per-world or shared per defined groups.',
    commands: [
      { cmd: '/mvinv group', desc: 'Create inventory groups.' },
      { cmd: '/mvinv addgroup <world> <group>', desc: 'Assign worlds to shared-inventory groups.' },
    ],
  },
  {
    name: 'SkinsRestorer',
    link: 'https://modrinth.com/plugin/skinsrestorer',
    description: 'Adds the ability to restore/change skins on online/offline mode servers! Lets players change skins via commands.',
    commands: [
      { cmd: '/skin <name>', desc: 'Set skin by username.' },
      { cmd: '/skin url "<url>"', desc: 'Set skin from a direct URL.' },
      { cmd: '/skins', desc: 'View available skins.' },
    ],
  },
  {
    name: 'Tablist Config',
    link: 'https://modrinth.com/plugin/config-tablist',
    description: 'Server player list configuration plugin. Customize the player tab-list with headers, footers, ordering, and placeholders.',
    commands: [
      { cmd: '/tab reload', desc: 'Reload tab configuration.' },
    ],
  },
  {
    name: 'Just TPA',
    link: 'https://modrinth.com/plugin/just-tpa',
    description: 'Allows players to send and receive TPA requests. Simple teleport request plugin for basic TPA behavior.',
    commands: tpaCommands,
  },
  {
    name: 'ViaVersion',
    link: 'https://modrinth.com/plugin/viaversion',
    description: 'Allows newer clients to connect to older servers. Compatibility layer letting multiple client versions on a single server.',
    commands: [],
  },
  {
    name: 'Simple Voice Chat',
    link: 'https://modrinth.com/plugin/simple-voice-chat',
    description: 'Adds voice proximity chat to Minecraft, provided the mod is installed client-side. Players talk to nearby players in-game.',
    commands: [],
  },
  {
    name: 'VoidGen',
    link: 'https://modrinth.com/plugin/voidgen',
    description: 'Lightweight void world generation plugin for Multiverse-Core. Create empty/void maps for minigame/arena servers.',
    commands: [],
  },
  {
    name: 'WorldEdit',
    link: 'https://modrinth.com/plugin/worldedit',
    description: 'Minecraft map editor plugin. In-game selections, copy/paste, brushes, schematics, and scripting for building and mapmaking.',
    commands: [
      { cmd: '//wand', desc: 'Get selection wand.' },
      { cmd: '//pos1, //pos2', desc: 'Set selection corners.' },
      { cmd: '//set <block>', desc: 'Fill selection with block.' },
      { cmd: '//copy, //paste', desc: 'Copy/paste selections.' },
      { cmd: '//undo', desc: 'Undo last action.' },
    ],
  },
  {
    name: 'WorldGuard',
    link: 'https://modrinth.com/plugin/worldguard',
    description: 'Minecraft region-based feature tweaking plugin in conjunction with WorldEdit. Protect builds, set flags for mob-spawning, fire-spread, PvP.',
    commands: [
      { cmd: '/rg define <name>', desc: 'Define a region.' },
      { cmd: '/rg flag <region> <flag> <value>', desc: 'Set flags (pvp, build, mobs, fire-spread).' },
    ],
  },
];

// Helper component for command blocks
const CommandBlock = ({ cmd, desc }: { cmd: string; desc: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 px-3 rounded-lg bg-white/8 border border-white/5">
    <code className="text-foreground font-mono text-xs sm:text-sm shrink-0">{cmd}</code>
    <span className="text-muted-foreground text-xs sm:text-sm">{desc}</span>
  </div>
);

// Helper component for help note
const HelpNote = () => (
  <div className="bg-white/10 border border-white/15 p-3 sm:p-4 rounded-xl text-center backdrop-blur-sm">
    <p className="text-muted-foreground text-xs sm:text-sm">
      Need help? Ask in our{' '}
      <a href="https://discord.gg/BJuyDHBm52" className="text-foreground hover:underline">
        Discord community
      </a>{' '}
      or contact a staff member in-game!
    </p>
  </div>
);

export const ServerContentsModal = ({
  isOpen,
  onClose
}: ServerContentsModalProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem(LAST_TAB_KEY);
    return saved && tabs.some(t => t.id === saved) ? saved : 'specs';
  });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    localStorage.setItem(LAST_TAB_KEY, activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

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

          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
            onWheel={(e) => {
              if (contentRef.current) {
                contentRef.current.scrollTop += e.deltaY;
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-4xl max-h-[85vh] bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
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
                {tabs.map((tab) => (
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
              <div
                ref={contentRef}
                tabIndex={-1}
                className="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar focus:outline-none"
              >
                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                  <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
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
                          While most university servers run on repurposed desktops or bargain VPS nodes (which lags with just 5 ppl), this server operates on cloud-native, production-class architecture designed for high-throughput, low-latency workloads.
                        </p>
                      </div>
                    </div>

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

                    <HelpNote />
                  </div>
                )}

                {activeTab === 'datapacks' && (
                  <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                    <div className="text-center py-12 sm:py-16">
                      <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">Coming Soon</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">Datapack documentation is being prepared.</p>
                    </div>
                    <HelpNote />
                  </div>
                )}

                {activeTab === 'commands' && (
                  <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                    {/* Just TPA - First */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Just TPA</h4>
                      <div className="grid gap-2">
                        {tpaCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* Duels Optimised - Second */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Duels Optimised</h4>
                      <div className="grid gap-2">
                        {duelsCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* Better Teams - Third */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Better Teams</h4>
                      <div className="grid gap-2">
                        {teamCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* Minecraft (default) */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Minecraft (default)</h4>
                      <div className="grid gap-2">
                        {minecraftCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* Bukkit / Spigot / Paper */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Bukkit / Spigot / Paper</h4>
                      <div className="grid gap-2">
                        {bukkitCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* AuthMe ReLoaded (Fork) */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">AuthMe ReLoaded (Fork)</h4>
                      <div className="grid gap-2">
                        {authmeCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* KnockbackSync */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">KnockbackSync</h4>
                      <div className="grid gap-2">
                        {kbsCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* LuckPerms */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">LuckPerms</h4>
                      <div className="grid gap-2">
                        {luckpermsCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* Multiverse-Core */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Multiverse-Core</h4>
                      <div className="grid gap-2">
                        {multiverseCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    {/* Skins Restorer */}
                    <div className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Skins Restorer</h4>
                      <div className="grid gap-2">
                        {skinsCommands.map((cmd) => (
                          <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                        ))}
                      </div>
                    </div>

                    <HelpNote />
                  </div>
                )}

                {activeTab === 'plugins' && (
                  <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
                    {plugins.map((plugin) => (
                      <div key={plugin.name} className="bg-white/10 border border-white/15 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                        <div className="mb-4">
                          <a
                            href={plugin.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-foreground hover:text-muted-foreground transition-colors"
                          >
                            {plugin.name}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                            {plugin.description}
                          </p>
                        </div>
                        {plugin.commands && plugin.commands.length > 0 && (
                          <div className="grid gap-2">
                            {plugin.commands.map((cmd) => (
                              <CommandBlock key={cmd.cmd} cmd={cmd.cmd} desc={cmd.desc} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <HelpNote />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
