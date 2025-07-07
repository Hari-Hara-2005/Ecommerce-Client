import {
    Stack,
    Link,
} from "@mui/material";

import { useState } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


function StickyWhatsapp({ link }) {

    const [isHovered, setIsHovered] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const changeNavStyle = () => {
        if (window.scrollY >= 10) {
            setIsDown(true);
        } else {
            setIsDown(false);
        }
    };
    window.addEventListener("scroll", changeNavStyle);
    // https://wa.me/5591122334455
    return (
        <>
            <Link target="_blank" href={link} underline="none" color="inherit" aria-label="whatsapp">

                <Stack
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    sx={{
                        width: ["4rem", "5rem", "5rem", "4.5rem", "5rem"],
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center",
                        height: ["4rem", "5rem", "5rem", "4.5rem", "5rem"],
                        background: "linear-gradient(91.83deg, #92553D 0%, #92553D 100%)",
                        p: [1.5, 1.5, 1.5, 1.5, 1.5],
                        position: "fixed",
                        top: "60%",
                        cursor: "pointer",
                        right: isDown ? "0px" : "-200px",
                        borderRadius: "10rem 10rem 1rem 10rem",
                        transition: ".3s ease",
                        color:'#fff',
                        boxShadow: "0px 12px 21px rgb(0 0 0 / 11%)",
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: "linear-gradient(91.83deg, #000 0%, #000 100%)",
                            opacity: isHovered ? 1 : 0, /* Change opacity based on hover */
                            transition: "opacity .2s ease", /* Transition opacity */
                            borderRadius: "10rem 10rem 1rem 10rem",
                        },
                        ":hover": {
                            boxShadow: "0px 12px 21px rgb(0 0 0 / 21%)",
                        },
                        zIndex: "300",
                    }}>
                    <WhatsAppIcon sx={{
                        height: "100%", width: "100%", color: "#fff", zIndex: "300", ":hover": {
                            color: '#fff',
                        },
                    }} />
                </Stack>
            </Link>
        </>
    );
}

export default StickyWhatsapp;