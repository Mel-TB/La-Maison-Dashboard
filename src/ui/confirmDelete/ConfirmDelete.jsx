import PropTypes from "prop-types";

import { StyledConfirmDelete } from "./ConfirmDelete.styles";
import { Button } from "../button/Button.styles";
import { Heading } from "./Heading";

// eslint-disable-next-line no-unused-vars
const ConfirmDelete = ({ resourceName, onConfirm, disabled }) => {
  return (
    <StyledConfirmDelete>
      <Heading as='h3'>Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation='secondary'
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          $variation='danger'
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ConfirmDelete;
