import { useState, useEffect, useCallback, useRef } from 'react';

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
  maxLife: number;
  type: 'confetti' | 'spark' | 'firework' | 'trail';
  rotation: number;
  rotationSpeed: number;
  shape: 'square' | 'circle' | 'star' | 'ribbon';
}

// Target: January 23rd, 2026 at 6:00 PM IST (UTC+5:30)
const TARGET_DATE = new Date('2026-01-23T15:00:00+05:30').getTime();

const CONFETTI_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43', '#10AC84',
  '#EE5A24', '#0984E3', '#6C5CE7', '#FD79A8'
];

const FIREWORK_COLORS = [
  '#FFD700', '#FF6347', '#00FF7F', '#FF1493', '#00BFFF', '#FF4500',
  '#7FFF00', '#FF69B4', '#00CED1', '#FFFF00'
];

export const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);

  const createFireworkBurst = useCallback((centerX: number, centerY: number) => {
    const burstParticles: Particle[] = [];
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    const particleCount = 30 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.5;
      const velocity = 2 + Math.random() * 4;
      const life = 0.8 + Math.random() * 0.4;
      
      burstParticles.push({
        id: particleIdRef.current++,
        x: centerX,
        y: centerY,
        color,
        size: 3 + Math.random() * 3,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        gravity: 0.05,
        life,
        maxLife: life,
        type: 'firework',
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: 'circle'
      });
    }

    // Add sparkle trails
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i;
      const velocity = 5 + Math.random() * 2;
      
      burstParticles.push({
        id: particleIdRef.current++,
        x: centerX,
        y: centerY,
        color: '#FFFFFF',
        size: 2,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity,
        gravity: 0.02,
        life: 0.5,
        maxLife: 0.5,
        type: 'spark',
        rotation: 0,
        rotationSpeed: 0,
        shape: 'circle'
      });
    }

    return burstParticles;
  }, []);

  const createConfettiShower = useCallback(() => {
    const confetti: Particle[] = [];
    const shapes: Array<'square' | 'circle' | 'ribbon'> = ['square', 'circle', 'ribbon'];
    
    for (let i = 0; i < 100; i++) {
      confetti.push({
        id: particleIdRef.current++,
        x: Math.random() * 100,
        y: -5 - Math.random() * 15,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 8,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: 1 + Math.random() * 2,
        gravity: 0.03,
        life: 1,
        maxLife: 1,
        type: 'confetti',
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    
    return confetti;
  }, []);

  const createRisingFirework = useCallback(() => {
    const x = 10 + Math.random() * 80;
    const particle: Particle = {
      id: particleIdRef.current++,
      x,
      y: 110,
      color: '#FFFFFF',
      size: 4,
      velocityX: (Math.random() - 0.5) * 0.5,
      velocityY: -3 - Math.random() * 2,
      gravity: 0.02,
      life: 1,
      maxLife: 1,
      type: 'trail',
      rotation: 0,
      rotationSpeed: 0,
      shape: 'circle'
    };
    return particle;
  }, []);

  const startCelebration = useCallback(() => {
    setShowCelebration(true);
    
    // Initial burst of confetti
    setParticles(createConfettiShower());
    
    // Schedule fireworks
    const fireworkIntervals: NodeJS.Timeout[] = [];
    
    // Launch multiple fireworks over time
    for (let i = 0; i < 15; i++) {
      const timeout = setTimeout(() => {
        setParticles(prev => [...prev, createRisingFirework()]);
      }, i * 300 + Math.random() * 200);
      fireworkIntervals.push(timeout);
    }

    // More confetti waves
    for (let i = 1; i <= 3; i++) {
      const timeout = setTimeout(() => {
        setParticles(prev => [...prev, ...createConfettiShower()]);
      }, i * 1500);
      fireworkIntervals.push(timeout);
    }

    // Stop celebration after 8 seconds
    const endTimeout = setTimeout(() => {
      setShowCelebration(false);
      setParticles([]);
    }, 8000);
    fireworkIntervals.push(endTimeout);

    return () => {
      fireworkIntervals.forEach(clearTimeout);
    };
  }, [createConfettiShower, createRisingFirework]);

  // Animation loop
  useEffect(() => {
    if (!showCelebration) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = currentTime;

      setParticles(prev => {
        let newParticles = prev
          .map(p => {
            const updatedParticle = {
              ...p,
              x: p.x + p.velocityX * deltaTime * 0.5,
              y: p.y + p.velocityY * deltaTime * 0.5,
              velocityY: p.velocityY + p.gravity * deltaTime,
              life: p.life - 0.008 * deltaTime,
              rotation: p.rotation + p.rotationSpeed * deltaTime
            };

            // Check if rising firework should explode
            if (p.type === 'trail' && p.velocityY > -1) {
              return null; // Will be filtered and trigger explosion
            }

            return updatedParticle;
          })
          .filter((p): p is Particle => p !== null && p.life > 0 && p.y < 120);

        // Check for fireworks that need to explode
        prev.forEach(p => {
          if (p.type === 'trail' && p.velocityY > -1 && p.life > 0) {
            newParticles = [...newParticles, ...createFireworkBurst(p.x, p.y)];
          }
        });

        return newParticles;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showCelebration, createFireworkBurst]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        if (!isLive) {
          setIsLive(true);
          startCelebration();
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

    const initial = calculateTimeLeft();
    setTimeLeft(initial);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isLive, startCelebration]);

  const renderParticle = (p: Particle) => {
    const opacity = p.life / p.maxLife;
    const glow = p.type === 'firework' || p.type === 'spark' ? `0 0 ${p.size * 2}px ${p.color}` : 'none';
    
    if (p.shape === 'ribbon') {
      return (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size * 0.3,
            height: p.size * 1.5,
            backgroundColor: p.color,
            opacity,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: '2px',
            boxShadow: glow,
          }}
        />
      );
    }

    if (p.shape === 'star' || p.type === 'spark') {
      return (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity,
            transform: `rotate(${p.rotation}deg)`,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}`,
          }}
        />
      );
    }

    if (p.type === 'trail') {
      return (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * 3,
            background: `linear-gradient(to bottom, ${p.color}, transparent)`,
            opacity,
            borderRadius: '50%',
            boxShadow: `0 0 10px #fff, 0 0 20px ${FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)]}`,
          }}
        />
      );
    }

    return (
      <div
        key={p.id}
        className="absolute"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          backgroundColor: p.color,
          opacity,
          transform: `rotate(${p.rotation}deg)`,
          borderRadius: p.shape === 'circle' ? '50%' : '2px',
          boxShadow: glow,
        }}
      />
    );
  };

  if (isLive) {
    return (
      <>
        {showCelebration && (
          <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
            {/* Background flash effect */}
            <div 
              className="absolute inset-0 animate-pulse"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.1) 0%, transparent 70%)',
              }}
            />
            {particles.map(renderParticle)}
          </div>
        )}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 py-2 px-4 shadow-lg shadow-emerald-500/30">
          <div className="flex items-center justify-center gap-2">
            <span className="text-white font-bold text-sm tracking-wide"> Season 2 is LIVE! </span>
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
