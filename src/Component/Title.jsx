import React from "react";
import { Typography } from "@mui/material";
const Title = ({ title, subtitle }) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontSize: ["25px", "20px", "35px"] }}
        fontWeight={700}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "#777", mb: 2 }}>{subtitle}</Typography>
    </>
  );
};

export default Title;
