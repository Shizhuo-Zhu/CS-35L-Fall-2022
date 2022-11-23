import { Box, Button, CssBaseline } from "@mui/material";
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
        }}
      ></Box>
      <CssBaseline />
    </div>
  );
};

export default HomePage;
