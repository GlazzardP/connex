import React from "react";
import { PrometheusMetrics } from "../components";
import TimeStats from "../containers/TimeStats";

const Stats = () => {
  return (
    <main>
      <TimeStats />
      <PrometheusMetrics />
    </main>
  );
};

export default Stats;
