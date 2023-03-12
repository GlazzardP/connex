import { useEffect, useState } from "react";
import { useGetApi } from "../../global/hooks/useGetApi";

const PrometheusMetrics = () => {
  // const { data, error, isLoading } = useGetApi("http://localhost:3001/metrics");

  return (
    <div>
      {/* {data ? (
        <pre>{(data as any)?.metrics}</pre>
      ) : error ? (
        <p>Error</p>
      ) : (
        <p>Loading</p>
      )} */}
    </div>
  );
};

export default PrometheusMetrics;
