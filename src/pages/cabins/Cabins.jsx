import CabinTable from "../../features/cabins/CabinTable";

import { Heading } from "../../ui/header/Heading.styles";
import { Row } from "../../ui/row/Row.styles";
import AddCabinModal from "../../features/cabins/AddCabinModal";
import CabinTableOperation from "../../features/cabins/CabinTableOperation";

const Cabins = () => {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <CabinTableOperation />
      </Row>

      <Row>
        <CabinTable />
        <AddCabinModal />
      </Row>
    </>
  );
};

export default Cabins;
