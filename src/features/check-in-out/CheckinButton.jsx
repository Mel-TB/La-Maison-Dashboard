import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button } from "../../ui/button/Button.styles";

const CheckoutButton = ({ bookingId }) => {
  return (
    <Button
      variation='primary'
      size='small'
      as={Link}
      to={`/checkin/${bookingId}`}
    >
      Check in
    </Button>
  );
};

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};
export default CheckoutButton;
