import { useEffect, useState } from 'react';

const features = [
  {
    icon: 'Server',
    title: 'Google Cloud Powered',
    description: 'Java Edition on enterprise-grade infrastructure',
  },
  {
    icon: 'Globe',
    title: 'Custom World Generation',
    description: 'Terralith + Tectonic with amplified Nether',
  },
  {
    icon: 'Map',
    title: 'Massive World',
    description: '50k x 50k blocks with 90+ new structures to explore',
  },
  {
    icon: 'Swords',
    title: 'Duels System',
    description: 'Custom kits and multiple arenas for PvP',
  },
  {
    icon: 'Users',
    title: 'Team Play',
    description: 'BetterTeams with reputation & bounty system',
  },
  {
    icon: 'MessageSquare',
    title: 'Discord Sync',
    description: 'Real-time chat synchronization via DiscordSRV',
  },
  {
    icon: 'Gamepad2',
    title: 'Proximity Voice',
    description: 'In-game voice chat for immersive gameplay',
  },
  {
    icon: 'Skull',
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

// Simple icon components to avoid lucide re-renders
const icons: Record<string, React.FC<{ className?: string }>> = {
  Server: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>,
  Globe: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Map: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15"/><path d="M15 6v15"/></svg>,
  Swords: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>,
  Users: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  MessageSquare: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Gamepad2: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>,
  Skull: ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>,
};

export const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground">
            Server Features
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Experience Minecraft like never before with our curated selection of plugins and customizations
          </p>
        </div>

        {/* Server Info Bar */}
        <div
          className={`glass-card p-4 sm:p-6 rounded-2xl mb-12 sm:mb-16 transition-all duration-500 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {serverInfo.map((info) => (
              <div key={info.label} className="text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{info.label}</p>
                <p className="text-foreground font-semibold text-sm">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.title}
                className={`glass p-4 sm:p-6 rounded-2xl group hover:border-white/20 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isVisible ? `${150 + index * 30}ms` : '0ms' }}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-foreground mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
