import { useMemo } from "react";
import { Chart } from "react-charts";

const data = [
  {
    label: "React Charts",
    data: [
      {
        date: new Date(),
        stars: 202123,
      },
    ],
  },
  {
    label: "React Charts 2",
    data: [
      {
        date: new Date(),
        stars: 666,
      },
    ],
  },
];

export const MyChart = () => {
  const primaryAxis = useMemo(() => ({ getValue: (datum) => datum.date }), []);
  const secondaryAxis = useMemo(
    () => [{ getValue: (datum) => datum.stars }],
    []
  );

  return <Chart options={{ data, primaryAxis, secondaryAxis }} />;
};

export default MyChart;
