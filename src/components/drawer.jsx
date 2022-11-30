import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router";

const MuiDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate=useNavigate();
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          p={2}
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
                    <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>{navigate("/"); setIsDrawerOpen(false)}}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>

            </List>
          <Divider />

          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};
export default MuiDrawer;
