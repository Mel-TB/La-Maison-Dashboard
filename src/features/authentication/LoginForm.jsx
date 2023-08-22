import { useState } from "react";

import FormRow from "../../ui/form/FormRow";

import { Form } from "../../ui/form/Form.styles";
import { Input } from "../../ui/input/Input.styles";
import { Button } from "../../ui/button/Button.styles";
import { SpinnerMini } from "../../ui/spinner/SpinnerMini.styles";

import { useLogin } from "./hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow
        label='Email address'
        orientation='vertical'
      >
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label='Password'
        orientation='vertical'
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow orientation='vertical'>
        <Button
          size='large'
          disabled={isLoading}
        >
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
};

export default LoginForm;
