import { useState, useEffect, useRef } from 'react';

interface ServerStatus {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  isLoading: boolean;
}

const SERVER_ADDRESS = 'pesu-mc.ddns.net';
const API_URL = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;

// Persist last known values
let lastKnownMaxPlayers = 20;
let lastKnownOnline = false;

export const useServerStatus = (): ServerStatus => {
  const [status, setStatus] = useState<ServerStatus>({
    isOnline: lastKnownOnline,
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
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Trust ONLY this field
        const apiOnline = data?.online === true;

        // Update last known ONLINE state only when explicitly provided
        lastKnownOnline = apiOnline;

        const playerCount = apiOnline ? data.players?.online ?? 0 : 0;

        if (apiOnline && typeof data.players?.max === 'number') {
          lastKnownMaxPlayers = data.players.max;
        }

        setStatus({
          isOnline: lastKnownOnline,
          playerCount,
          maxPlayers: lastKnownMaxPlayers,
          isLoading: false,
        });

        previousOnline.current = apiOnline;
      } catch (error) {
        console.error('Server status fetch failed:', error);

        // DO NOT flip to offline on error
        setStatus(prev => ({
          ...prev,
          isOnline: lastKnownOnline,
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