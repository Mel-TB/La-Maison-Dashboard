import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/modal/Modal";

import { Button } from "../../ui/button/Button.styles";

const AddCabinModal = () => {
  return (
    <div>
      <Modal>
        <Modal.Open open='cabin-form'>
          <Button>Add new cabin </Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabinModal;
