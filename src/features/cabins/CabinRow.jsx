import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";

import { Cabin, Discount, Img, Price, TableRow } from "./CabinRow.styles";
import { deleteCabins } from "../../services/apiCabins";

const CabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    name,

    max_capacity: maxCapacity,

    regular_price: regularPrice,

    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      alert("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => alert(error.message),
  });

  return (
    <TableRow role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Max {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button
        onClick={() => mutate(cabinId)}
        disabled={isDeleting}
      >
        {" "}
        Delete{" "}
      </button>
    </TableRow>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
