import { Box, Container, Typography, Divider, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import TopBar from "../../Component/Announcement";

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

export default function PrivacyPolicy() {
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
              <LockOutlinedIcon sx={{ color: "#fff", fontSize: 32 }} />
            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              color="#1a1a1a"
              textAlign="center"
              sx={{ fontSize: { xs: 24, md: 34 } }}
            >
              Privacy Policy
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Last updated: April 19, 2026
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
              sx={{ fontSize: { xs: 13.5, md: 15 } }}
            >
              Welcome to our website. We value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website or make a purchase from us.
            </Typography>

            <Divider sx={{ mb: 4, borderColor: "#ffe4ec" }} />

            {/* NEW SECTION ADDED */}
            <Section title="Order Process">
              Our website facilitates orders exclusively through WhatsApp integration.
              Currently, we do not offer order tracking functionality. In the latest
              version of our platform, we have enhanced the user experience and
              interface while maintaining the same product content and ordering process.
            </Section>

            <Section title="1. Information We Collect">
              We collect information such as name, phone number, email address,
              and shipping details when you contact us or place an order.
            </Section>

            <Section title="2. How We Use Your Information">
              We use your information to process orders, respond to your inquiries,
              and improve our services.
            </Section>

            <Section title="3. Sharing of Information">
              We do not sell or share your personal information with third parties
              except when required by law.
            </Section>

            <Section title="4. Cookies">
              Our website may use cookies to improve user experience and analyze
              traffic.
            </Section>

            <Section title="5. Data Security">
              We take reasonable measures to protect your personal information.
            </Section>

            <Section title="6. Your Rights">
              You may contact us to update or delete your personal information.
            </Section>

            <Section title="7. Changes to Policy">
              We may update this policy from time to time.
            </Section>

            <Section title="8. Contact Us">
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