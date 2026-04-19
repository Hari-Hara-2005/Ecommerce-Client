import { Box, Container, Typography, Divider, Stack } from "@mui/material";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import Navbar from "../../Component/Navbar";
import TopBar from "../../Component/Announcement";
import Footer from "../../Component/Footer";

const Section = ({ title, children }) => (
  <Box mb={5}>
    <Typography
      variant="h6"
      fontWeight={700}
      color="#ff2d74"
      mb={1.5}
      sx={{ fontSize: { xs: 16, md: 18 } }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      lineHeight={1.9}
      sx={{ fontSize: { xs: 13.5, md: 15 } }}
    >
      {children}
    </Typography>
  </Box>
);

export default function TermsAndConditions() {
  return (
    <>
      <TopBar />
      <Navbar color="#fff" />

      <Box sx={{ bgcolor: "#fff8fa", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
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
                boxShadow: "0 4px 20px rgba(255,45,116,0.3)",
              }}
            >
              <GavelOutlinedIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              sx={{ fontSize: { xs: 24, md: 34 } }}
            >
              Terms & Conditions
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Last updated: June 1, 2025
            </Typography>
          </Stack>

          {/* Content */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 4,
              p: { xs: 3, md: 6 },
              boxShadow: "0 4px 30px rgba(255,45,116,0.07)",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={1.9}
              mb={4}
            >
              By using our website, you agree to these Terms & Conditions.
              Please read them carefully before placing an order.
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {/* ✅ IMPORTANT NEW SECTION */}
            <Section title="1. Order Process">
              Our website is designed for browsing products and placing orders
              exclusively through WhatsApp integration. Once you select a product,
              you will be redirected to WhatsApp to complete your order.
              <br /><br />
              We do not provide order tracking functionality on our website.
              All order communication, confirmation, and updates are handled
              directly via WhatsApp.
              <br /><br />
              In our latest version, we have improved the user interface and
              overall experience while keeping the same product content and
              ordering process unchanged.
            </Section>

            <Section title="2. Products Information">
              • We strive to display accurate product details and images.
              <br />
              • Slight variations in color or appearance may occur due to lighting
              and screen differences.
              <br />
              • Product availability may change without notice.
            </Section>

            <Section title="3. Pricing">
              • All prices are listed in Indian Rupees (₹).
              <br />
              • Prices are subject to change without prior notice.
              <br />
              • Final pricing and confirmation will be shared via WhatsApp during
              order processing.
            </Section>

            <Section title="4. Orders & Confirmation">
              • Orders are confirmed only after communication through WhatsApp.
              <br />
              • We reserve the right to accept or reject any order.
              <br />
              • Customers must provide accurate details while placing orders.
            </Section>

            <Section title="5. Payments">
              • Payment instructions will be provided via WhatsApp after order confirmation.
              <br />
              • We do not process payments directly on the website.
            </Section>

            <Section title="6. Cancellation & Changes">
              • Orders can be modified or cancelled only before confirmation.
              <br />
              • Once processed, cancellations may not be possible.
            </Section>

            <Section title="7. Limitation of Liability">
              We are not responsible for any indirect or incidental damages
              arising from the use of our website or services.
            </Section>

            <Section title="8. Governing Law">
              These terms are governed by the laws of India. Any disputes will
              be subject to the jurisdiction of Tamil Nadu, India.
            </Section>

            <Section title="9. Changes to Terms">
              We may update these Terms & Conditions at any time. Continued use
              of the website means you accept the updated terms.
            </Section>

            <Section title="10. Contact">
              📧 Email: <strong>kudanthaitrends@gmail.com</strong>
              <br />
              📞 Phone: <strong>+91 95005 97455</strong>
              <br />
              🏢 Address: <strong>Kumbakonam, Tamil Nadu, India</strong>
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