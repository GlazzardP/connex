import { useState } from "react";

import { iTimeDifference } from "../TimeDifference";

export interface iEpochTime {
  serverTime: any;
}

const EpochTime = ({ serverTime }: iEpochTime) => {
  return (
    <>
      <label>Fetched Time (Epoch Seconds):</label>
      <p>{serverTime}</p>
    </>
  );
};

export default EpochTime;
