import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function CusAccordion({ head, body, display, lastChild }) {
    return (


        <Box

            sx={{

                width: "100%",
                "& .MuiPaper-root.MuiAccordion-root": {
                    borderTop: "none",
                    borderRadius: 0,
                    bgcolor: 'transparent',
                    borderBottom: '.5px solid #f5f5f52a',
                    color: '#fff'
                },
                "& .MuiPaper-root.MuiAccordion-root.Mui-expanded": {
                    boxShadow: "none",
                    borderTop: "none",
                    borderBottom: lastChild ? "none" : "",
                    borderRadius: 0,
                    color: "#fff",
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
                    color: "#F5F5F57A",
                }, "& .MuiAccordionSummary-expandIconWrapper": {
                    background: "transparent",
                    color: "#F5F5F57A",
                },
                display: display,
                flexDirection: "column",
                gap: 1,
            }}
        >
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color='inherit' />}
                    aria-controls={`panel1a-content`}
                    id={`panel1a-header`}
                >
                    {head}
                </AccordionSummary>
                <AccordionDetails>
                    {body}
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default CusAccordion