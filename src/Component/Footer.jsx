import {
    Box,
    Stack,
    Typography,
    Divider,
    Grid,
    Fab,
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import PhoneCallback from '@mui/icons-material/PhoneCallback';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import CusAccordion from "./CusAccordion";
import { Link } from "react-router-dom";
function Footer() {
    const overview = [
        {
            path: "/",
            name: "Home",
        },
        {
            path: "/about",
            name: "About",
        },
        {
            path: "/dates",
            name: "Product",
        },
        {
            path: "/contact-us",
            name: "Contact Us",
        },
    ];
    const nuts = [
        {
            path: "/nuts",
            name: "Almond",
        },
        {
            path: "/nuts",
            name: "Anjeer Figs",
        },
        {
            path: "/nuts",
            name: "Cashew",
        },
        {
            path: "/nuts",
            name: "Pistachios",
        },
    ];
    const dryfruits = [
        {
            path: "/dryfruits",
            name: "Black Current",
        },
        {
            path: "/dryfruits",
            name: "Dry Amla",
        },
        {
            path: "/dryfruits",
            name: "Ginger Cubes",
        },
        {
            path: "/dryfruits",
            name: "Honey Amla",
        },
    ];
    const seeds = [
        {
            path: "/seeds",
            name: "Sunflower Seeds",
        },
        {
            path: "/seeds",
            name: "Sabja Seeds",
        },
        {
            path: "/seeds",
            name: "Watermelon Seeds",
        },
        {
            path: "/seeds",
            name: "Vellari Seeds",
        },
    ];
    const dates = [
        {
            path: "/dates",
            name: "Ajwa Dates",
        },
        {
            path: "/dates",
            name: "Khimiya Dates",
        },
        {
            path: "/dates",
            name: "Medjoul Dates",
        },
        {
            path: "/dates",
            name: "Kimia Dates",
        },
    ];
    const chocolates = [
        {
            path: "/chocolates",
            name: "Twinx",
        },
        {
            path: "/chocolates",
            name: "Kinder Bueno",
        },
        {
            path: "/chocolates",
            name: "Mars",
        },
        {
            path: "/chocolates",
            name: "M&M Choco",
        },
    ];
    const drinks = [
        {
            path: "/Juice",
            name: "Redbull",
        },
        {
            path: "/Juice",
            name: "Bavaria",
        },
        {
            path: "/Juice",
            name: "Mousey",
        },
        {
            path: "/Juice",
            name: "Mousey",
        },
        {
            path: "/Juice",
            name: "Redbull Gold",
        },
        {
            path: "/Juice",
            name: "Patritti Red Wine",
        },
    ];

    const biscuits = [
        {
            path: "/biscuit",
            name: "Hello Panda",
        },
        {
            path: "/biscuit",
            name: "Kaprika Waffer",
        },
        {
            path: "/biscuit",
            name: "Lotus Biscoff",
        },
        {
            path: "/biscuit",
            name: "Tiffany Waffer",
        },
        {
            path: "/biscuit",
            name: "Waffer",
        },
    ];

    const powder = [
        {
            path: "/Powder",
            name: "Davidoff",
        },
        {
            path: "/Powder",
            name: "Milo",
        },
        {
            path: "/Powder",
            name: "Ovaltine",
        },
    ];


    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <>
            <Box data-aos="fade-up"
                data-aos-duration="3000" sx={{ display: ["none", "none", "block"] }}>
                <Box sx={{ display: ["none", "none", "block"] }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: ['2.5rem', '3.5rem'], }}>
                        <Box sx={{ bgcolor: 'black', width: ['8rem', '7rem', '11rem'], height: ['8rem', '7rem', '11rem'], display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', my: [-6, -9] }}>
                            <Box component='img' src='Images/logo.png' alt="customer" sx={{ width: ['6rem', '8rem', '8rem'], height: ['6rem', '8rem', '8rem'], borderRadius: '100%' }} />
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '600', color: 'white', letterSpacing: 1.2, textTransform: 'uppercase', mx: 4, my: 0.1 }}>Smart</Typography>
                        <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', fontWeight: '600', color: 'white', letterSpacing: 5, textTransform: 'uppercase' }}>dry fruits</Typography>
                    </Box>
                </Box>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FF6B6B" fillOpacity="1" d="M0,32L80,53.3C160,75,320,117,480,112C640,107,800,53,960,42.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
                <Box sx={{ mx: [2.5, 2], mt: 8 }}>
                    <Grid container spacing={8} justifyContent={{ xs: 'flex-start', md: 'center' }}>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Box>
                                <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '500', color: 'white', letterSpacing: 1 }}>
                                    Address
                                </Typography>
                                <Typography sx={{ fontSize: '17px', fontFamily: 'sans-serif', color: 'white', mt: 1, letterSpacing: 1 }}>
                                    31,Sarangapani East Street,
                                </Typography>
                                <Typography sx={{ fontSize: '17px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1 }}>
                                    Utchi Pillaiyar Kovil,
                                </Typography>
                                <Typography sx={{ fontSize: '17px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1 }}>
                                    Kumbakonam, Tamil Nadu 612001, India.
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '500', color: 'white', letterSpacing: 1, mt: 5 }}>
                                    Contact Us
                                </Typography>
                                <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', mt: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <MailIcon />contactsmartdryfruits@gmail.com
                                </Typography>
                                <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', mt: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneCallback />+91 7339534672
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Box>
                                <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '500', color: 'white', letterSpacing: 1.2 }}>
                                    Products
                                </Typography>
                                <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Nuts
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {nuts.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Seeds
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {seeds.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Dry Fruits
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {dryfruits.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Dates
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {dates.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Chocolates
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {chocolates.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Drinks
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {drinks.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                 <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Biscuits
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {biscuits.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                                  <CusAccordion
                                    head={
                                        <Typography
                                            sx={{
                                                fontSize: ["0.8rem"],
                                                fontWeight: 600,
                                                color: "#fff",
                                                letterSpacing: 2,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Powders
                                        </Typography>}
                                    body={
                                        <Box sx={{ mt: -2 }}>
                                            {powder.map((item, index) => (
                                                <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                    <Typography
                                                        key={index}
                                                        color="#fff"
                                                        underline="hover"
                                                        sx={{
                                                            fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                            letterSpacing: 1,
                                                            cursor: 'pointer',
                                                            py: 1,
                                                            ":hover": {
                                                                color: "gray",
                                                                textDecoration: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Typography></Link>))}
                                        </Box>
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <Box>
                                <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '500', color: 'white', letterSpacing: 1 }}>
                                    Overview
                                </Typography>
                                <Link to="/" onClick={scrollToTop} style={{ textDecoration: 'none' }} ><Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1, mt: 1, "&:hover": { color: 'lightgray' } }}>
                                    Home
                                </Typography></Link>
                                <Link to="/about" onClick={scrollToTop} style={{ textDecoration: 'none' }} ><Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1, mt: 1, "&:hover": { color: 'lightgray' } }}>
                                    About
                                </Typography></Link>
                                <Link to="/dates" onClick={scrollToTop} style={{ textDecoration: 'none' }} ><Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1, mt: 1, "&:hover": { color: 'lightgray' } }}>
                                    Product
                                </Typography></Link>
                                <Link to="/contact" onClick={scrollToTop} style={{ textDecoration: 'none' }} ><Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1, mt: 1, "&:hover": { color: 'lightgray' } }}>
                                    Contact Us
                                </Typography></Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={3}>
                            <Box>
                                <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '500', color: 'white', letterSpacing: 1 }}>
                                    Follow Us
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Fab component='a'
                                        href='https://wa.me/8220570301' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <WhatsAppIcon />
                                    </Fab>
                                    <Fab component='a'
                                        href='https://www.instagram.com/mahaslettering?igsh=b21mbmJyY2hqd2Vo' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <InstagramIcon />
                                    </Fab>
                                    <Fab component='a'
                                        href='https://www.facebook.com/mahalakshmi.shankaran.54?mibextid=ZbWKwL' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <FacebookIcon />
                                    </Fab>
                                    <Fab component='a'
                                        href='https://www.threads.net/@mahaslettering' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            shape-rendering="geometricPrecision"
                                            text-rendering="geometricPrecision"
                                            image-rendering="optimizeQuality"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            viewBox="0 0 512 512"
                                            width="25"
                                            height="25"
                                            color='#282828'
                                            backgroundColor='#fff'
                                            style={{ backgroundColor: 'transparent' }}><path d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z" /><path fill="#fff" fill-rule="nonzero" d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z" /></svg>
                                    </Fab>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
            <Box sx={{ display: ['block', 'block', 'none'] }}>
                <Box sx={{ display: ['block', 'block', 'none'] }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: ['2.5rem', '3rem'] }}>
                        <Box sx={{ bgcolor: 'black', width: ['8rem', '11rem', '9rem'], height: ['8rem', '11rem', '9rem'], display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', my: [-6, -8] }}>
                            <Box component='img' src='Images/logo.png' alt="customer" sx={{ width: ['6rem', '8rem', '10.5rem'], height: ['6rem', '8rem', '10.5rem'], borderRadius: '100%' }} />
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '18px', fontFamily: 'sans-serif', fontWeight: '600', color: 'white', letterSpacing: 1.2, textTransform: 'uppercase', mx: 4, my: 0.1 }}>Smart</Typography>
                        <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', fontWeight: '600', color: 'white', letterSpacing: 5, textTransform: 'uppercase' }}>dry fruits</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        zIndex: 25,
                        display: "flex",
                        flexDirection: "column",
                        gap: ["1rem", "1.2rem", "1.8rem", "2rem", "3rem"],
                        py: ["1rem", "1.2rem", "1.8rem", "2rem"],
                        pt: [3, 3, 7, 6],
                        px: ["0", "2.2rem", "0"],
                        color: "#fff",
                    }}
                >
                    <Stack
                        sx={{
                            columnGap: ["2rem", "2rem", "2rem", "2rem", "6rem"],
                            gap: "0rem",

                        }}
                        direction={{ xs: "column", sm: "row" }}
                        gap={{ xs: 2, sm: 3, md: 1, }}
                        flexWrap={{ sm: "wrap" }}
                        justifyContent={{
                            xs: "space-between",
                            sm: "center",
                            md: "center",
                            lg: "space-around",
                        }}
                    >



                        <CusAccordion
                            display={["flex", "flex", "none"]}
                            head={
                                <Typography
                                    sx={{
                                        fontSize: ["0.9rem"],
                                        fontWeight: 600,
                                        color: "#fff",
                                        letterSpacing: 2,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Products
                                </Typography>
                            }
                            body={
                                <>
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Nuts
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {nuts.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Seeds
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {seeds.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Dry Fruits
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {dryfruits.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Nuts
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {nuts.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Dates
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {dates.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Chocolates
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {chocolates.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                    <CusAccordion
                                        head={
                                            <Typography
                                                sx={{
                                                    fontSize: ["0.8rem"],
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    letterSpacing: 2,
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                Drinks
                                            </Typography>}
                                        body={
                                            <Box sx={{ mt: -2 }}>
                                                {drinks.map((item, index) => (
                                                    <Link to={item.path} style={{ textDecoration: 'none' }} color="#fff" onClick={scrollToTop} >
                                                        <Typography
                                                            key={index}
                                                            color="#fff"
                                                            underline="hover"
                                                            sx={{
                                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                                letterSpacing: 1,
                                                                cursor: 'pointer',
                                                                py: 1,
                                                                ":hover": {
                                                                    color: "gray",
                                                                    textDecoration: 'none'
                                                                },
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography></Link>))}
                                            </Box>
                                        }
                                    />
                                </>
                            }
                        />


                        <CusAccordion
                            display={["flex", "flex", "none"]}
                            head={
                                <Typography
                                    sx={{
                                        fontSize: ["0.9rem"],
                                        fontWeight: 600,
                                        color: "#fff",
                                        letterSpacing: 2,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Address
                                </Typography>
                            }
                            body={
                                <Box sx={{}}>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', mt: 1, letterSpacing: 1, lineHeight: 2 }}>
                                        X97F+92G, Chakrapani Sannathi Street,
                                    </Typography>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1, lineHeight: 2 }}>
                                        Karna Kollai Agraharam, Valayapettai Agraharam,
                                    </Typography>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', letterSpacing: 1, lineHeight: 2 }}>
                                        Kumbakonam, Tamil Nadu 612001, India.
                                    </Typography>
                                </Box>
                            }
                        />

                        <CusAccordion
                            display={["flex", "flex", "none"]}
                            head={
                                <Typography
                                    sx={{
                                        fontSize: ["0.9rem"],
                                        fontWeight: 600,
                                        color: "#fff",
                                        letterSpacing: 2,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Contact US
                                </Typography>
                            }
                            body={
                                <Box>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', mt: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
                                        <MailIcon />maha050108@gmail.com
                                    </Typography>
                                    <Typography sx={{ fontSize: '15px', fontFamily: 'sans-serif', color: 'white', mt: 1, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneCallback /> +91 7339534672
                                    </Typography>
                                </Box>
                            }
                        />

                        <CusAccordion
                            display={["flex", "flex", "none"]}
                            lastChild
                            head={
                                <Typography
                                    sx={{
                                        fontSize: ["0.9rem"],
                                        fontWeight: 600,
                                        color: "#fff",
                                        letterSpacing: 2,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Overview
                                </Typography>
                            }
                            body={
                                <Stack direction={{ xs: "column" }} gap={{ xs: 1.2, sm: 2 }}>
                                    {overview.slice(0, 10).map((item, index) => (
                                        <Typography
                                            key={index}
                                            component={Link}
                                            style={{ textDecoration: 'none' }}
                                            href={item.path}
                                            color={"inherit"}
                                            sx={{
                                                fontSize: [".85rem", ".85rem", "12px", "12px", ".85rem"],
                                                ":hover": {
                                                    color: "gray",
                                                    textDecoration: 'none'
                                                },
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    ))}
                                </Stack>
                            }
                        />
                        <CusAccordion
                            display={["flex", "flex", "none"]}
                            lastChild
                            head={
                                <Typography
                                    sx={{
                                        fontSize: ["0.9rem"],
                                        fontWeight: 600,
                                        color: "#fff",
                                        letterSpacing: 2,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Follows US
                                </Typography>
                            }
                            body={
                                <Box sx={{ mt: 2 }}>
                                    <Fab component='a'
                                        href='https://wa.me/8220570301' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <WhatsAppIcon />
                                    </Fab>
                                    <Fab component='a'
                                        href='https://www.instagram.com/mahaslettering?igsh=b21mbmJyY2hqd2Vo' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <InstagramIcon />
                                    </Fab>
                                    <Fab component='a'
                                        href='https://www.facebook.com/mahalakshmi.shankaran.54?mibextid=ZbWKwL' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <FacebookIcon />
                                    </Fab>
                                    <Fab component='a'
                                        href='https://www.threads.net/@mahaslettering' sx={{ backgroundColor: 'white', mx: 0.5, color: '#282828', "&:hover": { backgroundColor: 'gray' } }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            shape-rendering="geometricPrecision"
                                            text-rendering="geometricPrecision"
                                            image-rendering="optimizeQuality"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            viewBox="0 0 512 512"
                                            width="25"
                                            height="25"
                                            color='#282828'
                                            backgroundColor='#fff'
                                            style={{ backgroundColor: 'transparent' }}><path d="M105 0h302c57.75 0 105 47.25 105 105v302c0 57.75-47.25 105-105 105H105C47.25 512 0 464.75 0 407V105C0 47.25 47.25 0 105 0z" /><path fill="#fff" fill-rule="nonzero" d="M337.36 243.58c-1.46-.7-2.95-1.38-4.46-2.02-2.62-48.36-29.04-76.05-73.41-76.33-25.6-.17-48.52 10.27-62.8 31.94l24.4 16.74c10.15-15.4 26.08-18.68 37.81-18.68h.4c14.61.09 25.64 4.34 32.77 12.62 5.19 6.04 8.67 14.37 10.39 24.89-12.96-2.2-26.96-2.88-41.94-2.02-42.18 2.43-69.3 27.03-67.48 61.21.92 17.35 9.56 32.26 24.32 42.01 12.48 8.24 28.56 12.27 45.26 11.35 22.07-1.2 39.37-9.62 51.45-25.01 9.17-11.69 14.97-26.84 17.53-45.92 10.51 6.34 18.3 14.69 22.61 24.73 7.31 17.06 7.74 45.1-15.14 67.96-20.04 20.03-44.14 28.69-80.55 28.96-40.4-.3-70.95-13.26-90.81-38.51-18.6-23.64-28.21-57.79-28.57-101.5.36-43.71 9.97-77.86 28.57-101.5 19.86-25.25 50.41-38.21 90.81-38.51 40.68.3 71.76 13.32 92.39 38.69 10.11 12.44 17.73 28.09 22.76 46.33l28.59-7.63c-6.09-22.45-15.67-41.8-28.72-57.85-26.44-32.53-65.1-49.19-114.92-49.54h-.2c-49.72.35-87.96 17.08-113.64 49.73-22.86 29.05-34.65 69.48-35.04 120.16v.24c.39 50.68 12.18 91.11 35.04 120.16 25.68 32.65 63.92 49.39 113.64 49.73h.2c44.2-.31 75.36-11.88 101.03-37.53 33.58-33.55 32.57-75.6 21.5-101.42-7.94-18.51-23.08-33.55-43.79-43.48zm-76.32 71.76c-18.48 1.04-37.69-7.26-38.64-25.03-.7-13.18 9.38-27.89 39.78-29.64 3.48-.2 6.9-.3 10.25-.3 11.04 0 21.37 1.07 30.76 3.13-3.5 43.74-24.04 50.84-42.15 51.84z" /></svg>
                                    </Fab>
                                </Box>
                            }
                        />
                    </Stack>
                    <Divider />
                </Box>
            </Box>
            <Stack
                sx={{
                    width: "100%",
                    gap: 3,
                    pt: 8,
                    pb: 3
                }}
            >
                <Stack
                    direction={"column"}
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
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
                        © {new Date().getFullYear()},Smart Dry Fruits. All
                        Rights Reserved.
                    </Typography>
                    <Typography variant="body2" color="GrayText" style={{ marginTop: '1rem' }}>
                        Designed & Developed by{'  '}
                        <a href="https://harihara.vercel.app/" style={{ color: 'white', textDecoration: 'none' }}>
                           Hari Hara
                        </a>
                    </Typography>
                </Stack>
            </Stack>

        </>
    );
}

export default Footer;


