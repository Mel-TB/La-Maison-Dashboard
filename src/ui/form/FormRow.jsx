/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Error, Label, StyledFormRow } from "./FormRow.styles";

const FormRow = ({ label, error, children, orientation }) => {
  return (
    <StyledFormRow orientation={orientation}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

FormRow.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
  orientation: PropTypes.string,
};

export default FormRow;
