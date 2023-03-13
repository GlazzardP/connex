export interface iTimeDifference {
  timeDifference: number;
}

const TimeDifference = ({ timeDifference }: iTimeDifference) => {
  function numToTime(num: any) {
    var hours = Math.floor(num / 60);
    var minutes: any = num % 60;
    if (minutes + "".length < 2) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
  }

  const formattedTime = numToTime(timeDifference);

  return (
    <>
      <label>Difference:</label>
      <p>00:0{formattedTime}</p>
    </>
  );
};
export default TimeDifference;
