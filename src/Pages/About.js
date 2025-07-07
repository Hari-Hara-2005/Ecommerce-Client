import React, { useEffect, useRef } from "react";
import Navbar from '../Component/Navbar';
import Title from '../Component/Title';
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { styled } from '@mui/system';
import { Player } from '@lordicon/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LOCK from './lock.json';
import TRUCk from './truck.json';
import QUALITY from './quality.json';
import COINS from './coins.json';
import Footer from "../Component/Footer";
import CountUp from 'react-countup';
import StickyWhatsapp from "../Component/StickyWhatsapp";
export const About = () => {
    const lockRef = useRef(null);
    const truckRef = useRef(null);
    const qualityRef = useRef(null);
    const coinsRef = useRef(null);

    useEffect(() => {
        lockRef.current?.playFromBeginning();
        truckRef.current?.playFromBeginning();
        qualityRef.current?.playFromBeginning();
        coinsRef.current?.playFromBeginning();
    }, []);

    const industryData = [
        { id: "1", img: "/Images/AboutImages/img1.jpg", title: "Nuts 1" },
        { id: "2", img: "/Images/AboutImages/img2.jpg", title: "Nuts 6" },
        { id: "3", img: "/Images/AboutImages/img3.jpg", title: "Nuts 6" },
        { id: "4", img: "/Images/AboutImages/img4.jpg", title: "Nuts 2" },
        // { id: "5", img: "/Images/aboutimage/img3.jpg", title: "Nuts 3" },
        { id: "6", img: "/Images/AboutImages/img5.jpg", title: "Nuts 4" },
        { id: "7", img: "/Images/AboutImages/img6.jpg", title: "Nuts 5" },
  
    ];

    const FeatureContainer = styled(Box)(({ theme }) => ({
        backgroundColor: '#000',
        padding: theme.spacing(2),
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
        borderRadius: theme.spacing(1),
        color: '#fff',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    }));

const FeatureItem = styled(Grid)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
    borderColor: 'rgba(255, 255, 255, 0.2)',
    '& svg': {
        color: '#f00',
        transition: 'transform 0.3s, color 0.3s',
    },
    '&:hover svg': {
        transform: 'scale(1.2)',
        color: '#fff',
    },
    '&:hover p': {
        color: '#f00',
    },
    [theme.breakpoints.down('md')]: {
        '&:nth-of-type(1), &:nth-of-type(2)': {
            borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
        },
        '&:nth-of-type(1), &:nth-of-type(3)': {
            borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        },
    },
    [theme.breakpoints.up('md')]: {
        '&:nth-of-type(1), &:nth-of-type(3)': {
            borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        },
        '&:not(:nth-of-type(4))': {
            borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        },
    },
}));


    useEffect(() => {
        document.title = "About";
    }, []);

    return (
        <>
            <StickyWhatsapp link={"https://wa.me/7339534672"} />
            <Navbar color="#000" />
            <Box component='img'
                src='Images/leaf3.avif'
                alt='leaf'
                sx={{
                    width: ["70%", "40%", "25%", "25%", "30rem"],
                    zIndex: 5,
                    ml: [-10, -10, -10, -10, -15],
                    mt: [0, -4, 0, -2.5, -5],
                    position: 'absolute',
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black', px: [2, 5, 5], zIndex: 30 }}>
                <Title color="#282828">About</Title>
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <Box sx={{ width: { xs: "91%", sm: "91%", md: "90%", lg: "95%", xl: "95%" }, height: { xs: "15rem", sm: "20rem", md: "25rem", lg: "25rem", xl: "30rem" }, borderRadius: '20px', }}>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            className="mySwiper"
                        >
                            {industryData.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: { xs: "15rem", sm: "20rem", md: "25rem", lg: "25rem", xl: "30rem" },
                                            borderRadius: "16px",
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item.img}
                                            alt={item.title}
                                            sx={{
                                                width: '100%',
                                                height: '100%',       // Ensure the image fills the height
                                                objectFit: 'cover',    // Ensure the image covers the container
                                                borderRadius: "16px",  // Match container border-radius
                                            }}
                                        />
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <style>
                            {`
                                .swiper {
                                    width: 100%;
                                    height: 100%;
                                }
                                .swiper-slide {
                                    text-align: center;
                                    font-size: 18px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    object-fit: cover;
                                }
                                .swiper-slide img {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                }
                                .swiper {
                                    margin-left: auto;
                                    margin-right: auto;
                                }
                                .swiper-pagination {
                                    bottom: 10px; /* Adjust position as needed */
                                }
                                .swiper-pagination-bullet {
                                    background: #fff; /* Default color */
                                    opacity: 1; /* Ensure bullets are visible */
                                }
                                .swiper-pagination-bullet-active {
                                    background: #92553D; /* Active bullet color */
                                }
                            `}
                        </style>
                    </Box>
                </Box>
            </Box>
            <Box sx={{}}>
                <Box sx={{ py: [10], px: [2, 5, 15, 5, 2], display: 'flex', justifyContent: 'center', flexDirection: ['column', 'row'] }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xs: "90%", sm: "90%", md: "90%", lg: "50%", xl: "30%" },
                            height: { xs: "19rem", sm: "18rem", md: "25rem", lg: "25rem", xl: "25rem" },
                        }}
                    >
                        <img
                            src="Images/smart shop 5.jpeg"
                            alt="Store Image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '3px',
                                borderTopLeftRadius: '15%',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: ['column', 'column', 'row'],
                                bgcolor: 'white',
                                color: '#fff',
                                width: ['38%', '38%', '40rem'],
                                right: ['-11%', '-11%', '-90%', '-50%', "-90%"],
                                bottom: ['5%', '5%', '-8%', '-8%', "-5%"],
                                boxShadow: 3,
                                borderRadius: '2px',
                                px: [2, 2, 5],
                                py: 2
                            }}
                        >
                            <Box sx={{
                                borderRight: ['none', 'none', '2px solid #92553D'],
                                borderBottom: ['2px solid #92553D', 'none'], px: [0, 0, 5], pb: [2, 2, 0],
                            }}>
                                <Typography variant="h6" component="div" sx={{ mb: -1, color: '#92553D', fontWeight: 600 }}>
                                    <CountUp start={0} end={11} duration={40} startOnScreen={true} />+
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ color: '#000', fontWeight: 600, fontSize: 15 }}>
                                    Stores
                                </Typography>
                            </Box>
                            <Box sx={{
                                borderRight: ['none', 'none', '2px solid #92553D'],
                                borderBottom: ['2px solid #92553D', 'none'], px: [0, 0, 5], pb: [2, 2, 0], ml: [0, 0, 4]
                            }}>
                                <Typography variant="h6" component="div" sx={{ mb: -1, color: '#92553D', fontWeight: 600, }}>
                                    <CountUp start={0} end={45000} duration={40} startOnScreen={true} />+
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ color: '#000', fontWeight: 600, fontSize: 15, lineHeight: [1.3, 1.5] }}>
                                    Happy Customers
                                </Typography>
                            </Box>
                            <Box sx={{ ml: [0, 0, 4], pt: [2, 0, 0] }}>
                                <Typography variant="h6" component="div" sx={{ mb: -1, color: '#92553D', fontWeight: 600, }}>
                                    <CountUp start={0} end={5000} duration={40} startOnScreen={true} />+
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ color: '#000', fontWeight: 600, fontSize: 15, lineHeight: [1.3, 1.5] }}>
                                    Order Delivered
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: ["100%", "100%", "100%", "40%", "25%"], px: [2, 7, 5], textAlign: 'justify' }}>
                        <Typography sx={{
                            fontSize: ['1.5rem', '1.5rem', '1.5rem'],
                            fontWeight: '600',
                            color: ' #92553D',
                            py: 1
                        }}>
                            Hey, We Aren't That Far!
                        </Typography>
                        <Typography>
                        Explore our premium selection of dry fruits, nuts, chocolates, and more. Whether you're looking for a healthy snack or a delicious treat, we offer the finest quality products to satisfy your cravings. Freshness and flavor are just a click away !                        </Typography>
                        <Typography sx={{
                            fontSize: ['1rem', '1.2rem', '1rem'],
                            fontWeight: '600',
                            color: ' #92553D',
                            py: 1
                        }}>
                            Click To Shop!
                        </Typography>
                        <Button href="/dates" variant="contained" sx={{
                            bgcolor: "#92553D", textTransform: 'none', borderRadius: '50px', px: [2.5], '&:hover': {
                                bgcolor: "#282828"
                            },
                        }}>
                            Shop Now
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ px: [2, 5], py: [0, 5] }}>
                <FeatureContainer>
                    <Grid container spacing={0} justifyContent="center">
                        <FeatureItem item xs={6} md={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Player
                                    ref={truckRef}
                                    trigger="loop"
                                    size={window.innerWidth < 600 ? 70 : 96}
                                    icon={TRUCk}
                                    colors='primary:red,secondary:white'
                                    onComplete={() => truckRef.current?.playFromBeginning()}
                                />
                            </Box>
                            <Typography>Free Shiping Purchase Upto ₹1000 </Typography>
                        </FeatureItem>
                        <FeatureItem item xs={6} md={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Player
                                    ref={lockRef}
                                    trigger="loop"

                                    size={window.innerWidth < 600 ? 70 : 96}
                                    icon={LOCK}
                                    colors='primary:red,secondary:white'
                                    onComplete={() => lockRef.current?.playFromBeginning()}
                                />
                            </Box>
                            <Typography>Pay On Delivery</Typography>
                        </FeatureItem>
                        <FeatureItem item xs={6} md={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Player
                                    ref={qualityRef}
                                    trigger="loop"

                                    size={window.innerWidth < 600 ? 70 : 96}
                                    icon={QUALITY}
                                    colors='primary:red,secondary:white'
                                    onComplete={() => qualityRef.current?.playFromBeginning()}
                                />
                            </Box>
                            <Typography>100% Quality Guaranteed</Typography>
                        </FeatureItem>
                        <FeatureItem item xs={6} md={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Player
                                    ref={coinsRef}
                                    trigger="loop"

                                    size={window.innerWidth < 600 ? 70 : 96}
                                    icon={COINS}
                                    colors='primary:red,secondary:white'
                                    onComplete={() => coinsRef.current?.playFromBeginning()}
                                />
                            </Box>
                            <Typography>Reward Points On Every Purchase</Typography>
                        </FeatureItem>
                    </Grid>
                </FeatureContainer>
            </Box>
            <Box sx={{ bgcolor: 'black', mt: 20, px: 2 }}>
                <Footer />
            </Box>
        </>
    );
};
