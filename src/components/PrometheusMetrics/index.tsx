import { useEffect, useState } from "react";
import { getPrometheusMetrics } from "../../global/apis";
import { PrometheusWrapper } from "./styles";

const PrometheusMetrics = () => {
  const [metrics, setMetrics] = useState();
  useEffect(() => {
    getPrometheusMetrics().then((res) => {
      setMetrics(res?.data?.metrics);
    });
  });

  return (
    <PrometheusWrapper>
      <pre>{metrics}</pre>
    </PrometheusWrapper>
  );
};

export default PrometheusMetrics;
