import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
export default function Faq() {
    const faqs = [
        {
            que: "How can I place an order?",
            ans: 'Click the "Buy" button next to your desired item to start your order on WhatsApp.'
        },
        {
            que: "How do I complete my purchase on WhatsApp?",
            ans: " Message us on WhatsApp with your order details. We accept payments via WhatsApp Pay and bank transfer."
        },
        {
            que: "How long does it take to process my order?",
            ans: "Orders are processed promptly during business hours. You'll receive confirmation and delivery details upon payment."
        },
        {
            que: "Can I track my order?",
            ans: "Yes, we provide tracking information once your order is shipped."
        },
        {
            que: " Do you ship internationally?",
            ans: "Yes, we offer international shipping. Costs and delivery times vary."
        },
        {
            que: " How can I contact customer support?",
            ans: "Reach us on WhatsApp at +91 7339534672 or through our Contact Us page."
        },
        {
            que: "What payment methods are accepted via WhatsApp?",
            ans: "We accept payments via WhatsApp Pay, bank transfer, and other convenient methods. Our team will provide payment instructions once you confirm your order details."
        },
        {
            que: "Can I modify or cancel my order?",
            ans: "Please contact us through WhatsApp as soon as possible if you need to modify or cancel your order. We'll assist you based on the order status."
        },
    ];
    const [currentFaq, setCurrentFaq] = React.useState(faqs);
    const [expand, setExpand] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = () => {
        if (expand) {
            setCurrentFaq(faqs.slice(0, 7));
            setExpand(false);
        } else {
            setCurrentFaq(faqs);
            setExpand(true);
        }
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    "& .MuiPaper-root.MuiAccordion-root": {
                        boxShadow: "0px 12px 21px rgb(0 0 0 / 5%)",
                        borderTop: "none",
                        borderRadius: '.4rem',
                        p: 1,
                        bgcolor: '#282828',
                        color: '#fff'
                    },
                    "& .MuiPaper-root.MuiAccordion-root.Mui-expanded": {
                        boxShadow: "0px 12px 21px rgb(0 0 0 / 5%)",
                        borderTop: "none",
                        borderRadius: '.4rem',
                        background: "linear-gradient(91.83deg,#212121 0%, #212121  100%)",
                        color: "#fff",
                        p: 1
                    },
                    "& .MuiPaper-root.MuiAccordion-root:before": {
                        height: 0,
                    },
                    "& .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
                        color: "#fff",
                    },
                    "& .MuiCollapse-root": {
                        color: "#fff",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        background: "transparent",
                        color: "#fff",
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                        background: "transparent",
                        color: "#fff",
                    },
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                {currentFaq.map((i, k) => (
                    <Accordion key={k} expanded={expanded === k} onChange={handleChange(k)}>
                        <AccordionSummary
                            expandIcon={expanded === k ? <CancelIcon /> : <AddCircleIcon />}
                            aria-controls={`panel1a-content-${k}`}
                            id={`panel1a-header-${k}`}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: "1rem", xl: "1.2rem" },
                                    fontWeight: 400,
                                }}
                            >
                                {i.que}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: "1rem", xl: "1.2rem" },
                                    fontWeight: 400,
                                }}
                            >
                                {i.ans}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </>
    );
}
