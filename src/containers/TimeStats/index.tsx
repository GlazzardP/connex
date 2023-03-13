import { useEffect, useState } from "react";
import RequestEpochTime from "../../components/RequestEpochTime";
import TimeDifference from "../../components/TimeDifference";
import { getServerTime } from "../../global/apis";
import { TimesWrapper } from "./styles";

const timePayload = {
  properties: {
    epoch: {
      description:
        "The current server time, in epoch seconds, at time of processing the request.",
      type: "number",
    },
  },
  required: ["epoch"],
  type: "object",
};

const TimeStats = () => {
  const [localTime, setLocalTime] = useState<number>(0);
  const [serverTime, setServerTime] = useState<number>(0);
  const [timeDifference, setTimeDifference] = useState<number>(0);

  const getLocalTime = () => {
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    console.log({ secondsSinceEpoch });

    setLocalTime(secondsSinceEpoch);
  };

  useEffect(() => {
    getLocalTime();
    setInterval(() => getLocalTime(), 1000);
  }, []);

  useEffect(() => {
    getServerTime().then((res: any) => setServerTime(res?.data?.time));
    setInterval(
      () => getServerTime().then((res: any) => setServerTime(res?.data?.time)),
      30000
    );
  }, []);

  const calculateTimeDifference = () => {
    let fetchedTime = new Date(serverTime);
    let machineTime = new Date(localTime);

    let seconds = Math.abs(fetchedTime.getTime() - machineTime.getTime());

    setTimeDifference(seconds);
  };

  useEffect(() => {
    calculateTimeDifference();
  }, [localTime]);
  return (
    <TimesWrapper>
      <RequestEpochTime serverTime={serverTime} />
      <TimeDifference timeDifference={timeDifference} />
    </TimesWrapper>
  );
};

export default TimeStats;
