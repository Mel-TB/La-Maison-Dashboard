import { Icon, StyledStat, Title, Value } from "./Stat.styles";

const Stat = ({ icon, title, value, color }) => {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
};

export default Stat;
