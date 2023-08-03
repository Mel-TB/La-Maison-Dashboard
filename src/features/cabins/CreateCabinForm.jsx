import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import FormRow from "../../ui/form/FormRow";

import { Input } from "../../ui/input/Input.styles";
import { Form } from "../../ui/form/Form.styles";
import { Button } from "../../ui/button/Button.styles";
import { Textarea } from "../../ui/input/Textarea.styles";
import { FileInput } from "../../ui/input/FileInput.styles";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useEditCabin } from "./hooks/useEditCabin";

const CreateCabinForm = ({ cabinToEdit = {} }) => {
  const { isCreating, createCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  // Check if we edit or not
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
          },
        }
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
                Number(value) > -1 || "should be greater or equal than zero",

              lessThan: (value) =>
                Number(value) <= Number(getValues().regular_price) ||
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
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
};

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
};

export default CreateCabinForm;
