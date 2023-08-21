/* eslint-disable no-unused-vars */
import { PropTypes } from "prop-types";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmStays, numDays, cabinCount }) => {
  //* A) Calculate total bookings
  const numBookings = bookings.length;

  //* B) Calculate total Sale
  const sales = bookings.reduce((acc, curr) => acc + curr.total_price, 0);

  //* Calculate total checkin
  const checkin = confirmStays.length;

  //* Calculate Rate of occupancy
  //* num checked-in nights / all available nights(numDays * num cabins)

  const occupancy =
    confirmStays.reduce((acc, curr) => acc + curr.number_nights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />

      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkin}
      />

      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBarSquare />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
};

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmStays: PropTypes.array,
  numDays: PropTypes.number,
  cabinCount: PropTypes.number,
};

export default Stats;
