import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/dataItem/DataItem";
import { Flag } from "../../ui/flag/Flag.styles";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

import {
  Footer,
  Guest,
  Header,
  Price,
  Section,
  StyledBookingDataBox,
} from "./BookingDataBox.styles";

// A purely presentational component
const BookingDataBox = ({ booking }) => {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && (
            <Flag
              src={countryFlag}
              alt={`Flag of ${country}`}
            />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
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
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem
            icon={<HiOutlineCurrencyDollar />}
            label={`Total price`}
          >
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
};

export default BookingDataBox;
