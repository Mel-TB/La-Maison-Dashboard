import { Heading } from "../../ui/header/Heading.styles";
import { Row } from "../../ui/row/Row.styles";

import { StyledToday } from "./TodayActivity.styles";

const Today = () => {
  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading as='h2'>Today</Heading>
      </Row>
    </StyledToday>
  );
};

export default Today;
