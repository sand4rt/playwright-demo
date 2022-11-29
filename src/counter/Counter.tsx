import { useState } from 'react';
import { Popup } from '../Popup/Popup';

type CounterProps = {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)

  function onClick() {
    setCount((count) => count + 1);
  }

  return <div>
    {/* <Popup /> */}
    <button onClick={onClick}>{count}</button>
  </div>
}