import Filter from "../../ui/filter/Filter";
import SortBy from "../../ui/sortBy/SortBy";
import { TableOperations } from "../../ui/table/TableOperations.styles";

const CabinTableOperation = () => {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no_discount", label: "No discount" },
          { value: "with_discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by price ⬇️" },
          { value: "regular_price-desc", label: "Sort by price ⬆️" },
          { value: "max_capacity-asc", label: "Sort by capacity ⬇️" },
          { value: "max_capacity-desc", label: "Sort by capacity ⬆️" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperation;
