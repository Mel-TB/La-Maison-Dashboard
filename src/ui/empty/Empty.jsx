import PropTypes from "prop-types";

const Empty = ({ resourceName }) => {
  return <p>No {resourceName} could be found.</p>;
};

Empty.propTypes = {
  resourceName: PropTypes.string,
};

export default Empty;
