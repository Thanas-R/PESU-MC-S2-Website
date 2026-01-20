import { motion } from 'framer-motion';
import { Copy, Check, Users } from 'lucide-react';
import { useState } from 'react';
import serverIcon from '@/assets/server-icon.png';
import instagramIcon from '@/assets/icons/instagram.png';
import youtubeIcon from '@/assets/icons/youtube.png';
import { toast } from '@/hooks/use-toast';
import { useServerStatus } from '@/hooks/use-server-status';

interface HeroSectionProps {
  onOpenServerContents: () => void;
  onOpenTrailer: () => void;
}

export const HeroSection = ({
  onOpenServerContents,
  onOpenTrailer
}: HeroSectionProps) => {
  const [copied, setCopied] = useState(false);
  const serverIP = 'pesu-mc.ddns.net';

  // Real-time server status from API
  const { isOnline, playerCount, maxPlayers, isLoading } = useServerStatus();

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP);
      setCopied(true);
      toast({
        title: "IP Copied!",
        description: `${serverIP} has been copied to your clipboard.`,
        duration: 2000
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually: " + serverIP,
        variant: "destructive",
        duration: 2000
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center max-w-6xl mx-auto w-full">
        {/* Server Status + Player Count - ABOVE Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          {/* Server Status with transition animation */}
          <motion.div 
            key={isOnline ? 'online' : 'offline'}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-500 ${
              isOnline 
                ? 'bg-green-500/20 border-green-500/40 text-green-400' 
                : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
            <span className="font-semibold text-sm sm:text-base">
              Server {isOnline ? 'Online' : 'Offline'}
            </span>
          </motion.div>

          {/* Player Count with transition animation */}
          <motion.div 
            key={`${playerCount}-${maxPlayers}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass-card rounded-full"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <span className="text-foreground font-semibold text-sm sm:text-base">
              {playerCount}/{maxPlayers} Players
            </span>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 sm:mb-8 tracking-tight text-foreground"
        >
          PESU MINECRAFT
          <span className="flex items-center justify-center gap-2 sm:gap-3 text-xl sm:text-3xl md:text-5xl lg:text-6xl mt-3 sm:mt-4 font-light text-muted-foreground">
            SEASON 2
            <img src={serverIcon} alt="Server Icon" className="inline-block h-[1em] w-[1em] object-contain" />
          </span>
        </motion.h1>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-5 mb-8 sm:mb-10"
        >
          {/* Version Card */}
          <div className="glass-card px-6 sm:px-10 py-4 sm:py-6 rounded-2xl transition-colors duration-200 hover:border-white/25">
            <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">Version</p>
            <p className="text-foreground text-xl sm:text-2xl font-semibold">1.21.11</p>
          </div>

          {/* IP Address Card */}
          <button
            onClick={handleCopyIP}
            className="glass-card px-6 sm:px-10 py-4 sm:py-6 rounded-2xl group cursor-pointer transition-colors duration-200 hover:border-white/25"
          >
            <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2 flex items-center justify-center sm:justify-start gap-2">
              IP Address
              {copied ? (
                <Check className="w-4 h-4 text-foreground" />
              ) : (
                <Copy className="w-4 h-4 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}
            </p>
            <p className="text-foreground text-lg sm:text-2xl font-semibold font-mono">{serverIP}</p>
          </button>

          {/* Mode Card */}
          <div className="glass-card px-6 sm:px-10 py-4 sm:py-6 rounded-2xl transition-colors duration-200 hover:border-white/25">
            <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">Mode</p>
            <p className="text-foreground text-xl sm:text-2xl font-semibold">Survival</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
        >
          {/* Social Icons - Instagram (left) & YouTube (right) */}
          <div className="flex gap-3 justify-center">
            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/pesumc/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 overflow-hidden"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover" />
            </a>

            {/* YouTube Button */}
            <button
              onClick={onOpenTrailer}
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 overflow-hidden"
              aria-label="Watch Trailer"
            >
              <img src={youtubeIcon} alt="YouTube" className="w-[85%] h-[85%] object-contain" />
            </button>
          </div>

          {/* Discord Button */}
          <a
            href="https://discord.gg/BJuyDHBm52"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[hsl(235,86%,65%)] hover:bg-[hsl(235,86%,58%)] rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 text-base sm:text-lg"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
            </svg>
            Join Discord
          </a>

          {/* Server Contents Button */}
          <button
            onClick={onOpenServerContents}
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl font-bold transition-all duration-200 hover:scale-105 text-base sm:text-lg"
          >
            Server Contents
          </button>
        </motion.div>
      </div>
    </section>
  );
};
