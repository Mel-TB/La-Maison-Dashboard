import { useState } from "react";
import PropTypes from "prop-types";
import { HiSquare3Stack3D, HiPencilSquare, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";

import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { Cabin, Discount, Img, Price, TableRow } from "./CabinRow.styles";
import { useCreateCabin } from "./hooks/useCreateCabin";

const CabinRow = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      description,
      image,
    });
  };

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
          {
            // * Duplicate new Cabin
          }

          <button
            disabled={isCreating}
            onClick={handleDuplicate}
          >
            <HiSquare3Stack3D />
          </button>

          {
            // * Edit Button
          }
          <button onClick={() => setShowForm((show) => !show)}>
            {" "}
            <HiPencilSquare />{" "}
          </button>

          {
            // * Delete Button
          }

          <button
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            {" "}
            <HiTrash />{" "}
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
