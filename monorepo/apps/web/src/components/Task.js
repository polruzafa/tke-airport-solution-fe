import { ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import { formatDates } from "../utils";

import PendingActions from "@mui/icons-material/PendingActions";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Engineering from "@mui/icons-material/Engineering";

const Task = ({ title, startTime, endTime }) => (
  <ListItem>
    <ListItemAvatar>
      {!startTime && !endTime ? <PendingActions /> : null}
      {startTime && !endTime ? <Engineering /> : null}
      {endTime ? <CheckCircle /> : null}
    </ListItemAvatar>
    <ListItemText primary={title} secondary={formatDates(startTime, endTime)} />
  </ListItem>
);

export default Task;
