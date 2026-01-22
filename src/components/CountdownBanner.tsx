import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

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
  const hasTriggeredConfetti = useRef(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        expired: false,
      };
    };

    // Initial calculation
    const initial = calculateTimeLeft();
    if (initial.expired) {
      setIsLive(true);
    } else {
      setTimeLeft(initial);
    }

    // Update every second
    const timer = setInterval(() => {
      const result = calculateTimeLeft();
      if (result.expired) {
        setIsLive(true);
        clearInterval(timer);
        
        // Trigger confetti animation on transition
        if (!hasTriggeredConfetti.current) {
          hasTriggeredConfetti.current = true;
          triggerConfetti();
        }
      } else {
        setTimeLeft(result);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Launch confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#ffffff'],
      });
    }, 250);
  };

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
