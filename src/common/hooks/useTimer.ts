import { useState } from 'react';
import { useInterval } from 'react-use';
import overAudio from '../../assets/over.mp3';

const audio = new Audio(overAudio);

export interface Time {
  maintime: number;
  overtime: number;
}

export function useTimer(initial: Time) {
  const [time, setTime] = useState(initial);
  const [delay, setDelay] = useState<number | null>(null);

  useInterval(() => {
    setTime(dec);
  }, delay);

  return {
    time,
    isPaused: !Boolean(delay),
    start: () => {
      audio.play();
      audio.pause();
      setTime(({ overtime }) => ({
        overtime,
        maintime: initial.maintime,
      }));
      setDelay(1000);
    },
    pause: () => setDelay(null),
    reset: () => setTime(initial),
    next: () =>
      setTime(({ overtime }) => ({
        overtime,
        maintime: initial.maintime,
      })),
  };
}

function dec(time: Time): Time {
  let { maintime, overtime } = time;
  maintime = Math.ceil(maintime);
  overtime = Math.ceil(overtime);

  if (maintime > 0) {
    return {
      maintime: maintime - 1,
      overtime,
    };
  }

  if (overtime > 0) {
    if (overtime === 1) {
      audio.play();
    }
    return {
      maintime: 0,
      overtime: overtime - 1,
    };
  }

  return {
    maintime: 0,
    overtime: 0,
  };
}
