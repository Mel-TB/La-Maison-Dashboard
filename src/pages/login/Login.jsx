import LoginForm from "../../features/authentication/LoginForm";
import Logo from "../../ui/logo/Logo";
import { Heading } from "../../ui/header/Heading.styles";

import { LoginLayout } from "./Login.styles";

const Login = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Access to your account </Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
