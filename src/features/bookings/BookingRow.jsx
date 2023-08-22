import PropTypes from "prop-types";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiEye, HiCheck, HiTrash } from "react-icons/hi2";

import Modal from "../../ui/modal/Modal";
import Menus from "../../ui/menu/Menus";
import Table from "../../ui/table/Tables";
import ConfirmDelete from "../../ui/confirmDelete/ConfirmDelete";

import { Tag } from "../../ui/tag/Tag.styles";
import { Amount, Cabin, Stacked } from "./styles/BookingRow.styles";

import { useDeleteBooking } from "./hooks/useDeleteBooking";
import { useCheckout } from "../check-in-out/hooks/useCheckout";

import { formatCurrency, formatDistanceFromNow } from "../../lib/utils/helpers";

const BookingRow = ({
  booking: {
    id: bookingId,
    start_date,
    end_date,
    number_nights,
    total_price,
    status,
    guest: { full_name, email },
    cabins: { name: cabinName },
  },
}) => {
  const navigate = useNavigate();
  const { checkout, isCheckout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleSeeDetails = () => {
    navigate(`/bookings/${bookingId}`);
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
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{full_name}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {number_nights} night stay
        </span>
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(total_price)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={handleSeeDetails}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={handleCheckin}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiCheck />}
                onClick={handleCheckout}
                disabled={isCheckout}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open open='delete'>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='bookings'
              disabled={isDeleting}
              onConfirm={handleDeleteBooking}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
    start_date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    end_date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number_nights: PropTypes.number,
    total_price: PropTypes.number,
    status: PropTypes.string,
    guest: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
    }),
    cabins: PropTypes.shape({ name: PropTypes.string }),
  }),
};
export default BookingRow;
