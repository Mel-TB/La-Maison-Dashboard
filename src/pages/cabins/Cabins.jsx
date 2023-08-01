import CabinTable from "../../features/cabins/CabinTable";
import { Heading } from "../../ui/header/Heading.styles";

import { Row } from "../../ui/row/Row.styles";

const Cabins = () => {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>
    </>
  );
};

export default Cabins;
