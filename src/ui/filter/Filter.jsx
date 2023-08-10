import PropTypes from "prop-types";
import { useUrl } from "../../hooks/useUrl";

import { StyledFilter, FilterButton } from "./Filter.styles";

const Filter = ({ filterField, options }) => {
  const { setUrl, getUrl } = useUrl(filterField, options.at(0).value);

  const handleClick = (value) => {
    setUrl(value);
  };

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value + options.name}
          onClick={() => handleClick(option.value)}
          active={getUrl === option.value}
          disabled={getUrl === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

Filter.propTypes = {
  filterField: PropTypes.string,
  options: PropTypes.array,
};

export default Filter;
