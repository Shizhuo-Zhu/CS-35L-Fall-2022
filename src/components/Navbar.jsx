import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import MuiDrawer from "./drawer";

export default function Navbar() {
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
          <Button variant="outlined" color="inherit" startIcon={<LoginIcon />}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
