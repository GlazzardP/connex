import { useState } from "react";
import { useGetApi } from "../../global/hooks/useGetApi";
import { iTimeDifference } from "../TimeDifference";

const EpochTime = ({ fetchedTime }: iTimeDifference) => {
  return (
    <div>
      <label htmlFor="">Fetched Time:</label>
      <p>{fetchedTime}</p>
    </div>
  );
};

export default EpochTime;
