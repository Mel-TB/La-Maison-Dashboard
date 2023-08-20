// import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../../features/authentication/UpdateUserDataForm";

import { Row } from "../../ui/row/Row.styles";
import { Heading } from "../../ui/header/Heading.styles";
import UpdatePasswordForm from "../../features/authentication/UpdatePasswordForm";

const Account = () => {
  return (
    <>
      <Heading as='h1'>Update your account</Heading>

      <Row>
        <Heading as='h3'>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h3'>Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
};

export default Account;
