import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";
import TopBar from "../../Component/Announcement";

const Section = ({ title, children }) => (
  <Box mb={5}>
    <Typography
      variant="h6"
      fontWeight={700}
      color="#ff2d74"
      mb={1.5}
    >
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" lineHeight={1.9}>
      {children}
    </Typography>
  </Box>
);

export default function ReturnExchangePolicy() {
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
              <AssignmentReturnOutlinedIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

            <Typography variant="h4" fontWeight={800}>
              Return / Exchange Policy
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Last updated: June 1, 2025
            </Typography>
          </Stack>

          {/* ❌ MAIN ALERT */}
          <Alert
            icon={<CancelOutlinedIcon />}
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 3,
              bgcolor: "#fff0f3",
              border: "1.5px solid #ff2d74",
              fontWeight: 600,
            }}
          >
            <strong>Important:</strong> In this version of our website,
            we do <strong>NOT</strong> offer any return or exchange options.
            All purchases are final.
          </Alert>

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
              Please read this policy carefully before placing your order.
              By purchasing from our website, you agree to the terms below.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Section title="1. No Return Policy">
              • We do <strong>not accept returns</strong> under any circumstances.
              <br />
              • Products once delivered cannot be returned for refund.
              <br />
              • Please ensure you review product details carefully before ordering.
            </Section>

            <Section title="2. No Exchange Policy">
              • We do <strong>not provide exchanges</strong>.
              <br />
              • Products cannot be changed for size, color, or variant.
              <br />
              • Change of mind is not accepted.
            </Section>

            <Section title="3. Order Responsibility">
              Since orders are placed via WhatsApp, customers are responsible for:
              <br />
              • Verifying product details before confirming order
              <br />
              • Checking quantity, price, and variant
              <br />
              • Providing correct delivery details
            </Section>

            <Section title="4. Damaged or Incorrect Items">
              In rare cases, if you receive a damaged or incorrect product,
              please contact us via WhatsApp within 24 hours of delivery.
              <br /><br />
              We will review the issue and provide support if applicable.
            </Section>

            <Section title="5. Order Communication">
              All order communication, confirmation, and updates are handled
              through WhatsApp only. We do not provide tracking or automated
              order systems in this version.
            </Section>

            <Section title="6. Contact">
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