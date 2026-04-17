import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import Title from "../../Component/Title";

const products = [
  {
    id: 1,
    name: "Sterling Stone Hoops Earring",
    price: 131,
    original: 499,
    discount: "73% Off",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Regal Purple Hoops Earring",
    price: 137,
    original: 499,
    discount: "72% Off",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Dazzling Mini Hoops Earring",
    price: 137,
    original: 499,
    discount: "72% Off",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    name: "Dainty Pink Hoops Earring",
    price: 137,
    original: 499,
    discount: "72% Off",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    name: "Blue Mystic Quartz Drops Earring",
    price: 229,
    original: 899,
    discount: "74% Off",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 6,
    name: "Dreamy Shine Hoops Earring",
    price: 266,
    original: 799,
    discount: "66% Off",
    image: "https://via.placeholder.com/300",
  },
];

const HairAccessories = () => {
  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Title
            title="New Arrivals
"
            subtitle="You Blink, You Miss

"
          />
        </Box>

        <Typography
          sx={{
            color: "#ff3f6c",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          View all
        </Typography>
      </Box>

      {/* Scroll Container */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {products.map((item) => (
          <Card
            key={item.id}
            sx={{
              minWidth: 220,
              borderRadius: 3,
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              height="220"
              image={item.image}
              alt={item.name}
              sx={{ borderRadius: "12px 12px 0 0" }}
            />

            <CardContent sx={{ p: 1.5 }}>
              <Typography fontSize={14} noWrap>
                {item.name}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                <Typography fontWeight={700}>₹{item.price}</Typography>
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "#888",
                    fontSize: 13,
                  }}
                >
                  ₹{item.original}
                </Typography>
                <Typography color="error" fontSize={13}>
                  {item.discount}
                </Typography>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 1.5,
                  backgroundColor: "#ff3f6c",
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#e7335e",
                  },
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default HairAccessories;
