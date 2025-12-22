import { motion } from 'framer-motion';
import { Server, Globe, Gamepad2, Swords, Map, Users, MessageSquare, Skull } from 'lucide-react';

const features = [
  {
    icon: Server,
    title: 'Google Cloud Powered',
    description: 'Java Edition on enterprise-grade infrastructure',
  },
  {
    icon: Globe,
    title: 'Custom World Generation',
    description: 'Terralith + Tectonic with amplified Nether',
  },
  {
    icon: Map,
    title: 'Massive World',
    description: '50k x 50k blocks with 90+ new structures to explore',
  },
  {
    icon: Swords,
    title: 'Duels System',
    description: 'Custom kits and multiple arenas for PvP',
  },
  {
    icon: Users,
    title: 'Team Play',
    description: 'BetterTeams with reputation & bounty system',
  },
  {
    icon: MessageSquare,
    title: 'Discord Sync',
    description: 'Real-time chat synchronization via DiscordSRV',
  },
  {
    icon: Gamepad2,
    title: 'Proximity Voice',
    description: 'In-game voice chat for immersive gameplay',
  },
  {
    icon: Skull,
    title: 'Enhanced Combat',
    description: 'Combat logging protection & player head drops',
  },
];

const serverInfo = [
  { label: 'Platform', value: 'Google Cloud (Java)' },
  { label: 'Version', value: '1.21.11' },
  { label: 'Software', value: 'PaperMC / Fabric' },
  { label: 'Mode', value: 'Survival' },
  { label: 'Difficulty', value: 'Hard' },
  { label: 'Cracked', value: 'Enabled' },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
            Server Features
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Experience Minecraft like never before with our curated selection of plugins and customizations
          </p>
        </motion.div>

        {/* Server Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card p-4 sm:p-6 rounded-2xl mb-12 sm:mb-16"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {serverInfo.map((info) => (
              <div key={info.label} className="text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{info.label}</p>
                <p className="text-foreground font-semibold text-sm">{info.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.25 }}
              viewport={{ once: true, amount: 0.1 }}
              className="glass p-4 sm:p-6 rounded-2xl group hover:border-white/20 transition-colors duration-200"
            >
              <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
