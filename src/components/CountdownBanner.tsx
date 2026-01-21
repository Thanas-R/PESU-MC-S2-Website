import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, PartyPopper } from 'lucide-react';

// Target: February 23rd, 2025, 6:00 PM IST (UTC+5:30)
// IST is UTC+5:30, so 6:00 PM IST = 12:30 PM UTC
const TARGET_DATE = new Date('2025-02-23T12:30:00.000Z');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setIsLive(true);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    const initial = calculateTimeLeft();
    if (initial) {
      setTimeLeft(initial);
    } else {
      setIsLive(true);
    }

    // Update every second
    const timer = setInterval(() => {
      const result = calculateTimeLeft();
      if (result) {
        setTimeLeft(result);
      } else {
        setIsLive(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="glass-card px-3 sm:px-4 py-2 sm:py-3 rounded-xl min-w-[50px] sm:min-w-[70px]">
        <span className="text-xl sm:text-3xl font-bold text-foreground tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:py-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass rounded-2xl px-4 sm:px-6 py-4 sm:py-5 border border-white/20">
          <AnimatePresence mode="wait">
            {isLive ? (
              <motion.div
                key="live"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  <span className="text-xl sm:text-2xl font-bold text-foreground">
                    🎉 Season 2 is LIVE!
                  </span>
                  <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <span className="text-green-400 text-sm sm:text-base font-medium animate-pulse">
                  Join now and start your adventure!
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                    Season 2 Launch Countdown
                  </span>
                </div>
                
                {timeLeft && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <TimeBlock value={timeLeft.days} label="Days" />
                    <span className="text-xl sm:text-2xl font-bold text-muted-foreground">:</span>
                    <TimeBlock value={timeLeft.hours} label="Hours" />
                    <span className="text-xl sm:text-2xl font-bold text-muted-foreground">:</span>
                    <TimeBlock value={timeLeft.minutes} label="Mins" />
                    <span className="text-xl sm:text-2xl font-bold text-muted-foreground">:</span>
                    <TimeBlock value={timeLeft.seconds} label="Secs" />
                  </div>
                )}

                <p className="text-xs sm:text-sm text-muted-foreground">
                  February 23rd, 6:00 PM IST
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
