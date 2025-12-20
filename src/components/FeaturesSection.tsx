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
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Server Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience Minecraft like never before with our curated selection of plugins and customizations
          </p>
        </motion.div>

        {/* Server Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card p-6 rounded-2xl mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {serverInfo.map((info) => (
              <div key={info.label} className="text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{info.label}</p>
                <p className="text-foreground font-semibold text-sm">{info.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl group hover:border-white/20 transition-all duration-300"
            >
              <feature.icon className="w-8 h-8 text-foreground mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
