import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  Stack,
  useScrollTrigger,
  Slide,
  CssBaseline,
  Badge,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api";
const drawerWidth = 240;

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const ScrollToTop = () => {
  window.scrollTo(0, 0);
};

export default function Navbar(props) {
  const cartItems = useSelector((state) => state.cart.items);
  const { color } = props;

  const [isDown, setIsDown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productMenuItems, setItem] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/api/category");
      setItem(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsDown(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [{ link: "/", name: "Home" }, { name: "Product" }];

  // ─── Mobile Drawer ─────────────────────────────────────────────────────────
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Link to="/" onClick={handleDrawerToggle}>
          <Box
            component="img"
            src="/Images/KT1.png"
            alt="Logo"
            sx={{
              width: "3.2rem",
              height: "3.2rem",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Link>

        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Nav Links */}
      <List sx={{ px: 2, pt: 2, flex: 1, overflowY: "auto" }}>
        {/* Home */}
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => {
            handleDrawerToggle();
            ScrollToTop();
          }}
        >
          <ListItem
            sx={{
              borderRadius: "10px",
              mb: 0.5,
              transition: "all 0.2s",
              "&:hover": { bgcolor: "rgba(255,45,116,0.12)" },
            }}
          >
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#fff",
                    letterSpacing: 0.5,
                  }}
                >
                  Home
                </Typography>
              }
            />
          </ListItem>
        </Link>

        {/* Products section label */}
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.7rem",
            color: "#ff2d74",
            letterSpacing: 2,
            textTransform: "uppercase",
            px: 2,
            pt: 2,
            pb: 1,
          }}
        >
          Products
        </Typography>

        {/* All categories listed flat — no accordion */}
        {productMenuItems.map((menuItem, index) => (
          <Link
            to={`/category/${menuItem.slug}`}
            key={menuItem._id || index}
            style={{ textDecoration: "none" }}
            onClick={() => {
              handleDrawerToggle();
              ScrollToTop();
            }}
          >
            <ListItem
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "rgba(255,45,116,0.12)",
                  pl: 3,
                },
              }}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: 0.4,
                    }}
                  >
                    {menuItem.category_name}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>

      {/* Drawer Footer — Cart CTA */}
      <Box sx={{ px: 3, pb: 4 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />
        <Button
          href="/cart"
          fullWidth
          variant="contained"
          startIcon={
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          }
          sx={{
            bgcolor: "#ff2d74",
            color: "#fff",
            borderRadius: "12px",
            py: 1.4,
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 4px 20px rgba(255,45,116,0.4)",
            "&:hover": { bgcolor: "#d4235f" },
          }}
        >
          Go To Cart ({cartItems.length})
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <CssBaseline />

      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: isDown ? "transparent" : "#ff2d74",
            px: [0, 1, 3],
            boxShadow: 0,
            pt: isDown ? 0 : 8,
            transition: "all 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              py: [0, 1.5, 3],
              color: isDown ? "#000" : color,
              bgcolor: isDown ? "rgba(255,255,255,.6)" : null,
              backdropFilter: isDown ? "blur(25px)" : null,
              borderRadius: isDown
                ? ["0 0 .7rem .7rem", "0 0 1.5rem 1.5rem"]
                : null,
              boxShadow: isDown ? 3 : null,
              justifyContent: "space-between",
            }}
          >
            {/* ── Mobile View ─────────────────────────────────────────────── */}
            <Stack
              direction="row"
              sx={{
                display: ["flex", "flex", "none"],
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link to="/" onClick={ScrollToTop}>
                <Box
                  component="img"
                  src="/Images/KT1.png"
                  alt="Logo"
                  sx={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                    p: 0.5,
                  }}
                />
              </Link>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton
                  component="a"
                  href="/cart"
                  sx={{
                    color: isDown ? "#000" : "#fff",
                    transition: "color 0.3s",
                  }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: isDown ? "#000" : "#fff",
                    transition: "color 0.3s",
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Stack>

            {/* ── Desktop Logo ─────────────────────────────────────────────── */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <ImageListItem
                sx={{ my: -5, display: { xs: "none", md: "block" } }}
              >
                <Box
                  component="img"
                  src="/Images/KT1.png"
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "100%",
                    p: 2,
                  }}
                />
              </ImageListItem>
            </Link>

            {/* ── Desktop Menu ─────────────────────────────────────────────── */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "2rem" }}>
              {navItems.map((item, index) =>
                item.name === "Product" ? (
                  productMenuItems.map((menuItem, i) => (
                    <Button
                      key={menuItem._id || i}
                      component={Link}
                      to={`/category/${menuItem.slug}`}
                      onClick={ScrollToTop}
                      sx={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: isDown ? "#000" : color,
                        textTransform: "none",
                      }}
                    >
                      {menuItem.category_name}
                    </Button>
                  ))
                ) : (
                  <Button
                    key={index}
                    component={Link}
                    to={item.link}
                    onClick={ScrollToTop}
                    sx={{
                      fontSize: 17,
                      fontWeight: "600",
                      color: isDown ? "#000" : color,
                      textTransform: "none",
                    }}
                  >
                    {item.name}
                  </Button>
                ),
              )}

              <Button
                href="/cart"
                variant="outlined"
                startIcon={
                  <Badge
                    badgeContent={cartItems.length}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#fff",
                        color: "#000",
                      },
                    }}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                }
                sx={{
                  textTransform: "none",
                  borderRadius: "50px",
                  px: 2.5,
                  background: "#ff2d74",
                  borderWidth: "2px",
                  borderColor: "#fff",
                  color: "#fff",
                  "&:hover": {
                    borderColor: "#fff",
                    background: "#ff2d74",
                    borderWidth: "2px",
                  },
                }}
              >
                Go To Cart
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar />

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      <Box
        component="nav"
        sx={{
          display: { xs: "block", md: "none" },
          width: { sm: drawerWidth },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              background: "linear-gradient(160deg, #1a1a1a 0%, #0f0f0f 100%)",
              boxShadow: "none",
              pt: 6,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
