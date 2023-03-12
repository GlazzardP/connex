import { iTimeDifference } from "../../TimeDifference";

const EpochTime = ({ fetchedTime }: iTimeDifference) => {
  return (
    <div>
      <label htmlFor="">Fetched Time:</label>
      <p>{fetchedTime}</p>
    </div>
  );
};

export default EpochTime;
