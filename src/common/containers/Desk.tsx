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

  function handleClickBlock(order: number) {
    for (let i = 0; i < t.length; i++) {
      if (i === order) {
        t[i].commit();
      } else {
        t[i].abort();
      }
      t[i].next();
    }
  }

  function getRemainTime(order: number) {
    const {
      temp: { overtime, maintime },
    } = t[order];
    return `${overtime} + ${maintime}`;
  }

  const positions = ['bottom', 'right', 'top', 'left'] as const;

  return (
    <div className="w-full h-full overflow-hidden">
      {positions.map((p, index) => (
        <CBlock
          key={p}
          order={index}
          position={p}
          className="bg-blue-400 flex justify-center items-center font-led text-6xl"
          onClick={handleClickBlock}
        >
          {getRemainTime(index)}
        </CBlock>
      ))}
      <CBlock as="div" order={-1} position="center">
        <IconButton
          className="text-4xl text-blue-600"
          onClick={() => {
            if (t.every(x => x.isPaused)) {
              t.forEach(x => x.start());
            } else {
              t.forEach(x => x.pause());
            }
          }}
        >
          <FontAwesomeIcon
            icon={t.every(x => x.isPaused) ? faPlayCircle : faPauseCircle}
          />
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
