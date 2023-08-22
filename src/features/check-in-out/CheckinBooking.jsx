import { useEffect, useState } from "react";

import Checkbox from "../../ui/checkbox/Checkbox";
import BookingDataBox from "../bookings/BookingDataBox";

import { Row } from "../../ui/row/Row.styles";
import { Box } from "./styles/CheckinBooking.styles";
import { Button } from "../../ui/button/Button.styles";
import { Heading } from "../../ui/header/Heading.styles";
import { Spinner } from "../../ui/spinner/Spinner.styles";
import { ButtonText } from "../../ui/button/ButtonText.styles";
import { ButtonGroup } from "../../ui/button/ButtonGroup.styles";

import { useCheckin } from "./hooks/useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking";
import { useSettings } from "../settings/hooks/useSettings";

import { formatCurrency } from "../../lib/utils/helpers";

const CheckinBooking = () => {
  const moveBack = useMoveBack();
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPayment(booking?.is_paid || false), [booking]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guest,
    total_price,
    number_guests,
    has_breakfast,
    number_nights,
  } = booking;

  // Calculate total price for breakfast
  const optionBreakfastPrice =
    settings.breakfast_price * number_nights * number_guests;

  const handleCheckin = () => {
    if (!confirmPayment) {
      return;
    }

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extra: optionBreakfastPrice,
          total_price: total_price + optionBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  };

  const handlePaymentConfirm = () => {
    setConfirmPayment((confirm) => !confirm);
  };

  const handleAddBreakfast = () => {
    setAddBreakfast((add) => !add);
    setConfirmPayment(false);
  };

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />

      {!has_breakfast ? (
        <Box>
          <Checkbox
            id='adding'
            checked={addBreakfast}
            onChange={handleAddBreakfast}
          >
            {" "}
            Add Breakfast for {formatCurrency(optionBreakfastPrice)}
          </Checkbox>
        </Box>
      ) : null}

      <Box>
        <Checkbox
          checked={confirmPayment}
          onChange={handlePaymentConfirm}
          id='confirm'
          disabled={confirmPayment || isCheckingIn}
        >
          I confirm that {guest.full_name} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>

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
