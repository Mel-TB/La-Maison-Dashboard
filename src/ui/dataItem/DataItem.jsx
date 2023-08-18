import PropTypes from "prop-types";

import { Label, StyledDataItem } from "./DataItem.styles";

const DataItem = ({ icon, label, children }) => {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  );
};

DataItem.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default DataItem;
