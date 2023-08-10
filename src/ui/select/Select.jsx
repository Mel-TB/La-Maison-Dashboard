import PropTypes from "prop-types";

import { StyledSelect } from "./Select.styles";

const Select = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

Select.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
