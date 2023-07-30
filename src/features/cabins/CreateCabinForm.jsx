import { Input } from "../../ui/input/Input.styles";
import { Form } from "../../ui//form/Form.styles";
import { Button } from "../../ui/button/Button.styles";
import { FileInput } from "../../ui/input/FileInput.styles";
import { Textarea } from "../../ui/input/Textarea.styles";

import { FormRow, Label } from "./CreateCabinForm.styles";

const CreateCabinForm = () => {
  return (
    <Form>
      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
          type='number'
          id='maxCapacity'
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
          type='number'
          id='regularPrice'
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput
          id='image'
          accept='image/*'
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
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
