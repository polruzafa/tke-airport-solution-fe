import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";

import SignalWifi3Bar from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi2Bar from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi1Bar from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi0Bar from "@mui/icons-material/SignalWifi0Bar";

const WifiIcon = [
  <IconButton>
    <SignalWifi0Bar style={{ fill: "red" }} />
  </IconButton>,
  <IconButton>
    <SignalWifi1Bar style={{ fill: "white" }} />
  </IconButton>,
  <IconButton>
    <SignalWifi2Bar style={{ fill: "white" }} />
  </IconButton>,
  <IconButton>
    <SignalWifi3Bar style={{ fill: "white" }} />
  </IconButton>,
];

const Header = ({ title, signalStrength = 0 }) => (
  <AppBar position="static" style={{ backgroundColor: "#018786" }}>
    <Toolbar>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {WifiIcon[signalStrength]}
    </Toolbar>
  </AppBar>
);

export default Header;
