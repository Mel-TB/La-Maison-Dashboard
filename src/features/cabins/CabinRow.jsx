import PropTypes from "prop-types";
import { HiSquare3Stack3D, HiPencilSquare, HiTrash } from "react-icons/hi2";

import Menus from "../../ui/menu/Menus";
import Modal from "../../ui/modal/Modal";
import Table from "../../ui/table/Tables";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/confirmDelete/ConfirmDelete";

import { Cabin, Discount, Img, Price } from "./styles/CabinRow.styles";

import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateCabin } from "./hooks/useCreateCabin";

import { formatCurrency } from "../../lib/utils/helpers";

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

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

  const handleDeleteCabin = () => {
    deleteCabin(cabinId);
  };

  return (
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
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare3Stack3D />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open open='update'>
                {
                  // * Update Button
                }
                <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open open='delete'>
                {
                  // * Delete Button
                }

                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='update'>
              <CreateCabinForm cabinToUpdate={cabin} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting}
                onConfirm={handleDeleteCabin}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.object,
};

export default CabinRow;
