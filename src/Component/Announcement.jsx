import { Box, Typography, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

export default function TopBar() {
  const messages = [
    "Free Earring Organiser above Rs 999",
    "Flat 80% OFF on Selected Items",
    "New Arrivals Just Dropped 🔥",
  ];

  const [index, setIndex] = useState(0);

  const prevMsg = () => {
    setIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const nextMsg = () => {
    setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#e6cfd4",
        py: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 9999,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={5}>
        {/* LEFT BUTTON */}
        <IconButton size="small" onClick={prevMsg}>
          <ArrowBackIosNewIcon
            sx={{
              fontSize: 12,
              stroke: "black",
              strokeWidth: 1,
            }}
          />
        </IconButton>

        {/* FIXED WIDTH TEXT */}
        <Box
          sx={{
            width: "300px", // 🔥 fixed width (adjust if needed)
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            noWrap
            sx={{
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "math",
            }}
          >
            {messages[index]}
          </Typography>
        </Box>

        {/* RIGHT BUTTON */}
        <IconButton size="small" onClick={nextMsg}>
          <ArrowForwardIosIcon
            sx={{
              fontSize: 12,
              stroke: "black",
              strokeWidth: 1,
            }}
          />
        </IconButton>
      </Stack>
    </Box>
  );
}
