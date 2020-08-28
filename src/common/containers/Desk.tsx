import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPauseCircle,
  faPlayCircle,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import CBlock from './CBlock';
import { useTimer, Time } from '../hooks/useTimer';
import IconButton from '../components/IconButton';

interface Props {}

const Desk: React.FC<Props> = () => {
  const [initialTime, setInitial] = useState<Time>({
    overtime: 20,
    maintime: 8,
  });
  const [showConfig, setShowConfig] = useState(false);
  const [overtime, setOvertime] = useState(initialTime.overtime);
  const [maintime, setMaintime] = useState(initialTime.maintime);

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
      timer.next();
      timer.start();
      return;
    }

    const next = (order + 1) % 4;
    setActive(next);
    t[next].next();
    t[next].start();
  }

  const remain = currentTimer && (
    <span className="font-led text-6xl">
      {currentTimer?.time.overtime} + {currentTimer?.time.maintime}
    </span>
  );

  return (
    <div className="w-full h-full overflow-hidden">
      <CBlock
        order={0}
        position="bottom"
        className="bg-blue-400 flex justify-center items-center"
        inactive={active !== 0}
        onClick={handleClickBlock}
      >
        {remain}
      </CBlock>
      <CBlock
        order={1}
        position="right"
        className="bg-blue-400 flex justify-center items-center"
        inactive={active !== 1}
        onClick={handleClickBlock}
      >
        {remain}
      </CBlock>
      <CBlock
        order={2}
        position="top"
        className="bg-blue-400 flex justify-center items-center"
        inactive={active !== 2}
        onClick={handleClickBlock}
      >
        {remain}
      </CBlock>
      <CBlock
        order={3}
        position="left"
        className="bg-blue-400 flex justify-center items-center"
        inactive={active !== 3}
        onClick={handleClickBlock}
      >
        {remain}
      </CBlock>
      <div
        className="absolute font-led text-6xl"
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${-90 * (active || 0)}deg)`,
        }}
      ></div>
      <CBlock as="div" order={-1} position="center">
        <IconButton
          className="text-4xl text-blue-600"
          disabled={active === null}
          onClick={() => {
            if (!currentTimer) {
              return;
            }

            if (currentTimer.isPaused) {
              currentTimer.start();
            } else {
              currentTimer.pause();
            }
          }}
        >
          {!currentTimer || currentTimer.isPaused ? (
            <FontAwesomeIcon icon={faPlayCircle} />
          ) : (
            <FontAwesomeIcon icon={faPauseCircle} />
          )}
        </IconButton>
        <IconButton
          className="ml-3"
          onClick={() => {
            setOvertime(initialTime.overtime);
            setMaintime(initialTime.maintime);
            setShowConfig(true);
          }}
        >
          <FontAwesomeIcon icon={faCog} />
        </IconButton>
      </CBlock>
      {showConfig && (
        <CBlock as="div" order={-1} className="bg-white" position="center">
          <div>
            超时读秒：
            <input
              type="number"
              value={overtime}
              onChange={e => setOvertime(parseInt(e.target.value))}
            />
          </div>
          <div className="mt-3">
            每轮读秒：
            <input
              type="number"
              value={maintime}
              onChange={e => setMaintime(parseInt(e.target.value))}
            />
          </div>
          <button
            className="bg-blue-400 absolute w-full left-0 bottom-0 p-3 text-white rounded"
            onClick={() => {
              setInitial({ overtime, maintime });
              setShowConfig(false);
            }}
          >
            确定
          </button>
        </CBlock>
      )}
    </div>
  );
};

export default Desk;
