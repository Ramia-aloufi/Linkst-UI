import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { UserChat } from "../../model/Chat";

type Props = {
  user: UserChat;
  message: string | null;
  onClick?: () => void;
};

const UserChatCard = ({ user, message, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      variant="outlined"
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
