import { useEffect, useState } from "react";

const ClientTime = () => {
  const [time, setTime] = useState("");
  const getTime = () => {
    var d = new Date().toLocaleTimeString();
    setTime(d);
  };

  useEffect(() => {
    setInterval(getTime, 1000);
  }, []);

  return (
    <div>
      <label htmlFor="">Client Time:</label>
      <p>{time}</p>
    </div>
  );
};

export default ClientTime;
