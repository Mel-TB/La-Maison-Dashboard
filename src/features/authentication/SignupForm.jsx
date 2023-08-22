import { useForm } from "react-hook-form";

import FormRow from "../../ui/form/FormRow";
import { Form } from "../../ui/form/Form.styles";
import { Input } from "../../ui/input/Input.styles";
import { Button } from "../../ui/button/Button.styles";
import { SpinnerMini } from "../../ui/spinner/SpinnerMini.styles";

import { useSignUp } from "./hooks/useSignUp";

// Email regex: /\S+@\S+\.\S+/

const SignupForm = () => {
  const { signUp, isLoading } = useSignUp();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = ({ fullName, password, email }) => {
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Full name'
        error={errors?.fullName?.message}
      >
        <Input
          type='text'
          id='fullName'
          {...register("fullName", { required: "This field is required" })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors?.email?.message}
      >
        <Input
          type='email'
          id='email'
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("password") || "Password needs to match",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {!isLoading ? "Create new account" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
