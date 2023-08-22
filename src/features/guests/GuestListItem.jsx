import { Flag } from "../../ui/flag/Flag.styles";
import { StyledGuestListItem, ID } from "./styles/GuestListItem.styles";

const GuestListItem = ({ guest, onClick }) => {
  return (
    <StyledGuestListItem
      onClick={() => onClick(guest)}
      role='button'
    >
      <Flag
        src={guest.country}
        alt={`Flag of ${guest.nationality}`}
      />
      <div>{guest.full_name}</div>
      <ID>ID: {guest.national_id}</ID>
    </StyledGuestListItem>
  );
};

export default GuestListItem;
