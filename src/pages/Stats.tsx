import React from "react";
import {
  ClientTime,
  PrometheusMetrics,
  RequestEpochTime,
  TimeDifference,
} from "../components";

const Stats = () => {
  return (
    <main>
      <section>
        <ClientTime />
        <PrometheusMetrics />
        <RequestEpochTime />
        <TimeDifference />
      </section>
    </main>
  );
};

export default Stats;
