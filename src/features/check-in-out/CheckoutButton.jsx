import { Button } from "../../ui/button/Button.styles";

const CheckoutButton = ({ bookingId }) => {
  return (
    <Button
      variation='primary'
      size='small'
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
