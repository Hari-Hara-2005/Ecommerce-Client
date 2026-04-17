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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CusAccordion from "./CusAccordion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api";

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

  // ✅ fetch categories
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
    setMobileOpen(!mobileOpen);
  };

  // ✅ ONLY Home + Product
  const navItems = [{ link: "/", name: "Home" }, { name: "Product" }];

  // ✅ Mobile Drawer (unchanged UI)
  const drawer = (
    <Stack direction="column">
      <Toolbar sx={{ justifyContent: "flex-end", pr: 2 }}>
        <CloseIcon sx={{ color: "#fff" }} onClick={handleDrawerToggle} />
      </Toolbar>

      <List sx={{ mt: 10, alignItems: "center", justifyContent: "center" }}>
        {navItems.map((item, index) =>
          item.name === "Product" ? (
            <Box key={index} sx={{ width: "60%", ml: 4 }}>
              <CusAccordion
                head={
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {item.name}
                  </Typography>
                }
                body={
                  <>
                    {productMenuItems.map((menuItem, menuIndex) => (
                      <Link
                        to={`/category/${menuItem.slug}`}
                        key={menuItem._id || menuIndex}
                        onClick={() => {
                          handleDrawerToggle();
                          ScrollToTop();
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            letterSpacing: 1,
                            py: 1,
                            color: "white",
                          }}
                        >
                          {menuItem.category_name}
                        </Typography>
                      </Link>
                    ))}
                  </>
                }
              />
            </Box>
          ) : (
            <Link
              to={item.link}
              key={index}
              style={{ textDecoration: "none" }}
              onClick={handleDrawerToggle}
            >
              <ListItem button sx={{ color: "#fff" }}>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          ),
        )}
      </List>
    </Stack>
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
            {/* Mobile View */}
            <Stack
              direction="row"
              sx={{
                display: ["flex", "flex", "none"],
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Link to="/">
                <ImageListItem>
                  <Box
                    component="img"
                    src="Images/logo.png"
                    sx={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "100%",
                      p: 1.3,
                    }}
                  />
                </ImageListItem>
              </Link>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button href="/cart" color="inherit">
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </Button>

                <IconButton onClick={handleDrawerToggle} color="inherit">
                  <MenuIcon />
                </IconButton>
              </Box>
            </Stack>

            {/* Desktop Logo */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <ImageListItem
                sx={{ my: -5, display: { xs: "none", md: "block" } }}
              >
                <Box
                  component="img"
                  src="Images/logo.png"
                  sx={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "100%",
                    p: 2,
                  }}
                />
              </ImageListItem>
            </Link>

            {/* ✅ Desktop Menu (INLINE CATEGORIES) */}
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

              {/* Cart Button (unchanged) */}
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

      {/* Drawer */}
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
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              background:
                "linear-gradient(180.83deg, #181818 0%, #181818 100%)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
