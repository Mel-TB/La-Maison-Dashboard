/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

import {
  StyledTable,
  StyledHeader,
  StyledRow,
  StyledBody,
  Footer,
  Empty,
} from "./Table.styles";
import { createContext, useContext } from "react";

const TableContext = createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader
      role='row'
      columns={columns}
      as='header'
    >
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow
      role='row'
      columns={columns}
    >
      {children}
    </StyledRow>
  );
};

const Body = ({ data, render }) => {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

Table.propTypes = {
  columns: PropTypes.string,
  children: PropTypes.node,
};

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

Row.propTypes = {
  children: PropTypes.node,
};

Body.propTypes = {
  data: PropTypes.array,
  render: PropTypes.func,
};

export default Table;
