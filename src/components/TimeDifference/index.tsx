import { useEffect, useState } from "react";

export interface iTimeDifference {
  fetchedTime: number;
}

const TimeDifference = ({ fetchedTime }: iTimeDifference) => {
  const [difference, setDifference] = useState<any>();
  const [time, setTime] = useState("");
  const getTime = () => {
    var d = new Date().toLocaleTimeString();
    setTime(d);
  };

  useEffect(() => {
    setInterval(getTime, 1000);
  }, []);

  useEffect(() => {
    const now = Date.now(); // Unix timestamp in milliseconds

    var utcSeconds = 1234567890;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch

    const x = (fetchedTime - now) / 1000;

    var utcSeconds = 1234567890;
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    d.setUTCSeconds(x);

    setDifference(x);
  }, [fetchedTime]);

  return (
    <div>
      <label htmlFor="">Diference Time:</label>
      <label htmlFor="">{difference}</label>
    </div>
  );
};
export default TimeDifference;
