import { useState, useEffect } from 'react';
import { useCelebration } from './CelebrationEffect';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target: January 23rd, 2026 at 6:00 PM IST (UTC+5:30)
const TARGET_DATE = new Date('2026-01-23T18:00:00+05:30').getTime();

export const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const { trigger: triggerCelebration } = useCelebration();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        if (!isLive) {
          setIsLive(true);
          triggerCelebration();
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    const initial = calculateTimeLeft();
    setTimeLeft(initial);

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isLive, triggerCelebration]);

  if (isLive) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-500/90 backdrop-blur-sm py-2 px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-white font-semibold text-sm">Season 2 is LIVE!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass py-2 px-4 border-b border-white/10">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <span className="text-muted-foreground text-xs sm:text-sm">Season 2 starts in</span>
        <div className="flex items-center gap-1 sm:gap-2">
          <TimeUnit value={timeLeft.days} label="D" />
          <span className="text-muted-foreground">:</span>
          <TimeUnit value={timeLeft.hours} label="H" />
          <span className="text-muted-foreground">:</span>
          <TimeUnit value={timeLeft.minutes} label="M" />
          <span className="text-muted-foreground">:</span>
          <TimeUnit value={timeLeft.seconds} label="S" />
        </div>
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex items-center gap-0.5">
    <span className="font-mono font-bold text-foreground text-sm sm:text-base">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-muted-foreground text-xs">{label}</span>
  </div>
);
