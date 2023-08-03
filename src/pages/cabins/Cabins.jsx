import { useState } from "react";

import CabinTable from "../../features/cabins/CabinTable";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";

import { Heading } from "../../ui/header/Heading.styles";
import { Row } from "../../ui/row/Row.styles";
import { Button } from "../../ui/button/Button.styles";

const Cabins = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
};

export default Cabins;
