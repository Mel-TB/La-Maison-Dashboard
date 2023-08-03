/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import { useDeleteCabin } from "./hooks/useDeleteCabin";

import CreateCabinForm from "./CreateCabinForm";

import { formatCurrency } from "../../utils/helpers";
import { Cabin, Discount, Img, Price, TableRow } from "./CabinRow.styles";

const CabinRow = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  return (
    <>
      <TableRow role='row'>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Max {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>

          <button
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </TableRow>
      {
        // if Edit is clicked show form outside the TableRow
      }
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
