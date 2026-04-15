import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//change 
const CategorySection = ({ industryData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "normal", lg: "center" },
        gap: 2,
        overflowX: "auto",
        p: 2,
        bgcolor: "#fff",
      }}
    >
      {industryData.map((item, index) => (
        <Box
          key={index}
          component={Link}
          to={`/category/${item.slug}`}
          sx={{
            minWidth: "14%",
            height: { xs: "120px", lg: "240px" },
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
            flexShrink: 0,
            bgcolor: "#ddd",
            textDecoration: "none",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {/* Image */}
          <img
            src={item.category_image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "900",
                color: "#000",
                letterSpacing: "1px",
              }}
            >
              {item.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CategorySection;
