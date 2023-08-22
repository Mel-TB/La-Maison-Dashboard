import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import Menus from "../../ui/menu/Menus";
import Empty from "../../ui/empty/Empty";
import Table from "../../ui/table/Tables";

import { Spinner } from "../../ui/spinner/Spinner.styles";

import { useCabins } from "./hooks/useCabins";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins.length) {
    return <Empty resourceName='cabins' />;
  }

  // Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  }

  if (filterValue === "no_discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === "with_discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 1);
  }

  // Sort

  const sortBy = searchParams.get("sortBy") || "name_asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const compare = (a, b) => {
    if (a["name"] < b["name"]) {
      return -1 * modifier;
    }

    if (a["name"] > b["name"]) {
      return 1 * modifier;
    }
    return 0;
  };

  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(compare)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Menus>
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
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow
              cabin={cabin}
              key={cabin.id}
            />
          )}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
