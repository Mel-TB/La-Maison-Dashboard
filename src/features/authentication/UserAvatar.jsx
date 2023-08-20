import { useUser } from "./hooks/useUser";
import { StyledUserAvatar, Avatar } from "./UserAvatar.styles";

const UserAvatar = () => {
  const { user } = useUser();

  const { fullName, avatar } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of {fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
