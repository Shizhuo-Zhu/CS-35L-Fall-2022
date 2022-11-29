import { AlignHorizontalCenter, CenterFocusStrong } from "@mui/icons-material";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
const HomePage = () => {
  return (
    <div>
      <Navbar />

      <Box
        class="bg"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/backgroundImage.jpg"
          })`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="div">
          Racer Fitness
        </Typography>
      </Box>
      <CssBaseline />
    </div>
  );
};

export default HomePage;
