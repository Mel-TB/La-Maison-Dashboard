import { StyledUserAvatar, Avatar } from "./styles/UserAvatar.styles";

import { useUser } from "./hooks/useUser";

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
