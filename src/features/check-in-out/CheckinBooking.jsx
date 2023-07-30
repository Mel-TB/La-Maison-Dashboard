import BookingDataBox from "../../features/bookings/BookingDataBox";

import { Row } from "../../ui/row/Row.styles";
import { Heading } from "../../ui/header/Heading.styles";
import { ButtonGroup } from "../../ui/button/ButtonGroup.styles";
import { Button } from "../../ui/button/Button.styles";
import { ButtonText } from "../../ui/button/ButtonText.styles";

import { useMoveBack } from "../../hooks/useMoveBack";

import { Box } from "./CheckinBooking.styles";

const CheckinBooking = () => {
  const moveBack = useMoveBack();

  const booking = {};

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const handleCheckin = () => {};

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button
          variation='secondary'
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
