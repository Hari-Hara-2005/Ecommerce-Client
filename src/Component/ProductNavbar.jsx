import { Box, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";

const ProductNavbar = () => {
  const location = useLocation();
  const [items, setItem] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get(
        "/api/category"
      );
      setItem(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        overflowX: { xs: "auto", sm: "hidden" },
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 0,
          overflowX: "auto",
          flexWrap: "nowrap",
        }}
      >
        {items.map((item, index) => {
          const isActive = location.pathname.includes(item.slug);
          return (
            <Link
              key={index}
              to={`/category/${item.slug}`}
              onClick={ScrollToTop}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem
                sx={{
                  width: "auto",
                  py: 0,
                  px: { xs: "1rem", sm: "2.3rem" },
                  borderBottom: isActive ? "2px solid black" : "none",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
              >
                <ListItemText
                  primary={item.category_name}
                  sx={{
                    color: isActive ? "#92553D" : "inherit",
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default ProductNavbar;
