import { PropTypes } from "prop-types";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Heading } from "../../ui/header/Heading.styles";
import { StyledSalesChart } from "./styles/SalesChart.styles";

import { useDarkMode } from "../../context/DarkModeContext";

const SalesChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.total_price, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extra, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer
        width={1000}
        height={400}
      >
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ fill: colors.text }}
          />
          <YAxis
            unit='$'
            tick={{ fill: colors.text }}
            tickLine={{ fill: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalSales'
            type='monotone'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name='Total sales'
            unit='$'
          />

          <Area
            dataKey='extrasSales'
            type='monotone'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name='Extra sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

SalesChart.propTypes = {
  bookings: PropTypes.array,
  numDays: PropTypes.number,
};
export default SalesChart;
