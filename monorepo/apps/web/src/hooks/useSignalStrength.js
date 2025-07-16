import { useEffect, useState } from "react";

export function useSignalStrength() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const update = () => {
      const random = Math.floor(Math.random() * 4); // 0 - 3
      setValue(random);
    };
    update();

    const interval = setInterval(update, 3000);

    return () => clearInterval(interval);
  }, []);

  return value;
}
