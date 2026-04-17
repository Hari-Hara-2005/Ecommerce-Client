import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api";

export default function SlideProduct() {
  const [categories, setCategories] = useState([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/api/category");
      setCategories(data);

      if (data.length > 0) {
        setActiveSlug(data[0].slug);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ✅ Fetch Products
  const fetchProducts = async (slug) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/api/product/${slug}`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeSlug) {
      fetchProducts(activeSlug);
    }
  }, [activeSlug]);

  return (
    <>
      {/* 🔥 Category Tabs */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: "auto",
          mb: 4,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat._id}
            onClick={() => setActiveSlug(cat.slug)}
            sx={{
              borderRadius: "50px",
              px: 3,
              minWidth: "120px",
              flexShrink: 0,
              textTransform: "none",
              border: "1px solid #ff2d74",
              bgcolor: activeSlug === cat.slug ? "#ff2d74" : "#ffe4ec",
              color: activeSlug === cat.slug ? "#fff" : "#000",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#ff2d74",
                color: "#fff",
              },
            }}
          >
            {cat.category_name}
          </Button>
        ))}
      </Stack>

      {/* 🔥 Product Grid with Overlay Loader */}
      <Box sx={{ position: "relative" }}>
        {/* Loader Overlay */}
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(255,255,255,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Products */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(6, 1fr)",
            },
            gap: 2,
            minHeight: 320, // 👈 prevents layout jump
            transition: "all 0.3s ease",
          }}
        >
          {products.map((item) => (
            <Card
              key={item._id}
              sx={{
                borderRadius: "12px",
                boxShadow: "none",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={item.image}
                sx={{
                  borderRadius: "12px",
                  height: { xs: 150, md: 180 },
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ px: 0 }}>
                {/* Title */}
                <Typography fontSize={14} fontWeight={500} noWrap>
                  {item.name}
                </Typography>

                {/* Rating */}
                {item.rating && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Rating value={item.rating} size="small" readOnly />
                    <Typography fontSize={12}>({item.reviews || 1})</Typography>
                  </Stack>
                )}

                {/* Price */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography fontWeight={600}>₹{item.price}</Typography>

                  {item.oldPrice && (
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "#999",
                        fontSize: 12,
                      }}
                    >
                      ₹{item.oldPrice}
                    </Typography>
                  )}

                  <Chip
                    label="70% Off"
                    size="small"
                    sx={{
                      bgcolor: "#ffe4ec",
                      color: "#ff2d74",
                      fontSize: 10,
                    }}
                  />
                </Stack>
              </CardContent>

              {/* Button */}
              <Button
                fullWidth
                sx={{
                  mt: 1,
                  borderRadius: "30px",
                  bgcolor: "#ff2d74",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#e02663",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
