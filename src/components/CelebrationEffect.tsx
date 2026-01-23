import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  spin: number;
  type: 'confetti' | 'star' | 'circle';
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: FireworkParticle[];
}

interface FireworkParticle {
  angle: number;
  distance: number;
  color: string;
}

const COLORS = [
  '#FF6B9D', '#C44569', '#F8B500', '#FF6F61', 
  '#88D8B0', '#5DADE2', '#AF7AC5', '#F39C12',
  '#E74C3C', '#2ECC71', '#3498DB', '#9B59B6'
];

// Trigger celebration from anywhere
let triggerCelebration: (() => void) | null = null;

export const useCelebration = () => {
  const trigger = useCallback(() => {
    if (triggerCelebration) {
      triggerCelebration();
    }
  }, []);
  return { trigger };
};

export const CelebrationEffect = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [isActive, setIsActive] = useState(false);

  const createSideBurst = useCallback(() => {
    const newParticles: Particle[] = [];
    
    // Left side burst
    for (let i = 0; i < 60; i++) {
      const angle = -45 + Math.random() * 90; // Spread from -45 to 45 degrees (rightward)
      newParticles.push({
        id: i,
        x: 0,
        y: 30 + Math.random() * 40,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        angle: angle * (Math.PI / 180),
        speed: 8 + Math.random() * 12,
        spin: Math.random() * 360,
        type: ['confetti', 'star', 'circle'][Math.floor(Math.random() * 3)] as 'confetti' | 'star' | 'circle'
      });
    }
    
    // Right side burst
    for (let i = 60; i < 120; i++) {
      const angle = 135 + Math.random() * 90; // Spread from 135 to 225 degrees (leftward)
      newParticles.push({
        id: i,
        x: 100,
        y: 30 + Math.random() * 40,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        angle: angle * (Math.PI / 180),
        speed: 8 + Math.random() * 12,
        spin: Math.random() * 360,
        type: ['confetti', 'star', 'circle'][Math.floor(Math.random() * 3)] as 'confetti' | 'star' | 'circle'
      });
    }
    
    setParticles(newParticles);
  }, []);

  const createFireworks = useCallback(() => {
    const positions = [
      { x: 20, y: 30 },
      { x: 50, y: 20 },
      { x: 80, y: 35 },
      { x: 35, y: 45 },
      { x: 65, y: 40 }
    ];

    positions.forEach((pos, index) => {
      setTimeout(() => {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const fireworkParticles: FireworkParticle[] = [];
        
        for (let i = 0; i < 24; i++) {
          fireworkParticles.push({
            angle: (i / 24) * Math.PI * 2,
            distance: 0,
            color: Math.random() > 0.5 ? color : COLORS[Math.floor(Math.random() * COLORS.length)]
          });
        }
        
        setFireworks(prev => [...prev, {
          id: Date.now() + index,
          x: pos.x,
          y: pos.y,
          color,
          particles: fireworkParticles
        }]);
      }, index * 300);
    });
  }, []);

  const startCelebration = useCallback(() => {
    setIsActive(true);
    setParticles([]);
    setFireworks([]);
    
    // Initial side bursts
    createSideBurst();
    
    // Second wave of side bursts
    setTimeout(createSideBurst, 400);
    
    // Start fireworks after confetti
    setTimeout(createFireworks, 800);
    
    // End celebration
    setTimeout(() => {
      setIsActive(false);
      setParticles([]);
      setFireworks([]);
    }, 4500);
  }, [createSideBurst, createFireworks]);

  useEffect(() => {
    triggerCelebration = startCelebration;
    return () => {
      triggerCelebration = null;
    };
  }, [startCelebration]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + Math.cos(p.angle) * p.speed * 0.15,
          y: p.y + Math.sin(p.angle) * p.speed * 0.15 + 0.3, // Add gravity
          speed: p.speed * 0.97,
          spin: p.spin + 5
        })).filter(p => p.x > -10 && p.x < 110 && p.y < 110 && p.speed > 0.5)
      );
    }, 30);
    
    return () => clearInterval(interval);
  }, [particles.length]);

  // Animate fireworks
  useEffect(() => {
    if (fireworks.length === 0) return;
    
    const interval = setInterval(() => {
      setFireworks(prev => 
        prev.map(f => ({
          ...f,
          particles: f.particles.map(p => ({
            ...p,
            distance: Math.min(p.distance + 2, 15)
          }))
        })).filter(f => f.particles[0].distance < 15)
      );
    }, 30);
    
    return () => clearInterval(interval);
  }, [fireworks.length]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* Confetti particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.type === 'confetti' ? p.size * 0.6 : p.size,
              backgroundColor: p.color,
              borderRadius: p.type === 'circle' ? '50%' : p.type === 'star' ? '2px' : '2px',
              transform: `rotate(${p.spin}deg)`,
              boxShadow: `0 0 ${p.size}px ${p.color}40`
            }}
          />
        ))}
      </AnimatePresence>

      {/* Fireworks */}
      {fireworks.map(f => (
        <div
          key={f.id}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`
          }}
        >
          {/* Center glow */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${f.color} 0%, transparent 70%)`
            }}
          />
          
          {/* Particles */}
          {f.particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: [1, 1, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: p.color,
                left: `${Math.cos(p.angle) * p.distance * 6}px`,
                top: `${Math.sin(p.angle) * p.distance * 6}px`,
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}50`
              }}
            />
          ))}
        </div>
      ))}

      {/* Sparkle overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 1.5, times: [0, 0.3, 1] }}
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
        }}
      />
    </div>
  );
};
