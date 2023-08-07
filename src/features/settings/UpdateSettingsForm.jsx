import { Spinner } from "../../ui/spinner/Spinner.styles";
import { Form } from "../../ui/form/Form.styles";
import FormRow from "../../ui/form/FormRow";

import { Input } from "../../ui/input/Input.styles";
import { useSettings } from "./hooks/useSettings";
import { useUpdateSetting } from "./hooks/useUpdateSettings";

const UpdateSettingsForm = () => {
  const {
    isLoading,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guest_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();

  // eslint-disable-next-line no-unused-vars
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  const handleUpdate = (e, field) => {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  };

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdating}
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdating}
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdating}
          defaultValue={max_guest_per_booking}
          onBlur={(e) => handleUpdate(e, "max_guest_per_booking")}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdating}
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
