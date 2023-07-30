import BookingDataBox from "./BookingDataBox";
import { Row } from "../../ui/row/Row.styles";
import { Heading } from "../../ui/header/Heading.styles";
import { Tag } from "../../ui/tag/Tag.styles";
import { ButtonGroup } from "../../ui/button/ButtonGroup.styles";
import { Button } from "../../ui/button/Button.styles";
import { ButtonText } from "../../ui/button/ButtonText.styles";

import { useMoveBack } from "../../hooks/useMoveBack";

import { HeadingGroup } from "./BookingDetails.styles";

const BookingDetail = () => {
  const booking = {};
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #X</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button
          variation='secondary'
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
