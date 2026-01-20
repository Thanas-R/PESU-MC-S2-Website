import { useState, useEffect } from 'react';

interface ServerStatus {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  isLoading: boolean;
}

const SERVER_ADDRESS = 'pesu-mc.ddns.net';
const API_URL = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;

export const useServerStatus = (): ServerStatus => {
  const [status, setStatus] = useState<ServerStatus>({
    isOnline: false,
    playerCount: 0,
    maxPlayers: 100,
    isLoading: true,
  });

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
        
        setStatus({
          isOnline: data.online ?? false,
          playerCount: data.players?.online ?? 0,
          maxPlayers: data.players?.max ?? 100,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching server status:', error);
        setStatus({
          isOnline: false,
          playerCount: 0,
          maxPlayers: 100,
          isLoading: false,
        });
      }
    };

    fetchStatus();
    
    // Refresh every 2 minutes (API cache time)
    const interval = setInterval(fetchStatus, 120000);
    
    return () => clearInterval(interval);
  }, []);

  return status;
};
