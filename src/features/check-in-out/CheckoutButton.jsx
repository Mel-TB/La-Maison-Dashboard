import PropTypes from "prop-types";
import { Button } from "../../ui/button/Button.styles";
import { useCheckout } from "./hooks/useCheckout";

const CheckoutButton = ({ bookingId }) => {
  const { checkout, isCheckout } = useCheckout();

  const handleCheckout = () => {
    checkout(bookingId);
  };
  return (
    <Button
      variation='primary'
      size='small'
      onClick={handleCheckout}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
};

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};
export default CheckoutButton;
