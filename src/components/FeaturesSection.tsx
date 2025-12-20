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
    description: '50k x 50k blocks world border to explore',
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
    title: 'Hardcore PvP',
    description: 'Combat logging protection & player head drops',
  },
];

const serverInfo = [
  { label: 'Platform', value: 'Google Cloud (Java)' },
  { label: 'Version', value: '1.21.11' },
  { label: 'Server Software', value: 'PaperMC / Fabric' },
  { label: 'Mode', value: 'Survival' },
  { label: 'Difficulty', value: 'Hard' },
  { label: 'Cracked Access', value: 'Enabled' },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Server <span className="text-primary">Features</span>
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
          className="glass-card p-6 rounded-3xl mb-12 overflow-x-auto"
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {serverInfo.map((info, index) => (
              <div key={info.label} className="text-center min-w-[120px]">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{info.label}</p>
                <p className="text-foreground font-semibold">{info.value}</p>
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
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
