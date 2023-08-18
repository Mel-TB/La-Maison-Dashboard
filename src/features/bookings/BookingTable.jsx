import BookingRow from "./BookingRow";
import Table from "../../ui/table/Tables";
import Menus from "../../ui/menu/Menus";
import Empty from "../../ui/empty/Empty";
import Pagination from "../../ui/pagination/Pagination";
import { Spinner } from "../../ui/spinner/Spinner.styles";

import { useBookings } from "./hooks/useBookings";

const BookingTable = () => {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resourceName='bookings' />;
  }

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
