import PropTypes from "prop-types";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import {
  Footer,
  Guest,
  Header,
  Price,
  Section,
  StyledBookingDataBox,
} from "./styles/BookingDataBox.styles";
import { Flag } from "../../ui/flag/Flag.styles";
import DataItem from "../../ui/dataItem/DataItem";

import { formatDistanceFromNow, formatCurrency } from "../../lib/utils/helpers";

// A purely presentational component
const BookingDataBox = ({ booking }) => {
  const {
    created_at,
    start_date,
    end_date,
    number_nights,
    number_guests,
    cabin_price,
    extra,
    total_price,
    has_breakfast,
    observations,
    is_paid,
    guest: { full_name, email, country, nationality, national_id },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {number_nights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {country && (
            <Flag
              src={country}
              alt={`Flag of ${nationality}`}
            />
          )}
          <p>
            {full_name}{" "}
            {number_guests > 1 ? `+ ${number_guests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {national_id}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observations'
          >
            {observations}
          </DataItem>
        )}

        <DataItem
          icon={<HiOutlineCheckCircle />}
          label='Breakfast included?'
        >
          {has_breakfast ? "Yes" : "No"}
        </DataItem>

        <Price is_paid={is_paid}>
          <DataItem
            icon={<HiOutlineCurrencyDollar />}
            label={`Total price`}
          >
            {formatCurrency(total_price)}

            {has_breakfast &&
              ` (${formatCurrency(cabin_price)} cabin + ${formatCurrency(
                extra
              )} breakfast)`}
          </DataItem>

          <p>{is_paid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
};

BookingDataBox.propTypes = {
  booking: PropTypes.shape({
    created_at: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    number_nights: PropTypes.number,
    number_guests: PropTypes.number,
    cabin_price: PropTypes.number,
    extra: PropTypes.number,
    total_price: PropTypes.number,
    has_breakfast: PropTypes.bool,
    observations: PropTypes.string,
    is_paid: PropTypes.bool,
    guest: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
      country: PropTypes.string,
      nationality: PropTypes.string,
      national_id: PropTypes.string,
    }),
    cabins: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default BookingDataBox;
