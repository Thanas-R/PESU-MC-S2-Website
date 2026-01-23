import { useState, useEffect, useRef } from 'react';

interface ServerStatus {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  isLoading: boolean;
}

const SERVER_ADDRESS = 'pesu-mc.ddns.net';
const API_URL = `https://api.mcstatus.io/v2/status/java/pesu-mc.ddns.net`;

// Store the last known maxPlayers globally to persist between offline states
let lastKnownMaxPlayers = 20;

export const useServerStatus = (): ServerStatus => {
  const [status, setStatus] = useState<ServerStatus>({
    isOnline: false,
    playerCount: 0,
    maxPlayers: lastKnownMaxPlayers,
    isLoading: true,
  });
  
  const previousOnline = useRef<boolean | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'User-Agent': 'PESU-Minecraft-Website/1.0',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch server status');
        }
        
        const data = await response.json();
        
        const isOnline = data.online ?? false;
        const playerCount = data.players?.online ?? 0;
        
        // Update lastKnownMaxPlayers only when server is online
        if (isOnline && data.players?.max) {
          lastKnownMaxPlayers = data.players.max;
        }
        
        const newStatus = {
          isOnline,
          playerCount: isOnline ? playerCount : 0,
          maxPlayers: lastKnownMaxPlayers,
          isLoading: false,
        };
        
        // Check if status changed for animation trigger
        if (previousOnline.current !== null && previousOnline.current !== isOnline) {
          // Status changed - this will trigger re-render with new values
        }
        previousOnline.current = isOnline;
        
        setStatus(newStatus);
      } catch (error) {
        console.error('Error fetching server status:', error);
        setStatus({
          isOnline: false,
          playerCount: 0,
          maxPlayers: lastKnownMaxPlayers,
          isLoading: false,
        });
      }
    };

    fetchStatus();
    
    // Refresh every 30 seconds for more responsive updates
    const interval = setInterval(fetchStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return status;
};
