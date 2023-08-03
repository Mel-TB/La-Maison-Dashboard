import UpdateSettingsForm from "../../features/settings/UpdateSettingsForm";
import { Heading } from "../../ui/header/Heading.styles";
import { Row } from "../../ui/row/Row.styles";

const Settings = () => {
  return (
    <Row>
      <Heading as='h1'>Update hotel settings</Heading>

      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
