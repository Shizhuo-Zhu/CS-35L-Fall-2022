import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import MuiDrawer from "./drawer";
import { useNavigate } from "react-router";
import { auth, logout } from "./firebase";
import { Avatar } from "@mui/material";

export default function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  if (user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            <MuiDrawer />
            {/* </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Racer Fitness
            </Typography>
            <Avatar src={user.photoURL} ></Avatar>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => {
                logout();
                navigate("/Sign-in");
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > */}
            {/* </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Racer Fitness
            </Typography>

            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/Sign-in")}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
