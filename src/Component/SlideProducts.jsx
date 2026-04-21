import {
  Box,
  Typography,
  Button,
  Stack,
  Rating,
  IconButton,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import api from "../utils/api";

// ─── Constants ─────────────────────────────────────────────────────────────────
const MOBILE_LIMIT = 4;

// ─── Custom hook: track window width ──────────────────────────────────────────
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;
const heartBeat = keyframes`
  0%   { transform: scale(1); }
  25%  { transform: scale(1.45); }
  50%  { transform: scale(0.92); }
  75%  { transform: scale(1.18); }
  100% { transform: scale(1); }
`;
const ripple = keyframes`
  from { transform: scale(0); opacity: 0.5; }
  to   { transform: scale(4); opacity: 0; }
`;
const cartBounce = keyframes`
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-6px) rotate(-8deg); }
  60%  { transform: translateY(2px) rotate(4deg); }
  100% { transform: translateY(0) rotate(0); }
`;
const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;
const tabSlide = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const badgePop = keyframes`
  0%   { transform: scale(0.6); opacity: 0; }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;
const viewAllPulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255,45,116,0.3); }
  70%  { box-shadow: 0 0 0 8px rgba(255,45,116,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,45,116,0); }
`;

// ─── Shimmer skeleton ─────────────────────────────────────────────────────────
const ShimmerBox = styled(Box)({
  background: "linear-gradient(90deg, #f5f0eb 25%, #fdf8f4 50%, #f5f0eb 75%)",
  backgroundSize: "1200px 100%",
  animation: `${shimmer} 1.6s infinite linear`,
});

// ─── Category pill ────────────────────────────────────────────────────────────
const TabPill = styled(Button, {
  shouldForwardProp: (p) => p !== "isActive",
})(({ isActive }) => ({
  borderRadius: "50px",
  padding: "8px 22px",
  minWidth: "auto",
  flexShrink: 0,
  textTransform: "none",
  fontWeight: isActive ? 700 : 500,
  fontSize: "0.78rem",
  letterSpacing: isActive ? 0.6 : 0.3,
  border: "1.5px solid",
  borderColor: isActive ? "#ff2d74" : "rgba(0,0,0,0.1)",
  backgroundColor: isActive ? "#ff2d74" : "transparent",
  color: isActive ? "#fff" : "#6b7280",
  boxShadow: isActive
    ? "0 6px 20px rgba(255,45,116,0.38), inset 0 1px 0 rgba(255,255,255,0.2)"
    : "none",
  transition: "all 0.28s cubic-bezier(.34,1.56,.64,1)",
  position: "relative",
  overflow: "hidden",
  animation: `${tabSlide} 0.3s ease both`,
  "&:hover": {
    backgroundColor: isActive ? "#e8154e" : "rgba(255,45,116,0.06)",
    borderColor: "#ff2d74",
    color: isActive ? "#fff" : "#ff2d74",
    transform: "translateY(-2px)",
    boxShadow: isActive
      ? "0 8px 24px rgba(255,45,116,0.45)"
      : "0 4px 12px rgba(255,45,116,0.15)",
  },
  "&:disabled": { opacity: 0.45, transform: "none" },
}));

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
              height: 200,
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
const ProductCard = ({ item, index, isWished, onWishToggle, onAddToCart }) => {
  const [wished, setWished] = useState(isWished);
  const [heartAnim, setHeartAnim] = useState(false);
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

  const handleWish = () => {
    setWished((p) => !p);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 500);
    onWishToggle(item._id);
  };

  const handleCart = () => {
    setCartAnim(true);
    setRippling(true);
    setAdded(true);
    setTimeout(() => setCartAnim(false), 700);
    setTimeout(() => setRippling(false), 600);
    setTimeout(() => setAdded(false), 1800);
    onAddToCart(item);
  };

  return (
    <Box
      sx={{
        minWidth: { xs: 250, sm: 230, md: 280 },
        maxWidth: { xs: 195, sm: 230, md: 250 },
        flexShrink: 0,
        scrollSnapAlign: "start",
        borderRadius: "18px",
        overflow: "hidden",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        animation: `${fadeUp} 0.5s cubic-bezier(.34,1.56,.64,1) both`,
        animationDelay: `${index * 0.055}s`,
        transition:
          "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-7px)",
          boxShadow:
            "0 20px 48px rgba(255,45,116,0.14), 0 4px 12px rgba(0,0,0,0.06)",
        },
        "&:hover .quickActions": { opacity: 1, transform: "translateX(0)" },
        "&:hover .cardImg": { transform: "scale(1.04)" },
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
            overflow: "hidden",
            cursor: "zoom-in",
            "&:hover .mainImg": { opacity: 0, transform: "scale(1.06)" },
            "&:hover .hoverImg": { opacity: 1, transform: "scale(1.04)" },
          }}
        >
          {[
            { cls: "mainImg", src: item.image_url, op: 1 },
            { cls: "hoverImg", src: item.hover_image || item.image_url, op: 0 },
          ].map(({ cls, src, op }) => (
            <Box
              key={cls}
              component="img"
              src={src}
              className={cls}
              alt={item.product_name}
              sx={{
                width: "100%",
                height: { sm: 190, md: 210, lg: 220 },
                objectFit: "cover",
                display: "block",
                position: cls === "hoverImg" ? "absolute" : "static",
                top: 0,
                left: 0,
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

        {/* Discount ribbon */}
        {discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bgcolor: "#ff2d74",
              color: "#fff",
              px: 1.5,
              py: 0.4,
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              borderRadius: "0 0 12px 0",
              boxShadow: "2px 2px 8px rgba(255,45,116,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              animation: `${badgePop} 0.4s ease both`,
              animationDelay: `${index * 0.055 + 0.2}s`,
            }}
          >
            <LocalOfferOutlinedIcon sx={{ fontSize: "0.65rem" }} />
            {discount}% off
          </Box>
        )}

        {/* Wishlist button */}
        <IconButton
          onClick={handleWish}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 3,
            bgcolor: "rgba(255,255,255,0.92)",
            width: 32,
            height: 32,
            backdropFilter: "blur(6px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            transition: "all 0.2s",
            "&:hover": { bgcolor: "#fff0f5", transform: "scale(1.12)" },
            ...(heartAnim && { animation: `${heartBeat} 0.45s ease` }),
          }}
        >
          {wished ? (
            <FavoriteIcon sx={{ fontSize: 16, color: "#ff2d74" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
          )}
        </IconButton>

        {/* Quick action side panel — desktop only */}
        <Box
          className="quickActions"
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 0.6,
            position: "absolute",
            bottom: 10,
            right: 8,
            opacity: 0,
            transform: "translateX(10px)",
            transition: "all 0.3s ease",
            zIndex: 4,
          }}
        />
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
          <VerifiedIcon sx={{ fontSize: "0.68rem", color: "#3b82f6" }} />
          <Typography
            sx={{
              fontSize: "0.62rem",
              color: "#9ca3af",
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            Kudanthai Trends
          </Typography>
        </Box>

        {/* Product name */}
        <Typography
          title={item.product_name}
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.35,
            letterSpacing: 0.1,
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
            size="small"
            readOnly
            precision={0.5}
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
            borderRadius: "10px",
            px: 1.2,
            py: 0.8,
            mb: 1,
            border: "1px solid rgba(255,45,116,0.08)",
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
                fontSize: { xs: "1rem", md: "1.05rem" },
                color: "#ff2d74",
                lineHeight: 1,
              }}
            >
              ₹{item.product_price?.toLocaleString("en-IN")}
            </Typography>
            {item.strikeout_price > item.product_price && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  fontSize: "0.75rem",
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
              <AutoAwesomeIcon sx={{ fontSize: "0.65rem", color: "#16a34a" }} />
              <Typography
                sx={{ fontSize: "0.65rem", color: "#16a34a", fontWeight: 700 }}
              >
                You save ₹{savings}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Add to cart ── */}
      <Box sx={{ px: 1.5, pb: 1.5, mt: "auto" }}>
        <Button
          fullWidth
          onClick={handleCart}
          startIcon={
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: "0.95rem !important",
                transition: "all 0.3s ease",
                animation: cartAnim ? `${cartBounce} 0.6s ease` : "none",
              }}
            />
          }
          sx={{
            borderRadius: "50px",
            bgcolor: added ? "#16a34a" : "#ff2d74",
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.76rem",
            py: 0.95,
            letterSpacing: added ? 0.8 : 0.4,
            position: "relative",
            overflow: "hidden",
            transition:
              "background-color 0.4s ease, letter-spacing 0.2s ease, transform 0.15s ease",
            boxShadow: added
              ? "0 4px 14px rgba(22,163,74,0.4)"
              : "0 4px 14px rgba(255,45,116,0.3)",
            "&:hover": {
              bgcolor: added ? "#15803d" : "#e0185f",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(255,45,116,0.45)",
            },
            "&:active": { transform: "scale(0.97)" },
          }}
        >
          {/* Ripple effect */}
          {rippling && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50px",
                bgcolor: "rgba(255,255,255,0.3)",
                animation: `${ripple} 0.55s ease-out`,
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
      flexShrink: 0,
      scrollSnapAlign: "start",
      minWidth: { xs: 250, sm: "unset" },
      borderRadius: "18px",
      overflow: "hidden",
      bgcolor: "#fff",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      animation: `${fadeUp} 0.4s ease both`,
      animationDelay: `${index * 0.04}s`,
    }}
  >
    <ShimmerBox sx={{ height: { xs: 190, md: 210 }, borderRadius: 0 }} />
    <Box sx={{ p: 1.5 }}>
      <ShimmerBox sx={{ height: 8, width: "38%", borderRadius: 4, mb: 1 }} />
      <ShimmerBox sx={{ height: 13, width: "85%", borderRadius: 4, mb: 0.6 }} />
      <ShimmerBox sx={{ height: 13, width: "65%", borderRadius: 4, mb: 1 }} />
      <ShimmerBox sx={{ height: 10, width: "45%", borderRadius: 4, mb: 1.2 }} />
      <ShimmerBox sx={{ height: 48, borderRadius: "10px", mb: 1 }} />
      <ShimmerBox sx={{ height: 36, borderRadius: "50px" }} />
    </Box>
  </Box>
);

