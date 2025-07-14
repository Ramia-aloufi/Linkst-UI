import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { User } from "../../model/User";

type Props = {
  user: User;
  message: string | null;
  onClick?: () => void;
};

const UserChatCard = ({ user, message, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
    >
      <CardHeader
        avatar={<Avatar>{user.firstName[0]}</Avatar>}
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={message || ""}
      />
    </Card>
  );
};

export default UserChatCard;
