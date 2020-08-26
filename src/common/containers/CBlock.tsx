import React from 'react';
import Block from '../components/Block';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  order: number;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  as?: any;
  inactive?: boolean;
  onClick?(order: number): void;
}

const CBlock: React.FC<Props> = ({ order, position, onClick, ...others }) => {
  return (
    <Block {...others} position={position} onClick={() => onClick?.(order)} />
  );
};

export default CBlock;