// ─── View All Button ──────────────────────────────────────────────────────────
const ViewAllButton = ({ onNavigate, totalCount, categoryName }) => {
  const hiddenCount = totalCount - MOBILE_LIMIT;

  return (
    <Box sx={{ mt: 2, animation: `${fadeUp} 0.4s ease both` }}>
      <Button
        fullWidth
        onClick={onNavigate}
        startIcon={<GridViewRoundedIcon sx={{ fontSize: "1rem !important" }} />}
        endIcon={
          <ChevronRightIcon
            sx={{ fontSize: "1.1rem !important" }}
          />
        }
        sx={{
          borderRadius: "14px",
          border: "1.5px solid #ff2d74",
          color: "#ff2d74",
          bgcolor: "transparent",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.85rem",
          py: 1.4,
          letterSpacing: 0.4,
          transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
          position: "relative",
          overflow: "hidden",
          animation: `${viewAllPulse} 2.5s ease-in-out 1.2s 2`,
          "&:hover": {
            bgcolor: "rgba(255,45,116,0.05)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(255,45,116,0.18)",
          },
          "&:active": { transform: "scale(0.98)" },
        }}
      >
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        > 
          View all {categoryName} products
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#ff2d74",
              color: "#fff",
              fontSize: "0.68rem",
              fontWeight: 800,
              borderRadius: "50px",
              px: 1,
              py: 0.2,
              minWidth: 28,
              lineHeight: 1.6,
            }}
          >
            +{hiddenCount}
          </Box>
        </Box>
      </Button>
    </Box>
  );
};

