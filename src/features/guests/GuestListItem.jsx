import { Flag } from "../../ui/flag/Flag.styles";
import { StyledGuestListItem } from "./GuestListItem.styles";

const GuestListItem = ({ guest, onClick }) => {
  return (
    <StyledGuestListItem
      onClick={() => onClick(guest)}
      role='button'
    >
      <Flag
        src={guest.countryFlag}
        alt={`Flag of ${guest.nationality}`}
      />
      <div>{guest.fullName}</div>
      <ID>ID: {guest.nationalID}</ID>
    </StyledGuestListItem>
  );
};

export default GuestListItem;
