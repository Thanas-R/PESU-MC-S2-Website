import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  life: number;
}

// Target: January 23rd, 2026 at 6:00 PM IST (UTC+5:30)
const TARGET_DATE = new Date('2026-01-23T18:00:00+05:30').getTime();

const CONFETTI_COLORS = [
  '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
  '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'
];

export const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const createConfetti = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 4 + Math.random() * 6,
        velocityX: (Math.random() - 0.5) * 3,
        velocityY: 2 + Math.random() * 4,
        gravity: 0.1 + Math.random() * 0.1,
        life: 1
      });
    }
    setParticles(newParticles);
    setShowConfetti(true);

    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
      setParticles([]);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!showConfetti || particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.velocityX * 0.3,
            y: p.y + p.velocityY,
            velocityY: p.velocityY + p.gravity,
            life: p.life - 0.01
          }))
          .filter(p => p.life > 0 && p.y < 120)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [showConfetti, particles.length]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        if (!isLive) {
          setIsLive(true);
          createConfetti();
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
  }, [isLive, createConfetti]);

  if (isLive) {
    return (
      <>
        {showConfetti && (
          <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-sm"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  opacity: p.life,
                  transform: `rotate(${p.x * 10}deg)`,
                }}
              />
            ))}
          </div>
        )}
        <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-500/90 backdrop-blur-sm py-2 px-4">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-white font-semibold text-sm">Season 2 is LIVE!</span>
          </div>
        </div>
      </>
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