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
            process.env.PUBLIC_URL + "/background2.jpeg"
          })`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
            <Box
      sx={{
        width: 700,
        height: 150,
        backgroundColor: 'black',
        opacity: 0.95,
        display: "flex",
          justifyContent: "center",
          alignItems: "center",
      }}
    >
        <Typography variant="h1" component="div" fontWeight={"bold"} color={"white"}>
          RACER Fitness
        </Typography>
       </Box>
      </Box>
      <CssBaseline />
    </div>
  );
};

export default HomePage;
