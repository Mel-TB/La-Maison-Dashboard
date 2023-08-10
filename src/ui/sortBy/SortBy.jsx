import PropTypes from "prop-types";
import Select from "../select/Select";
import { useUrl } from "../../hooks/useUrl";

const SortBy = ({ options }) => {
  const { setUrl, getUrl } = useUrl("sortBy", "");

  const handleChange = (value) => {
    setUrl(value);
  };

  return (
    <Select
      options={options}
      type='white'
      onChange={(e) => handleChange(e.target.value)}
      value={getUrl}
    />
  );
};

SortBy.propTypes = {
  options: PropTypes.array,
};

export default SortBy;
