import { useState } from "react";

import FormRow from "../../ui/form/FormRow";
import { Form } from "../../ui/form/Form.styles";
import { Input } from "../../ui/input/Input.styles";
import { Button } from "../../ui/button/Button.styles";
import { FileInput } from "../../ui/input/FileInput.styles";
import { SpinnerMini } from "../../ui/spinner/SpinnerMini.styles";

import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdateUser";

const UpdateUserDataForm = () => {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullName) {
      updateUser(
        { fullName, avatar },
        {
          onSuccess: () => {
            setAvatar(null);
            e.target.reset();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input
          value={email}
          disabled
        />
      </FormRow>

      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        {!isUpdating ? (
          <Button disabled={isUpdating}>Update account</Button>
        ) : (
          <SpinnerMini />
        )}
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
