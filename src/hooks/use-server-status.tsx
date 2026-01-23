import { useState, useEffect, useRef } from 'react';

interface ServerStatus {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  isLoading: boolean;
}

const SERVER_ADDRESS = 'pesu-mc.ddns.net';
const API_URL = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;

// Persist last known maxPlayers across offline / API errors
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
          cache: 'no-store', // avoid stale cache when possible
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // IMPORTANT: trust ONLY data.online
        const isOnline = data?.online === true;
        const playerCount = isOnline ? data.players?.online ?? 0 : 0;

        // Update maxPlayers only when server is confirmed online
        if (isOnline && typeof data.players?.max === 'number') {
          lastKnownMaxPlayers = data.players.max;
        }

        setStatus({
          isOnline,
          playerCount,
          maxPlayers: lastKnownMaxPlayers,
          isLoading: false,
        });

        previousOnline.current = isOnline;
      } catch (error) {
        console.error('Server status fetch failed:', error);

        // DO NOT force offline on API failure
        setStatus(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    fetchStatus();

    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
};