import { useState } from "react"

type CounterProps = {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount)

  function onClick() {
    setCount((count) => count + 1);
  }

  return <button onClick={onClick}>{count}</button>
}