import { Spinner } from "../../ui/spinner/Spinner.styles";
import { Form } from "../../ui/form/Form.styles";
import FormRow from "../../ui/form/FormRow";

import { Input } from "../../ui/input/Input.styles";
import { useSettings } from "./hooks/useSettings";

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

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          defaultValue={min_booking_length}
          type='number'
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          defaultValue={max_booking_length}
          type='number'
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          defaultValue={max_guest_per_booking}
          type='number'
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          defaultValue={breakfast_price}
          type='number'
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