// ─── Main export ──────────────────────────────────────────────────────────────
export default function SlideProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile(600);

  const [categories, setCategories] = useState([]);
  const [activeSlug, setActiveSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Derive active category name for the button label
  const activeCategoryName =
    categories.find((c) => c.slug === activeSlug)?.category_name ?? "";

  // Products to actually render — limited on mobile
  const visibleProducts = isMobile ? products.slice(0, MOBILE_LIMIT) : products;

  const hasMoreOnMobile =
    isMobile && !isLoading && products.length > MOBILE_LIMIT;

  useEffect(() => {
    api
      .get("/api/category")
      .then(({ data }) => {
        setCategories(data);
        if (data.length > 0) setActiveSlug(data[0].slug);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeSlug) return;
    setIsLoading(true);
    setProducts([]);
    api
      .get(`/api/product/${activeSlug}`)
      .then((res) => setProducts(res.data.products))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [activeSlug]);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: String(item.product_id),
        name: item.product_name,
        image: item.image_url,
        price: item.product_price,
        originalPrice: item.strikeout_price,
        quantity: 1,
      }),
    );
    toast.success(`${item.product_name} added to cart 🛒`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <Box>
      {/* ── Tab strip ── */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          mb: { xs: 3, sm: 4 },
          pb: 0.8,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {categories.length === 0
          ? Array.from({ length: 5 }).map((_, i) => (
              <ShimmerBox
                key={i}
                sx={{
                  height: 36,
                  width: 110,
                  borderRadius: "50px",
                  flexShrink: 0,
                }}
              />
            ))
          : categories.map((cat, i) => (
              <TabPill
                key={cat._id}
                isActive={activeSlug === cat.slug}
                disabled={isLoading}
                onClick={() => setActiveSlug(cat.slug)}
                sx={{ animationDelay: `${i * 0.05}s` }}
              >
                {cat.category_name}
              </TabPill>
            ))}
      </Box>

      {/* ── Count ── */}
      {!isLoading && products.length > 0 && (
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#c4c4c4",
            mb: 2.5,
            fontWeight: 500,
            letterSpacing: 0.3,
          }}
        >
          {isMobile && products.length > MOBILE_LIMIT
            ? `Showing ${MOBILE_LIMIT} of ${products.length} items`
            : `Showing ${products.length} item${products.length !== 1 ? "s" : ""}`}
        </Typography>
      )}

      {/* ── Grid (sm+) / Horizontal Scroll (xs) ── */}
      <Box
        sx={{
          display: { xs: "flex", sm: "grid" },
          overflowX: { xs: "auto", sm: "visible" },
          scrollSnapType: { xs: "x mandatory", sm: "unset" },
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: { xs: "none", sm: "block" } },
          scrollbarWidth: { xs: "none", sm: "auto" },
          pb: { xs: 1.5, sm: 0 },
          gridTemplateColumns: {
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(6, 1fr)",
          },
          gap: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}

        {!isLoading && products.length === 0 && (
          <Box sx={{ gridColumn: "1/-1", textAlign: "center", py: 10 }}>
            <Typography
              sx={{
                fontSize: "1.05rem",
                color: "#9ca3af",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              No products found
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "#d1d5db" }}>
              Check back soon — we're restocking!
            </Typography>
          </Box>
        )}

        {!isLoading &&
          visibleProducts.map((item, index) => (
            <ProductCard
              key={item._id}
              item={item}
              index={index}
              isWished={wishlist.includes(item._id)}
              onWishToggle={toggleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
      </Box>

      {/* ── View All button (mobile only, when there are more products) ── */}
      {hasMoreOnMobile && (
        <ViewAllButton
          onNavigate={() => navigate(`/category/${activeSlug}`)}
          totalCount={products.length}
          categoryName={activeCategoryName}
        />
      )}
    </Box>
  );
}
