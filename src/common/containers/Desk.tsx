import React, { useState } from 'react';
import CBlock from './CBlock';
import { useTimer, Time } from '../hooks/useTimer';

interface Props {
  initialTime: Time;
}

const Desk: React.FC<Props> = ({ initialTime }) => {
  const t = [
    useTimer(initialTime),
    useTimer(initialTime),
    useTimer(initialTime),
    useTimer(initialTime),
  ];
  const [active, setActive] = useState<number | null>(null);
  const currentTimer = active === null ? null : t[active];

  function handleClickBlock(order: number) {
    const timer = t[order];

    currentTimer?.pause();

    if (timer.isPaused) {
      setActive(order);
      timer.start();
      return;
    }

    const next = (order + 1) % 4;
    setActive(next);
    t[next].start();
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <CBlock
        order={0}
        position="bottom"
        className="bg-blue-400"
        inactive={active !== 0}
        onClick={handleClickBlock}
      />
      <CBlock
        order={1}
        position="right"
        className="bg-blue-400"
        inactive={active !== 1}
        onClick={handleClickBlock}
      />
      <CBlock
        order={2}
        position="top"
        className="bg-blue-400"
        inactive={active !== 2}
        onClick={handleClickBlock}
      />
      <CBlock
        order={3}
        position="left"
        className="bg-blue-400"
        inactive={active !== 3}
        onClick={handleClickBlock}
      />
      <div
        className="absolute font-led text-6xl"
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${-90 * (active || 0)}deg)`,
        }}
      >
        {currentTimer?.time.overtime} + {currentTimer?.time.maintime}
      </div>
    </div>
  );
};

export default Desk;
