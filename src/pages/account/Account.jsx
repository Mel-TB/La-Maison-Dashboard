import { Heading } from "../../ui/header/Heading.styles";
import { Row } from "../../ui/row/Row.styles";

const Account = () => {
  return (
    <>
      <Heading as='h1'>Update your account</Heading>

      <Row>
        <Heading as='h3'>Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading as='h3'>Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
};

export default Account;
