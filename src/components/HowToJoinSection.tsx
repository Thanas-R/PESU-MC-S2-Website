import { motion } from 'framer-motion';
import { MessageSquare, Server, Key, Bot, UserCheck, AlertTriangle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Join Discord Server',
    description: 'Click the Discord button above or use the invite link to join our community',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Add Server IP',
    description: 'Open Minecraft, go to Multiplayer, and add server: pesu-mc.ddns.net',
    icon: Server,
  },
  {
    number: '03',
    title: 'Get Verification Code',
    description: 'Connect to the server and receive your unique verification code',
    icon: Key,
  },
  {
    number: '04',
    title: 'DM the Bot',
    description: 'Send your verification code to @PESU-MC bot on Discord',
    icon: Bot,
  },
  {
    number: '05',
    title: 'Register Your Account',
    description: 'Use command: /register <password> <password>',
    icon: UserCheck,
  },
];

export const HowToJoinSection = () => {
  return (
    <section id="how-to-join" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            How to <span className="text-primary">Join</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow these simple steps to start your adventure
          </p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="glass p-4 rounded-2xl mb-10 flex items-center gap-3 justify-center border-orange/30"
        >
          <AlertTriangle className="w-5 h-5 text-orange" />
          <p className="text-orange font-medium">Discord Verification Required</p>
        </motion.div>

        {/* Steps Flow */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="glass p-6 rounded-2xl inline-block hover:border-primary/50 transition-all duration-300 group">
                    <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-4xl font-bold text-primary/30">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary ring-4 ring-background absolute left-1/2 -translate-x-1/2" />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://discord.com/invite/dVGj9pfG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-discord hover:bg-discord-hover rounded-2xl font-semibold text-lg transition-all duration-300 glow-discord hover:scale-105"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
            </svg>
            Join Discord to Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
};
