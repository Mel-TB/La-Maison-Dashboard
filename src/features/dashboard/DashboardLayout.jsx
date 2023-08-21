import { Spinner } from "../../ui/spinner/Spinner.styles";
import { StyledDashboardLayout } from "./DashboardLayout.styles";

import { useRecentBookings } from "./hooks/useRecentBookings";
import { useRecentStays } from "./hooks/useRecentStays";

const DashboardLayout = () => {
  const { bookings, isLoading } = useRecentBookings();
  // eslint-disable-next-line no-unused-vars
  const { stays, confirmStays, isLoading: isLoadingStays } = useRecentStays();

  if (isLoading || isLoadingStays) {
    return <Spinner />;
  }

  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <div>Statistic</div>
      <div>Today activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
