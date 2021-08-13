import { ReactChild } from 'react';
import { Button } from './styles';

export interface Props {
  onClick: () => void;
  children: ReactChild;
}

const StartButton = ({onClick, children}: Props) => {
  return (<Button onClick={onClick}>{children}</Button>)
}

export default StartButton;
