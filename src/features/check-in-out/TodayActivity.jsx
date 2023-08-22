import TodayItem from "./TodayItem";

import {
  NoActivity,
  StyledToday,
  TodayList,
} from "./styles/TodayActivity.styles";
import { Row } from "../../ui/row/Row.styles";
import { Heading } from "../../ui/header/Heading.styles";
import { Spinner } from "../../ui/spinner/Spinner.styles";

import { useTodayActivity } from "./hooks/useTodayActivity";

const TodayActivity = () => {
  const { isLoading, activities } = useTodayActivity();

  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading as='h2'>Today</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem
                activity={activity}
                key={activity.id}
              />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity for today</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
};

export default TodayActivity;
