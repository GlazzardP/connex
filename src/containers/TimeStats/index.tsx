import { useEffect, useState } from "react";
import ClientTime from "../../components/ClientTime";
import RequestEpochTime from "../../components/RequestEpochTime";
import TimeDifference from "../../components/TimeDifference";
import { useGetApi } from "../../global/hooks/useGetApi";
import axios from "axios";

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
  const [data, setData] = useState<any>();
  // const { data, error, isLoading } = useGetApi("time", timePayload);

  useEffect(() => {
    const func = async () => {
      var data = JSON.stringify({
        properties: {
          epoch: {
            description:
              "The current server time, in epoch seconds, at time of processing the request.",
            type: "number",
          },
        },
        required: ["epoch"],
        type: "object",
      });

      var config = {
        method: "get",
        url: "http://localhost:3001/time",
        headers: {
          Authorization: "mysecrettoken",
          abc: "def",
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios(config)
        .then((response: any) => {
          console.log(JSON.stringify(response.data));
          setData(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        })
        .finally(() => console.log("D"));
    };
    func();
  }, []);
  return (
    <aside>
      <ClientTime />
      <RequestEpochTime fetchedTime={(data as any)?.time} />
      <TimeDifference fetchedTime={(data as any)?.time} />
    </aside>
  );
};

export default TimeStats;
