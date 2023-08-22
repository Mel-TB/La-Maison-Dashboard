import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

import { Spinner } from "../../ui/spinner/Spinner.styles";
import { StyledDashboardLayout } from "./styles/DashboardLayout.styles";

import { useCabins } from "../cabins/hooks/useCabins";
import { useRecentStays } from "./hooks/useRecentStays";
import { useRecentBookings } from "./hooks/useRecentBookings";

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  const { confirmStays, isLoading: isLoadingStays, numDays } = useRecentStays();
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
      <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart
        bookings={bookings}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
