import SignupForm from "../../features/authentication/SignupForm";
import { Heading } from "../../ui/header/Heading.styles";

const NewUsers = () => {
  return (
    <>
      <Heading as='h1'>Create a new user</Heading>
      <SignupForm />
    </>
  );
};

export default NewUsers;
