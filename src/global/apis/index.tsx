import axios from "axios";
import { useEffect, useState } from "react";

const baseApiPath = process.env.REACT_APP_SERVER_API;

const authToken = process.env.REACT_APP_AUTHORISATION_TOKEN;

export const getServerTime = async () => {
  return await axios.get(`${baseApiPath}/time`, {
    headers: {
      Authorization: authToken,
    },
  });
};
export const getPrometheusMetrics = async () => {
  return await axios.get(`${baseApiPath}/metrics`, {
    headers: {
      Authorization: authToken,
    },
  });
};
