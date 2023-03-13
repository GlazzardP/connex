import React from "react";
import { PrometheusMetrics } from "../../components";
import TimeStats from "../../containers/TimeStats";
import { Column, StatsWrapper } from "./styles";

const Stats = () => {
  return (
    <StatsWrapper>
      <Column>
        <TimeStats />
        <PrometheusMetrics />
      </Column>
    </StatsWrapper>
  );
};

export default Stats;
