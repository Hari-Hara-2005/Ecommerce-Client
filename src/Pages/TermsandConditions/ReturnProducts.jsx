import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  Alert,
} from "@mui/material";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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

export default function ReturnProducts() {
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
              <InventoryOutlinedIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

            <Typography variant="h4" fontWeight={800}>
              Return Products
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Important information regarding returns
            </Typography>
          </Stack>

          {/* ❌ MAIN NOTICE */}
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
            <strong>No Return Policy:</strong> We do NOT accept returns or
            exchanges in this version. All purchases are final.
          </Alert>

          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 4,
              p: 4,
              boxShadow: "0 4px 30px rgba(255,45,116,0.07)",
            }}
          >
            <Typography mb={4} color="text.secondary">
              Our website currently operates through WhatsApp-based order
              processing. Please review your order carefully before confirming,
              as we do not offer return or exchange options.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Section title="1. No Return & No Exchange">
              • All sales are final.
              <br />
              • Products cannot be returned once delivered.
              <br />
              • We do not accept exchange requests for size, color, or variant.
            </Section>

            <Section title="2. Customer Responsibility">
              Before placing an order, customers must:
              <br />
              • Verify product details carefully
              <br />
              • Confirm quantity and pricing
              <br />
              • Check images and descriptions
              <br />
              • Ensure correct delivery details
            </Section>

            <Section title="3. In Case of Issues">
              If you receive a damaged or incorrect product:
              <br /><br />
              • Contact us via WhatsApp within <strong>24 hours</strong>
              <br />
              • Share clear photos/videos of the issue
              <br />
              • Our team will review and assist you accordingly
            </Section>

            <Section title="4. Order Communication">
              All order confirmation, payment details, and updates are handled
              through WhatsApp only. We do not provide tracking or automated
              return systems.
            </Section>

            <Section title="5. Important Note">
              Since we do not offer returns, we strongly recommend reviewing all
              product information before placing your order. Feel free to contact
              us via WhatsApp if you have any doubts before purchasing.
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