import { Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const textAni = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
};

function Title({ children, firstLetter, color }) {
    return (
        <Typography
            className="title-txt"
            component={motion.p}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.9 }}
            transition={{ staggerChildren: 0.5 }}
            variants={textAni}
            sx={{
                fontSize: ["2rem", "2.8rem", "3rem", "3.5rem"],
                fontWeight: "800",
                textAlign: 'center',
                fontFamily: "'Work Sans', sans-serif !important",
                width: "fit-content",
                margin: 0,
                padding: 0,
                lineHeight: 1.2,
                color: color || 'black', // Default to black if color prop is not provided
            }}
        >
            <Typography
                component="span"
                sx={{
                    fontSize: ["3rem", "3.5rem", "4.4rem", "5rem"],
                    fontWeight: "800",
                    fontFamily: "'Work Sans', sans-serif !important",
                    lineHeight: "normal",
                    display: "inline",
                    color: color || 'black',
                }}
            >
                {firstLetter}
            </Typography>
            {children}
        </Typography>
    );
}

export default Title;
