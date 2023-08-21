/* eslint-disable no-unused-vars */
import { Spinner } from "../../ui/spinner/Spinner.styles";
import { useCabins } from "../cabins/hooks/useCabins";
import { StyledDashboardLayout } from "./DashboardLayout.styles";
import Stats from "./Stats";

import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";

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
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
