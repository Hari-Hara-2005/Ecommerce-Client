import {
  Box,
  Stack,
  Typography,
  Divider,
  Grid,
  Fab,
  Collapse,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneCallback from "@mui/icons-material/PhoneCallback";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

// ─── Mobile accordion wrapper ─────────────────────────────────────────────────
const MobileAccordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box>
      <Box
        onClick={() => setOpen((p) => !p)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.6,
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontWeight: "500",
            color: "white",
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>
        {open ? (
          <KeyboardArrowUpIcon sx={{ color: "#ff2d74", fontSize: "1.2rem" }} />
        ) : (
          <KeyboardArrowDownIcon
            sx={{ color: "rgba(255,255,255,0.4)", fontSize: "1.2rem" }}
          />
        )}
      </Box>
      <Collapse in={open}>
        <Box pb={2}>{children}</Box>
      </Collapse>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
    </Box>
  );
};

function Footer() {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/api/category");
      setCategories(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════
          DESKTOP (md+) — YOUR ORIGINAL CODE UNTOUCHED
         ═══════════════════════════════════════════════ */}
      <Box
        data-aos="fade-up"
        data-aos-duration="3000"
        sx={{ display: ["none", "none", "block"] }}
      >
        <Box sx={{ display: ["none", "none", "block"] }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: ["2.5rem", "3.5rem"],
            }}
          >
            <Box
              sx={{
                bgcolor: "black",
                width: ["8rem", "7rem", "11rem"],
                height: ["8rem", "7rem", "11rem"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                my: [-6, -9],
              }}
            >
              <Box
                component="img"
                src="/Images/KT1.png"
                alt="customer"
                sx={{
                  width: ["6rem", "8rem", "8rem"],
                  height: ["6rem", "8rem", "8rem"],
                  borderRadius: "100%",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mx: 4,
                my: 0.1,
              }}
            >
              Kudanthai
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              Trends
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mx: [2.5, 2], mt: 8 }}>
          <Grid
            container
            spacing={8}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            <Grid item xs={12} sm={6} lg={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Darasuram,
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Kumbakonam, Tamil Nadu 612001, India.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                    mt: 5,
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "sans-serif",
                    color: "white",
                    mt: 1,
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <MailIcon />
                  kudanthaitrends@gmail.com
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "sans-serif",
                    color: "white",
                    mt: 1,
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PhoneCallback />
                  +91 9500597455
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Products
                </Typography>

                <Box sx={{ mt: 2 }}>
                  {categories.map((item) => (
                    <Typography
                      key={item._id}
                      component={Link}
                      to={`/category/${item.slug}`}
                      onClick={scrollToTop}
                      sx={{
                        display: "block",
                        textDecoration: "none",
                        color: "#fff",
                        fontSize: "14px",
                        letterSpacing: 1,
                        py: 0.8,
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": {
                          color: "#ff2d74",
                        },
                      }}
                    >
                      {item.category_name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Policies & Help
                </Typography>
                <Link
                  to="/privacy-policy"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "#ff2d74" },
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Link>
                <Link
                  to="/terms-and-conditions"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "#ff2d74" },
                    }}
                  >
                    Terms & Conditions
                  </Typography>
                </Link>
                <Link
                  to="/shipping-policy"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "#ff2d74" },
                    }}
                  >
                    Shipping Policy
                  </Typography>
                </Link>
                <Link
                  to="/return-exchange"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "#ff2d74" },
                    }}
                  >
                    Return/ Exchange
                  </Typography>
                </Link>
                <Link
                  to="/return-products"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "#ff2d74" },
                    }}
                  >
                    Return Products
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Follow Us
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Fab
                    component="a"
                    href="https://wa.me/9500597455"
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "#ff2d74", color: "white" },
                    }}
                  >
                    <WhatsAppIcon />
                  </Fab>
                  <Fab
                    component="a"
                    href="https://www.instagram.com/kudanthaitrends?igsh=czFpdDgydjZobGE2"
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "#ff2d74", color: "white" },
                    }}
                  >
                    <InstagramIcon />
                  </Fab>
                  <Fab
                    component="a"
                    href="https://www.facebook.com/share/17ZZCgpt4u/"
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "#ff2d74", color: "white" },
                    }}
                  >
                    <FacebookIcon />
                  </Fab>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* ═══════════════════════════════════════════════
          MOBILE (xs, sm) — IMPROVED VERSION
         ═══════════════════════════════════════════════ */}
      <Box sx={{ display: ["block", "block", "none"] }}>
        {/* Logo — same as your original */}
        <Box sx={{ display: ["block", "block", "none"] }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: ["2.5rem", "3rem"],
            }}
          >
            <Box
              sx={{
                bgcolor: "black",
                width: ["8rem", "11rem", "9rem"],
                height: ["8rem", "11rem", "9rem"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                my: [-6, -8],
              }}
            >
              <Box
                component="img"
                src="/Images/KT1.png"
                alt="customer"
                sx={{
                  width: ["6rem", "8rem", "10.5rem"],
                  height: ["6rem", "8rem", "10.5rem"],
                  borderRadius: "100%",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", pt: 2 }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mx: 4,
                my: 0.1,
              }}
            >
              Kudanthai
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              Trends
            </Typography>
          </Box>
        </Box>

        {/* Social icons row — always visible on mobile */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 3,
            mb: 1,
          }}
        >
          <Fab
            component="a"
            href="https://wa.me/9500597455"
            size="small"
            sx={{
              backgroundColor: "white",
              color: "#282828",
              "&:hover": { backgroundColor: "#ff2d74", color: "white" },
            }}
          >
            <WhatsAppIcon />
          </Fab>
          <Fab
            component="a"
            href="https://www.instagram.com/kudanthaitrends?igsh=czFpdDgydjZobGE2"
            size="small"
            sx={{
              backgroundColor: "white",
              color: "#282828",
              "&:hover": { backgroundColor: "#ff2d74", color: "white" },
            }}
          >
            <InstagramIcon />
          </Fab>
          <Fab
            component="a"
            href="https://www.facebook.com/share/17ZZCgpt4u/"
            size="small"
            sx={{
              backgroundColor: "white",
              color: "#282828",
              "&:hover": { backgroundColor: "#ff2d74", color: "white" },
            }}
          >
            <FacebookIcon />
          </Fab>
        </Box>

        {/* Accordion sections */}
        <Box sx={{ px: ["1rem", "2.2rem"], pt: 3 }}>
          {/* Address & Contact */}
          <MobileAccordion title="Address & Contact" defaultOpen={true}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontFamily: "sans-serif",
                  color: "white",
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <LocationOnIcon
                  sx={{
                    fontSize: "1.1rem",
                    mt: 0.2,
                    color: "#ff2d74",
                    flexShrink: 0,
                  }}
                />
                Darasuram, Kumbakonam, Tamil Nadu 612001, India.
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontFamily: "sans-serif",
                  color: "white",
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <MailIcon sx={{ fontSize: "1.1rem", color: "#ff2d74" }} />
                kudanthaitrends@gmail.com
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontFamily: "sans-serif",
                  color: "white",
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PhoneCallback sx={{ fontSize: "1.1rem", color: "#ff2d74" }} />
                +91 9500597455
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontFamily: "sans-serif",
                  color: "white",
                  letterSpacing: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: "1.1rem", color: "#ff2d74" }} />
                Mon – Sat: Opens 24hrs
              </Typography>
            </Box>
          </MobileAccordion>

          {/* About / Overview */}
          <MobileAccordion title="About Us">
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <InfoOutlinedIcon
                sx={{
                  fontSize: "1rem",
                  color: "#ff2d74",
                  mt: 0.3,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  color: "white",
                  letterSpacing: 0.5,
                  lineHeight: 1.8,
                }}
              >
                Kudanthai Trends is a trusted online fashion store based in
                Kumbakonam, Tamil Nadu. We offer a curated collection of girls’
                fancy items including earrings, accessories, and trendy fashion
                pieces — blending style with affordability. We ship across
                Tamilnadu.
              </Typography>
            </Box>
          </MobileAccordion>

          {/* Products */}
          <MobileAccordion title="Products">
            <Box>
              {categories.map((item) => (
                <Typography
                  key={item._id}
                  component={Link}
                  to={`/category/${item.slug}`}
                  onClick={scrollToTop}
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "#fff",
                    fontSize: "14px",
                    letterSpacing: 1,
                    py: 0.8,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { color: "#ff2d74" },
                  }}
                >
                  {item.category_name}
                </Typography>
              ))}
            </Box>
          </MobileAccordion>

          {/* Policies & Help */}
          <MobileAccordion title="Policies & Help">
            <Box>
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms-and-conditions", label: "Terms & Conditions" },
                { to: "/shipping-policy", label: "Shipping Policy" },
                { to: "/return-exchange", label: "Return/ Exchange" },
                { to: "/return-products", label: "Return Products" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      py: 0.6,
                      "&:hover": { color: "#ff2d74" },
                    }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </MobileAccordion>
        </Box>
      </Box>

      {/* ═══════════════════════════════════════════════
          BOTTOM BAR — your original, all breakpoints
         ═══════════════════════════════════════════════ */}
      <Stack sx={{ width: "100%", gap: 3, pt: 8, pb: 3 }}>
        <Stack
          direction={"column"}
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <Typography
            color={"inherit"}
            underline="hover"
            sx={{
              fontSize: ["1rem", ".75rem", "12px", "15px", "1.3rem"],
              color: "#f6f6f6",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Kudanthai Trends. All Rights Reserved.
          </Typography>
          <Typography
            variant="body2"
            color="GrayText"
            style={{ marginTop: "1rem" }}
          >
            Designed & Developed by{"  "}
            <a
              href="https://deltainfo-eight.vercel.app/"
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              Delta Info
            </a>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default Footer;
