import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import FormRow from "../../ui/form/FormRow";

import { Input } from "../../ui/input/Input.styles";
import { Form } from "../../ui/form/Form.styles";
import { Button } from "../../ui/button/Button.styles";
import { Textarea } from "../../ui/input/Textarea.styles";
import { FileInput } from "../../ui/input/FileInput.styles";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useUpdateCabin } from "./hooks/useUpdateCabin";

const CreateCabinForm = ({ cabinToUpdate = {}, onCloseModal }) => {
  const { isCreating, createCabin } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  // Check if update or not
  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isUpdateSession) {
      updateCabin(
        { newCabinData: { ...data, image }, id: updateId },
        {
          // eslint-disable-next-line no-unused-vars
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label='Cabin Name'
        error={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label='Maximum Capacity'
        error={errors?.max_capacity?.message}
      >
        <Input
          type='number'
          id='max_capacity'
          disabled={isWorking}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular Price'
        error={errors?.regular_price?.message}
      >
        <Input
          type='number'
          id='regular_price'
          disabled={isWorking}
          defaultValue={0}
          {...register("regular_price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "This field is required",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        error={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: {
              positive: (value) =>
                value > -1 || "should be greater or equal than zero",

              lessThan: (value) =>
                value <= getValues().regular_price ||
                "Should be less than regular price",
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Description '
        error={errors?.description?.message}
      >
        <Textarea
          type='text'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label='Cabin photo '>
        <FileInput
          id='image'
          disabled={isWorking}
          accept='image/*'
          {...register("image", {
            validate: (fileData) => {
              if (typeof fileData === "string" || fileData?.length === 1)
                return true;
              return "File is required";
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? "Update cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

CreateCabinForm.propTypes = {
  cabinToUpdate: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
