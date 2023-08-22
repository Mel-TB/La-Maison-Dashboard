import PropTypes from "prop-types";

import { Tag } from "../../ui/tag/Tag.styles";
import { Flag } from "../../ui/flag/Flag.styles";
import { Guest, StyledTodayItem } from "./styles/TodayItem.styles";
import CheckoutButton from "./CheckoutButton";
import CheckinButton from "./CheckinButton";

const TodayItem = ({ activity }) => {
  const { id, status, guest, number_nights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type='green'>Arriving</Tag>}
      {status === "checked-in" && <Tag type='blue'>Departing</Tag>}
      <Flag
        src={guest.country}
        alt={`Flag of ${guest.country}`}
      />
      <Guest>{guest.full_name}</Guest>
      <div>{number_nights} nights</div>

      {status === "unconfirmed" && <CheckinButton bookingId={id} />}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

TodayItem.propTypes = {
  activity: PropTypes.object,
};
export default TodayItem;
