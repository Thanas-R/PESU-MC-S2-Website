import { motion } from 'framer-motion';
import { Copy, Check, Users } from 'lucide-react';
import { useState } from 'react';
import serverIcon from '@/assets/server-icon.png';
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
          {/* Server Status with transition animation - HIDDEN ON PHONE */}
          <motion.div 
            key={isOnline ? 'online' : 'offline'}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-500 ${
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

          {/* Player Count with transition animation - HIDDEN ON PHONE */}
          <motion.div 
            key={`${playerCount}-${maxPlayers}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 glass-card rounded-full"
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
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4"
        >
          {/* Social Icons - Vertical on desktop, Horizontal on mobile */}
          <div className="flex flex-row sm:flex-col gap-3 sm:gap-2 justify-center">
            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/pesumc/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" className="w-full h-full drop-shadow-lg">
                <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248m0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008m4.807-8.875a1.078 1.078 0 1 0 0 2.156 1.078 1.078 0 1 0 0-2.156"></path>
                <path d="M20.533 6.111A4.6 4.6 0 0 0 17.9 3.479a6.6 6.6 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.6 6.6 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.6 6.6 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71s0 2.753.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632 6.6 6.6 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.6 6.6 0 0 0 2.186-.419 4.6 4.6 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.6 6.6 0 0 0-.421-2.217m-1.218 9.532a5 5 0 0 1-.311 1.688 3 3 0 0 1-1.712 1.711 5 5 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a5 5 0 0 1-1.669-.311 3 3 0 0 1-1.719-1.711 5.1 5.1 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654s0-2.686.053-3.655a5 5 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5 5 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a5 5 0 0 1 1.67.311 3 3 0 0 1 1.712 1.712 5.1 5.1 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655s0 2.698-.043 3.654z"></path>
              </svg>
            </a>

            {/* YouTube Button */}
            <button
              onClick={onOpenTrailer}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 transition-all duration-200 hover:scale-110"
              aria-label="Watch Trailer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" className="w-full h-full drop-shadow-lg">
                <path d="M21.593 7.203a2.5 2.5 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.52 2.52 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831M9.996 15.005l.005-6 5.207 3.005z"></path>
              </svg>
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
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0
