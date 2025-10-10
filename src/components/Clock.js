'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns-tz';

const timeZones = [
    { label: 'Buenos Aires', zone: 'America/Argentina/Buenos_Aires' },
  { label: 'Berlin', zone: 'Europe/Berlin' },
  { label: 'London', zone: 'Europe/London' },
  { label: 'Madrid', zone: 'Europe/Madrid' },
  { label: 'Paris', zone: 'Europe/Paris' },
  { label: 'Tokyo', zone: 'Asia/Tokyo' },
  { label: 'Ukraine', zone: 'Europe/Kiev' },
  { label: 'Ukraine', zone: 'Europe/Kiev' },
];

export default function WorldClock() {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timeZones.forEach(({ label, zone }) => {
        const now = new Date();
        newTimes[label] = format(now, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: zone });
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
    style={{
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 1000,
      mixBlendMode: 'difference',
      fontSize: '0.75rem',
      opacity: 0.75,
    }}
    >
      <h2>World Clock</h2>
      <ul>
        {Object.entries(times).map(([label, time]) => (
          <li key={label}>
            <strong>{label}:</strong> {time}
          </li>
        ))}
      </ul>
    </div>
  );
}
