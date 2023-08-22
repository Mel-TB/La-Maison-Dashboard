import { useNavigate } from "react-router-dom";

import Modal from "../../ui/modal/Modal";
import BookingDataBox from "./BookingDataBox";
import ConfirmDelete from "../../ui/confirmDelete/ConfirmDelete";

import { Tag } from "../../ui/tag/Tag.styles";
import { Row } from "../../ui/row/Row.styles";
import { Button } from "../../ui/button/Button.styles";
import { Heading } from "../../ui/header/Heading.styles";
import { Spinner } from "../../ui/spinner/Spinner.styles";
import { HeadingGroup } from "./styles/BookingDetails.styles";
import { ButtonText } from "../../ui/button/ButtonText.styles";
import { ButtonGroup } from "../../ui/button/ButtonGroup.styles";

import { useBooking } from "./hooks/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import Empty from "../../ui/empty/Empty";

const BookingDetail = () => {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading || isCheckout || isDeleting) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resourceName='booking' />;
  }

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleCheckin = () => {
    navigate(`/checkin/${bookingId}`);
  };

  const handleCheckout = () => {
    checkout(bookingId);
  };

  const handleDeleteBooking = () => {
    deleteBooking(bookingId, {
      onSettled: () => navigate(-1),
    });
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>

        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={handleCheckin}>Check in</Button>
        )}

        {status === "checked-in" && (
          <Button onClick={handleCheckout}>Checkout</Button>
        )}

        <Modal>
          <Modal.Open open='delete'>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='bookings'
              disable={isDeleting}
              onConfirm={handleDeleteBooking}
            />
          </Modal.Window>
        </Modal>

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

export default BookingDetail;
