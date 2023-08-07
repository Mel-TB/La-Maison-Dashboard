import { useCabins } from "./hooks/useCabins";

import CabinRow from "./CabinRow";
import Table from "../../ui/table/Tables";

import { Spinner } from "../../ui/spinner/Spinner.styles";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin) => (
          <CabinRow
            cabin={cabin}
            key={cabin.id}
          />
        )}
      />
    </Table>
  );
};

export default CabinTable;
