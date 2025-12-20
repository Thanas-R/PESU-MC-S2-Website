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
    <section id="how-to-join" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How to Join
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow these simple steps to start your adventure
          </p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="glass p-4 rounded-xl mb-12 flex items-center gap-3 justify-center border-[hsl(38,92%,50%)]/30"
        >
          <AlertTriangle className="w-5 h-5 text-[hsl(38,92%,50%)]" />
          <p className="text-[hsl(38,92%,50%)] font-medium">Discord Verification Required</p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl flex items-start gap-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-muted-foreground">{step.number}</span>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://discord.com/invite/dVGj9pfG"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[hsl(235,86%,65%)] hover:bg-[hsl(235,86%,58%)] rounded-2xl font-semibold text-lg text-white transition-all duration-300 hover:scale-105"
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
