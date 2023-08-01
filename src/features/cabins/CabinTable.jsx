import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../services/apiCabins";

import { Spinner } from "../../ui/spinner/Spinner.styles";
import { Table, TableHeader } from "./CabinTable.styles";
import CabinRow from "./CabinRow";

const CabinTable = () => {
  const {
    isLoading,
    // eslint-disable-next-line no-unused-vars
    data: cabins,
    // eslint-disable-next-line no-unused-vars
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: fetchCabins,
  });

  if (isLoading) return <Spinner />;

  return (
    <Table role='table'>
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow
          cabin={cabin}
          key={cabin.id}
        />
      ))}
    </Table>
  );
};

export default CabinTable;
