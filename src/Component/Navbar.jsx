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
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
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
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [productMenuItems, setItem] = useState([]);
  const fetchData = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      const { data } = await api.get("/api/category");
      setItem(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      console.log("API base URL:", process.env.REACT_APP_API_BASE_URL);
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

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { link: "/", name: "Home" },
    { name: "Product" },
    { link: "/about", name: "About" },
    { link: "/contact", name: "Contact Us" },
  ];

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
          )
        )}
      </List>
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{ backgroundColor: "transparent", px: [0, 1, 3], boxShadow: 0 }}
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
                    alt="logo"
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
                  alt="logo"
                />
              </ImageListItem>
            </Link>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "2rem" }}>
              {navItems.map((item, index) =>
                item.name === "Product" ? (
                  <Box key={index}>
                    <Button
                      onClick={handleDropdownClick}
                      sx={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: isDown ? "#000" : color,
                        textTransform: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openDropdown}
                      onClose={handleDropdownClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: "10px",
                          background: "#fff",
                          p: 0.5,
                          fontSize: 17,
                          fontWeight: "600",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          width: "13rem",
                          border: "3.5px solid #92553D",
                        },
                      }}
                    >
                      {productMenuItems.map((menuItem, i) => (
                        <MenuItem
                          key={menuItem._id || i}
                          component={Link}
                          to={`/category/${menuItem.slug}`}
                          onClick={() => {
                            handleDropdownClose();
                            ScrollToTop();
                          }}
                          sx={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#000",
                          }}
                        >
                          {menuItem.category_name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
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
                )
              )}
              <Button
                href="/cart"
                variant="contained"
                startIcon={
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                }
                sx={{
                  bgcolor: "#92553D",
                  textTransform: "none",
                  borderRadius: "50px",
                  px: 2.5,
                  "&:hover": { bgcolor: "#282828" },
                }}
              >
                Go To Cart
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar />

      {/* Drawer (Mobile) */}
      <Box
        component="nav"
        sx={{
          display: { xs: "block", md: "none" },
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
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
              boxSizing: "border-box",
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
