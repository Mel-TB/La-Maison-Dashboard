/* eslint-disable no-unused-vars */
import Stats from "./Stats";
import SalesChart from "./SalesChart";

import { Spinner } from "../../ui/spinner/Spinner.styles";
import { StyledDashboardLayout } from "./DashboardLayout.styles";

import { useCabins } from "../cabins/hooks/useCabins";
import { useRecentStays } from "./hooks/useRecentStays";
import { useRecentBookings } from "./hooks/useRecentBookings";

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const {
    stays,
    confirmStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today activity</div>
      <div>Chart stay duration</div>
      <SalesChart
        bookings={bookings}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
