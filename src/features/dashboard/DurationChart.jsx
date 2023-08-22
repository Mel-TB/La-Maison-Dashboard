import { PropTypes } from "prop-types";
import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

import { ChartBox } from "./styles/DurationChart.styles";
import { Heading } from "../../ui/header/Heading.styles";

import { useDarkMode } from "../../context/DarkModeContext";

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    colors: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    colors: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    colors: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    colors: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    colors: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    colors: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    colors: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    colors: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    colors: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    colors: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    colors: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    colors: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    colors: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    colors: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    colors: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    colors: "#7e22ce",
  },
];

const prepareData = (startData, stay) => {
  const incArrayValue = (arr, field) => {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  };

  const data = stay
    .reduce((arr, cur) => {
      const num = cur.number_nights;
      if (num === 1) {
        return incArrayValue(arr, "1 night");
      }
      if (num === 2) {
        return incArrayValue(arr, "2 nights");
      }
      if (num === 3) {
        return incArrayValue(arr, "3 nights");
      }
      if ([4, 5].includes(num)) {
        return incArrayValue(arr, "4-5 nights");
      }
      if ([6, 7].includes(num)) {
        return incArrayValue(arr, "6-7 nights");
      }
      if (num >= 8 && num <= 14) {
        return incArrayValue(arr, "8-14 nights");
      }
      if (num >= 15 && num <= 21) {
        return incArrayValue(arr, "15-21 nights");
      }
      if (num >= 21) {
        return incArrayValue(arr, "21+ nights");
      }
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
};

const DurationChart = ({ confirmStays }) => {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmStays);

  return (
    <ChartBox>
      <Heading as='h2'>Stay duration</Heading>

      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            nameKey='duration'
            cx='50%'
            cy='45%'
            innerRadius={85}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.value}
                fill={entry.colors}
                stroke={entry.colors}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign='middle'
            align='right'
            width={120}
            layout='vertical'
            iconType='circle'
            iconSize='12'
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

DurationChart.propTypes = {
  confirmStays: PropTypes.array,
};

export default DurationChart;
