import axios from "axios";
import { useEffect, useState } from "react";

export const useGetApi = (url: string, dataObj?: object) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseApiPath = process.env.REACT_APP_SERVER_API;

  const authToken = process.env.REACT_APP_AUTHORISATION_TOKEN;

  useEffect(() => {
    const config = dataObj
      ? {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          dataObj,
        }
      : {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        };

    console.log("Run Get Api", config);

    const fetchData = () => {
      axios
        .get(`${baseApiPath}/${url}`, config)
        .then((response: any) => {
          console.log(response.data);

          setIsLoading(true);
          setData(response.data);
        })
        .catch((error: any) => {
          setError(error);
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoading, data };
};
