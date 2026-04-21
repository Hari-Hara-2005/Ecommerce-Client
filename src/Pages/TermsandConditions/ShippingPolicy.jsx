import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Navbar from "../../Component/Navbar";
import TopBar from "../../Component/Announcement";
import Footer from "../../Component/Footer";

const Section = ({ title, children }) => (
  <Box mb={5}>
    <Typography variant="h6" fontWeight={700} color="#ff2d74" mb={1.5}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" lineHeight={1.9}>
      {children}
    </Typography>
  </Box>
);

const InfoCard = ({ label, value }) => (
  <Paper
    elevation={0}
    sx={{
      border: "1.5px solid #ffe4ec",
      borderRadius: 3,
      p: 2.5,
      textAlign: "center",
      flex: 1,
      minWidth: "45%",
    }}
  >
    <Typography fontWeight={700} color="#ff2d74" fontSize={20}>
      {value}
    </Typography>
    <Typography fontSize={12} color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

export default function ShippingPolicy() {
  return (
    <>
      <TopBar />
      <Navbar color="#fff" />

      <Box sx={{ bgcolor: "#fff8fa", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="md">
          {/* Header */}
          <Stack alignItems="center" mb={6}>
            <Box
              sx={{
                bgcolor: "#ff2d74",
                borderRadius: "50%",
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <LocalShippingOutlinedIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

            <Typography variant="h4" fontWeight={800}>
              Shipping Policy
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Last updated: April 19, 2026
            </Typography>
          </Stack>

          {/* Quick Info */}
          <Stack direction="row" flexWrap="wrap" gap={2} mb={5}>
            <InfoCard label="Delivery Time" value="3–5 Days" />
            <InfoCard label="Free Shipping Above" value="₹499" />
            <InfoCard label="Minimum Order" value="₹100" />
            <InfoCard label="Payment Mode" value="Online Only" />
          </Stack>

          {/* Content */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 4,
              p: 4,
              boxShadow: "0 4px 30px rgba(255,45,116,0.07)",
            }}
          >
            <Typography mb={4} color="text.secondary">
              This Shipping Policy explains how orders are processed and
              delivered. Please read carefully before placing an order.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Section title="1. Order Process">
              Orders are placed exclusively through WhatsApp integration. After
              selecting products, you will be redirected to WhatsApp to confirm
              your order.
              <br />
              <br />
              We do not provide order tracking functionality. All updates will
              be communicated via WhatsApp.
            </Section>

            <Section title="2. Minimum Order Requirement">
              Orders can be placed only when the subtotal amount is above
              <strong> ₹100</strong>. The purchase option will not be available
              below this amount.
            </Section>

            <Section title="3. Delivery Time">
              Orders are typically delivered within{" "}
              <strong>3–5 business days</strong>
              after confirmation.
              <br />
              <br />
              Delivery time may vary slightly based on location and
              availability.
            </Section>

            <Section title="4. Shipping Charges">
              • Orders above ₹499 — <strong>Free Shipping</strong>
              <br />• Orders below ₹499 — Shipping charges may apply and will be
              communicated via WhatsApp during order confirmation.
            </Section>

            <Section title="5. Payment Method">
              • Only <strong>online payments</strong> are accepted.
              <br />
              • Payment details will be shared through WhatsApp after order
              confirmation.
              <br />• Cash on Delivery (COD) is <strong>
                not available
              </strong>{" "}
              in this version.
            </Section>

            <Section title="6. No Tracking Availability">
              Currently, we do not provide tracking features. Customers will
              receive order updates directly via WhatsApp communication.
            </Section>

            <Section title="7. Contact">
              📧 Email: <strong>kudanthaitrends@gmail.com</strong>
              <br />
              📞 Phone: <strong>+91 95005 97455</strong>
              <br />
              📍 Location: <strong>Kumbakonam, Tamil Nadu, India</strong>
            </Section>
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "black", px: 2 }}>
        <Footer />
      </Box>
    </>
  );
}
