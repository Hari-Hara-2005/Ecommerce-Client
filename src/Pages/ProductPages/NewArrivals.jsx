import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Chip,
  Rating,
} from "@mui/material";
import Title from "../../Component/Title";

const products = [
  {
    id: 1,
    name: "Sterling Stone Hoops Earring",
    price: 131,
    original: 499,
    discount: "73% Off",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=300",
    hoverImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300",
    rating: 4.5,
    tag: "Hot",
  },
  {
    id: 2,
    name: "Regal Purple Hoops Earring",
    price: 137,
    original: 499,
    discount: "72% Off",
    image:
      "https://images.unsplash.com/photo-1620656798579-1984d4c1b9d4?w=300",
    hoverImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300",
    rating: 4,
    tag: "Viral",
  },
  {
    id: 3,
    name: "Dazzling Mini Hoops Earring",
    price: 137,
    original: 499,
    discount: "72% Off",
    image:
      "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=300",
    hoverImage:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=300",
    rating: 4.2,
    tag: "Hot",
  },
  {
    id: 4,
    name: "Dainty Pink Hoops Earring",
    price: 137,
    original: 499,
    discount: "72% Off",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300",
    hoverImage:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300",
    rating: 3.2,
    tag: "Viral",
  },
  {
    id: 5,
    name: "Blue Mystic Quartz Drops Earring",
    price: 229,
    original: 899,
    discount: "74% Off",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300",
    hoverImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300",
    rating: 4.6,
    tag: "Hot",
  },
  {
    id: 6,
    name: "Dreamy Shine Hoops Earring",
    price: 266,
    original: 799,
    discount: "66% Off",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=300",
    hoverImage:
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=300",
    rating: 4.3,
    tag: "Viral",
  },
];

const NewArrivals = () => {
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
          <Title title="New Arrivals" subtitle="You Blink, You Miss" />
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
              minWidth: 250,
              borderRadius: 3,
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {/* 🔥 Tag */}
            <Chip
              label={item.tag}
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor:
                  item.tag === "Hot" ? "#ff3f6c" : "#6c63ff",
                color: "#fff",
                fontWeight: 600,
                zIndex: 2,
              }}
            />

            {/* 🖼️ Image Hover Container */}
            <Box
              sx={{
                position: "relative",
                height: 220,
                overflow: "hidden",

                "&:hover .default-img": {
                  opacity: 0,
                  transform: "scale(1.1)",
                },
                "&:hover .hover-img": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              }}
            >
              {/* Default Image */}
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                className="default-img"
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.4s ease",
                }}
              />

              {/* Hover Image */}
              <CardMedia
                component="img"
                image={item.hoverImage}
                alt="hover"
                className="hover-img"
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0,
                  transform: "scale(1.05)",
                  transition: "all 0.4s ease",
                }}
              />
            </Box>

            <CardContent sx={{ p: 1.5 }}>
              <Typography fontSize={16} fontWeight={600} noWrap>
                {item.name}
              </Typography>

              <Rating
                value={item.rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{ mt: 0.5 }}
              />

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

export default NewArrivals;