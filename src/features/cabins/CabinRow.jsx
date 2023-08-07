import PropTypes from "prop-types";
import { HiSquare3Stack3D, HiPencilSquare, HiTrash } from "react-icons/hi2";

import Modal from "../../ui/modal/Modal";
import Table from "../../ui/table/Tables";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/confirmDelete/ConfirmDelete";

import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateCabin } from "./hooks/useCreateCabin";

import { formatCurrency } from "../../utils/helpers";
import { Cabin, Discount, Img, Price } from "./CabinRow.styles";

const CabinRow = ({ cabin }) => {
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
      <Table.Row>
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

          <Modal>
            <Modal.Open open='edit'>
              {
                // * Update Button
              }
              <button>
                {" "}
                <HiPencilSquare />{" "}
              </button>
            </Modal.Open>
            <Modal.Window name='edit'>
              <CreateCabinForm cabinToUpdate={cabin} />
            </Modal.Window>

            <Modal.Open open='delete'>
              {
                // * Delete Button
              }

              <button>
                {" "}
                <HiTrash />{" "}
              </button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
      {
        // if update is clicked show form outside the TableRow
      }
    </>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
