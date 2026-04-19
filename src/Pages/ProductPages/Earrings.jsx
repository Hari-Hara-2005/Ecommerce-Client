import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Rating,
  IconButton,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Title from "../../Component/Title";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const rippleOut = keyframes`
  from { transform: scale(0); opacity: 0.45; }
  to   { transform: scale(4.5); opacity: 0; }
`;
const cartJump = keyframes`
  0%   { transform: translateY(0) rotate(0); }
  30%  { transform: translateY(-7px) rotate(-10deg); }
  60%  { transform: translateY(2px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0); }
`;
const shimmer = keyframes`
  0%   { background-position: -700px 0; }
  100% { background-position: 700px 0; }
`;
const badgeSlide = keyframes`
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
`;

// ─── Shimmer skeleton ─────────────────────────────────────────────────────────
const ShimmerBox = styled(Box)({
  background: "linear-gradient(90deg, #f5f0eb 25%, #fdf8f4 50%, #f5f0eb 75%)",
  backgroundSize: "1400px 100%",
  animation: `${shimmer} 1.6s infinite linear`,
});

// ─── Mobile image carousel ─────────────────────────────────────────────────────
const MobileCarousel = ({ mainSrc, hoverSrc, alt }) => {
  const images = [...new Set([mainSrc, hoverSrc].filter(Boolean))];
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const startX = useRef(null);

  const goTo = useCallback(
    (i) => {
      const c = Math.max(0, Math.min(i, images.length - 1));
      setIdx(c);
      if (trackRef.current)
        trackRef.current.scrollTo({
          left: trackRef.current.offsetWidth * c,
          behavior: "smooth",
        });
    },
    [images.length],
  );

  const onScroll = () => {
    if (!trackRef.current) return;
    setIdx(
      Math.round(trackRef.current.scrollLeft / trackRef.current.offsetWidth),
    );
  };
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) goTo(idx + (diff > 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <Box
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        sx={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`${alt} ${i + 1}`}
            sx={{
              flex: "0 0 100%",
              width: "100%",
              height: 230,
              objectFit: "cover",
              scrollSnapAlign: "start",
              display: "block",
            }}
          />
        ))}
      </Box>
      {images.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 0.6,
            position: "absolute",
            bottom: 8,
            width: "100%",
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                width: i === idx ? 18 : 6,
                height: 6,
                borderRadius: "50px",
                bgcolor: i === idx ? "#ff2d74" : "rgba(255,255,255,0.85)",
                cursor: "pointer",
                transition: "width 0.3s ease",
                boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ArrivalCard = ({ item, index, isWished, onWishToggle, onAddToCart }) => {
  const [cartAnim, setCartAnim] = useState(false);
  const [rippling, setRippling] = useState(false);
  const [added, setAdded] = useState(false);

  const discount =
    item.strikeout_price && item.strikeout_price > item.product_price
      ? Math.round(
          ((item.strikeout_price - item.product_price) / item.strikeout_price) *
            100,
        )
      : 0;
  const savings =
    item.strikeout_price > item.product_price
      ? (item.strikeout_price - item.product_price).toLocaleString("en-IN")
      : 0;

  const handleCart = () => {
    setCartAnim(true);
    setRippling(true);
    setAdded(true);
    setTimeout(() => setCartAnim(false), 650);
    setTimeout(() => setRippling(false), 600);
    setTimeout(() => setAdded(false), 1800);
    onAddToCart(item);
  };

  return (
    <Box
      sx={{
        minWidth: { xs: 250, sm: 230, md: 280 },
        maxWidth: { xs: 195, sm: 230, md: 250 },
        borderRadius: "18px",
        overflow: "hidden",
        bgcolor: "#fff",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        animation: `${fadeUp} 0.5s cubic-bezier(.34,1.56,.64,1) both`,
        animationDelay: `${index * 0.07}s`,
        transition:
          "transform 0.32s cubic-bezier(.34,1.56,.64,1), box-shadow 0.32s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 24px 52px rgba(255,45,116,0.15), 0 4px 14px rgba(0,0,0,0.06)",
        },
        "&:hover .quickWa": { opacity: 1, transform: "translateX(0)" },
        "&:hover .mainImg": { opacity: 0, transform: "scale(1.05)" },
        "&:hover .hoverImg": { opacity: 1, transform: "scale(1.03)" },
      }}
    >
      {/* ── Image area ── */}
      <Box
        sx={{ position: "relative", overflow: "hidden", bgcolor: "#fdf7f3" }}
      >
        {/* Desktop hover swap */}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            position: "relative",
            height: { sm: 220, md: 240 },
            cursor: "zoom-in",
          }}
        >
          {[
            { cls: "mainImg", src: item.image_url || "/no-image.png", op: 1 },
            { cls: "hoverImg", src: item.hover_image || item.image_url, op: 0 },
          ].map(({ cls, src, op }) => (
            <Box
              key={cls}
              component="img"
              src={src}
              className={cls}
              alt={item.product_name}
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.45s ease, transform 0.45s ease",
                opacity: op,
                transform: "scale(1)",
              }}
            />
          ))}
        </Box>

        {/* Mobile carousel */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <MobileCarousel
            mainSrc={item.image_url}
            hoverSrc={item.hover_image}
            alt={item.product_name}
          />
        </Box>

        {/* Label chip (if any) */}
        {item.label && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 0,
              zIndex: 3,
              bgcolor: "#ff2d74",
              color: "#fff",
              px: 1.2,
              py: 0.25,
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              borderRadius: "0 10px 10px 0",
              boxShadow: "2px 2px 8px rgba(255,45,116,0.35)",
              animation: `${badgeSlide} 0.4s ease both`,
              animationDelay: `${index * 0.07 + 0.3}s`,
            }}
          >
            {item.label}
          </Box>
        )}

        {/* Discount badge top-right */}
        {discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 18,
              zIndex: 3,
              bgcolor: "#fff",
              border: "1.5px solid #ff2d74",
              color: "#ff2d74",
              px: 0.9,
              py: 0.2,
              fontSize: "0.6rem",
              fontWeight: 800,
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              boxShadow: "0 2px 8px rgba(255,45,116,0.2)",
            }}
          >
            <LocalOfferOutlinedIcon sx={{ fontSize: "0.6rem" }} />
            {discount}%
          </Box>
        )}
      </Box>

      {/* ── Card body ── */}
      <Box
        sx={{
          px: 1.5,
          pt: 1.2,
          pb: 0.8,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Brand */}
        <Box display="flex" alignItems="center" gap={0.4} mb={0.5}>
          <VerifiedIcon sx={{ fontSize: "0.65rem", color: "#3b82f6" }} />
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: "#9ca3af",
              fontWeight: 600,
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            Kudanthai Trends
          </Typography>
        </Box>

        {/* Name */}
        <Typography
          title={item.product_name}
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "#111827",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "1.8em",
          }}
        >
          {item.product_name}
        </Typography>

        {/* Stars */}
        <Stack direction="row" alignItems="center" spacing={0.5} mb={0.8}>
          <Rating
            value={item.rating || 0}
            precision={0.5}
            size="small"
            readOnly
            sx={{
              fontSize: "0.8rem",
              "& .MuiRating-iconFilled": { color: "#f59e0b" },
              "& .MuiRating-iconEmpty": { color: "#e5e7eb" },
            }}
          />
          <Typography
            sx={{ fontSize: "0.62rem", color: "#9ca3af", fontWeight: 600 }}
          >
            ({item.rating || 0})
          </Typography>
        </Stack>

        {/* Price block */}
        <Box
          sx={{
            bgcolor: "#fdf3f6",
            border: "1px solid rgba(255,45,116,0.1)",
            borderRadius: "10px",
            px: 1.2,
            py: 0.8,
            mb: 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={0.8}
            flexWrap="wrap"
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                color: "#ff2d74",
                lineHeight: 1,
              }}
            >
              ₹{item.product_price?.toLocaleString("en-IN")}
            </Typography>
            {item.strikeout_price && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  fontSize: "0.73rem",
                  color: "#c4c4c4",
                  fontWeight: 500,
                }}
              >
                ₹{item.strikeout_price?.toLocaleString("en-IN")}
              </Typography>
            )}
          </Stack>
          {savings > 0 && (
            <Box display="flex" alignItems="center" gap={0.4} mt={0.3}>
              <AutoAwesomeIcon sx={{ fontSize: "0.6rem", color: "#16a34a" }} />
              <Typography
                sx={{ fontSize: "0.62rem", color: "#16a34a", fontWeight: 700 }}
              >
                Save ₹{savings}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Add to Cart ── */}
      <Box sx={{ px: 1.5, pb: 1.5, mt: "auto" }}>
        <Button
          fullWidth
          onClick={handleCart}
          startIcon={
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: "0.95rem !important",
                animation: cartAnim ? `${cartJump} 0.6s ease` : "none",
              }}
            />
          }
          sx={{
            borderRadius: "50px",
            bgcolor: added ? "#16a34a" : "#ff2d74",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.75rem",
            py: 0.95,
            letterSpacing: added ? 0.8 : 0.4,
            position: "relative",
            overflow: "hidden",
            transition:
              "background-color 0.4s ease, letter-spacing 0.2s, transform 0.15s",
            boxShadow: added
              ? "0 4px 14px rgba(22,163,74,0.4)"
              : "0 4px 14px rgba(255,45,116,0.32)",
            "&:hover": {
              bgcolor: added ? "#15803d" : "#e0185f",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(255,45,116,0.45)",
            },
            "&:active": { transform: "scale(0.97)" },
          }}
        >
          {rippling && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50px",
                bgcolor: "rgba(255,255,255,0.3)",
                animation: `${rippleOut} 0.55s ease-out`,
              }}
            />
          )}
          {added ? "✓ Added!" : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = ({ index }) => (
  <Box
    sx={{
      minWidth: { xs: 195, sm: 230, md: 250 },
      borderRadius: "18px",
      overflow: "hidden",
      bgcolor: "#fff",
      flexShrink: 0,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      animation: `${fadeUp} 0.4s ease both`,
      animationDelay: `${index * 0.05}s`,
    }}
  >
    <ShimmerBox sx={{ height: { xs: 200, sm: 230 }, borderRadius: 0 }} />
    <Box sx={{ p: 1.5 }}>
      <ShimmerBox sx={{ height: 8, width: "38%", borderRadius: 4, mb: 1 }} />
      <ShimmerBox sx={{ height: 13, width: "88%", borderRadius: 4, mb: 0.6 }} />
      <ShimmerBox sx={{ height: 13, width: "65%", borderRadius: 4, mb: 1 }} />
      <ShimmerBox sx={{ height: 10, width: "45%", borderRadius: 4, mb: 1.2 }} />
      <ShimmerBox sx={{ height: 46, borderRadius: "10px", mb: 1 }} />
      <ShimmerBox sx={{ height: 36, borderRadius: "50px" }} />
    </Box>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Earrings = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    api
      .get("/api/product/earring")
      .then((res) => setProducts(res.data.data || res.data || []))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - offsetWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      updateScrollState();
      return () => el.removeEventListener("scroll", updateScrollState);
    }
  }, [products]);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 520, behavior: "smooth" });
  };

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.product_id,
        name: item.product_name,
        image: item.image_url,
        price: item.product_price,
        qty: 1,
      }),
    );
    toast.success(`${item.product_name} added to cart 🛒`, { autoClose: 2000 });
  };

  return (
    <Box>
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 3,
        }}
      >
        <Box>
          <Title title="Earrings" subtitle="Rings That Finish Your Style" />
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          {/* Desktop scroll arrows */}
          {(canScrollLeft || canScrollRight) && (
            <Stack
              direction="row"
              spacing={0.6}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <IconButton
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  border: "1.5px solid",
                  borderColor: canScrollLeft ? "#ff2d74" : "rgba(0,0,0,0.1)",
                  color: canScrollLeft ? "#ff2d74" : "#c4c4c4",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#ff2d74",
                    color: "#fff",
                    borderColor: "#ff2d74",
                  },
                  "&:disabled": { borderColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: "0.75rem" }} />
              </IconButton>
              <IconButton
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  border: "1.5px solid",
                  borderColor: canScrollRight ? "#ff2d74" : "rgba(0,0,0,0.1)",
                  color: canScrollRight ? "#ff2d74" : "#c4c4c4",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#ff2d74",
                    color: "#fff",
                    borderColor: "#ff2d74",
                  },
                  "&:disabled": { borderColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
              </IconButton>
            </Stack>
          )}

          {/* View all */}
          <Link to="category/earrings" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                color: "#ff2d74",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: 0.3,
                px: 1.5,
                py: 0.6,
                borderRadius: "50px",
                border: "1.5px solid #ff2d74",
                transition: "all 0.22s ease",
                "&:hover": {
                  bgcolor: "#ff2d74",
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(255,45,116,0.35)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              View all
              <ChevronRightIcon sx={{ fontSize: "1rem" }} />
            </Box>
          </Link>
        </Stack>
      </Box>

      {/* ── Scroll strip ── */}
      <Box sx={{ position: "relative" }}>
        {/* Left fade */}
        {canScrollLeft && (
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 60,
              zIndex: 5,
              background:
                "linear-gradient(to right, rgba(255,255,255,1), transparent)",
              pointerEvents: "none",
            }}
          />
        )}
        {/* Right fade */}
        {canScrollRight && (
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 60,
              zIndex: 5,
              background:
                "linear-gradient(to left, rgba(255,255,255,1), transparent)",
              pointerEvents: "none",
            }}
          />
        )}

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            overflowX: "auto",
            pb: 1.5,
            pt: 0.5,
            px: 0.5,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
          }}
        >
          {/* Skeletons */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}

          {/* Empty */}
          {!isLoading && products.length === 0 && (
            <Box sx={{ py: 6, textAlign: "center", width: "100%" }}>
              <Typography
                sx={{ fontSize: "1rem", color: "#9ca3af", fontWeight: 700 }}
              >
                No products found
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", color: "#d1d5db", mt: 0.5 }}
              >
                Check back soon — new styles drop weekly!
              </Typography>
            </Box>
          )}

          {/* Cards */}
          {!isLoading &&
            products.map((item, index) => (
              <ArrivalCard
                key={item.product_id}
                item={item}
                index={index}
                isWished={wishlist.includes(item.product_id)}
                onWishToggle={toggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Earrings;
