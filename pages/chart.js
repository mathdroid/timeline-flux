import { useMemo } from "react";
import { Chart } from "react-charts";

const data = [
  {
    label: "Series 1",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 2,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 63,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 16,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 94,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 35,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 95,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 25,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 64,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 21,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 69,
      },
    ],
  },
  {
    label: "Series 2",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 22,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 64,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 76,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 37,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 77,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 90,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 84,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 89,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 5,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 30,
      },
    ],
  },
  {
    label: "Series 3",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 98,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 39,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 19,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 82,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 27,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 35,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 62,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 84,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 89,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 7,
      },
    ],
  },
  {
    label: "Series 4",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 30,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 67,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 7,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 68,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 46,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 38,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 5,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 19,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 21,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 7,
      },
    ],
  },
  {
    label: "Series 5",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 3,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 60,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 89,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 75,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 21,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 73,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 17,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 12,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 24,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 25,
      },
    ],
  },
  {
    label: "Series 6",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 99,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 48,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 15,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 20,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 77,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 76,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 30,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 57,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 13,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 97,
      },
    ],
  },
  {
    label: "Series 7",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 57,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 27,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 62,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 90,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 98,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 38,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 28,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 75,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 62,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 47,
      },
    ],
  },
  {
    label: "Series 8",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 100,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 7,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 72,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 62,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 44,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 54,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 24,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 16,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 83,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 98,
      },
    ],
  },
  {
    label: "Series 9",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 52,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 17,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 92,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 44,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 55,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 5,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 87,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 56,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 91,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 13,
      },
    ],
  },
  {
    label: "Series 10",
    data: [
      {
        primary: "Ordinal Group 0",
        secondary: 36,
      },
      {
        primary: "Ordinal Group 1",
        secondary: 52,
      },
      {
        primary: "Ordinal Group 2",
        secondary: 72,
      },
      {
        primary: "Ordinal Group 3",
        secondary: 95,
      },
      {
        primary: "Ordinal Group 4",
        secondary: 38,
      },
      {
        primary: "Ordinal Group 5",
        secondary: 91,
      },
      {
        primary: "Ordinal Group 6",
        secondary: 62,
      },
      {
        primary: "Ordinal Group 7",
        secondary: 51,
      },
      {
        primary: "Ordinal Group 8",
        secondary: 83,
      },
      {
        primary: "Ordinal Group 9",
        secondary: 68,
      },
    ],
  },
];

const Page = () => {
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );
  const secondaryAxis = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return <Chart options={{ data, primaryAxis, secondaryAxis }} />;
};

export default Page;
