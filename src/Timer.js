import React, { useEffect, useRef, useState, useMemo } from "react";


const Timer = ({ className, value  }) => {
  const startTime = useRef(Date.now() + value * 1000);
  const [time, setTime] = useState(new Date());
  const buffer = useMemo(() => new Date(), []);

  const animate = () => {
    const dt = startTime.current - Date.now();

    if (dt > 0) {
      setTime(dt);
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  buffer.setTime(time);

  const minutes = buffer.getMinutes();
  const seconds =  buffer.getSeconds();
  let mPrefix = buffer.getMinutes() > 9 ? "" : "0" 
  let sPrefix = buffer.getSeconds() > 9 ? "" : "0" 
  return (
    <div
      className={className}
    >{`${mPrefix}${minutes}:${sPrefix}${seconds}`}</div>
  );
};

export default Timer;
