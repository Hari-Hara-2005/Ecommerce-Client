import { Box, Typography, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import api from "../utils/api";

export default function TopBar() {
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(0);

  // ✅ FETCH FROM API
  useEffect(() => {
    const fetchTopbar = async () => {
      try {
        const res = await api.get("/api/topbar");
        const texts = res.data.map((item) => item.bar_text);
        setMessages(texts);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTopbar();
  }, []);

  // ✅ AUTO SLIDE (every 3 seconds)
  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === messages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // change time here

    return () => clearInterval(interval); // cleanup
  }, [messages]);

  // ✅ PREVIOUS
  const prevMsg = () => {
    setIndex((prev) =>
      prev === 0 ? messages.length - 1 : prev - 1
    );
  };

  // ✅ NEXT
  const nextMsg = () => {
    setIndex((prev) =>
      prev === messages.length - 1 ? 0 : prev + 1
    );
  };

  if (messages.length === 0) return null;

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
          <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
        </IconButton>

        {/* TEXT */}
        <Box
          sx={{
            width: "300px",
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
          <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}