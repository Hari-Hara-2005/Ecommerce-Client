import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";

const industryData = [
    { id: "1", img: "Images/ProductsImages/overview images/almond.jpeg", title: "Almond", link: '/nuts' },
    { id: "2", img: "Images/ProductsImages/overview images/cashew.webp", title: "Cashew", link: '/nuts' },
    { id: "3", img: "Images/ProductsImages/overview images/raisin.jpeg", title: "Raisin", link: '/nuts' },
    { id: "4", img: "Images/ProductsImages/overview images/wallnut.png", title: "Wallnut", link: '/nuts' },
    { id: "5", img: "Images/ProductsImages/overview images/pistachios.jpg", title: "Pistachios", link: '/nuts' },
    { id: "6", img: "Images/ProductsImages/overview images/dates.jpeg", title: "Dates", link: '/dates' },
];

const IndustryCarousel = () => {
    const ScrollToTop = () => {
        window.scrollTo(0, 0)
    }
    const [activeIndex, setActiveIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth >= 1700) {
                setSlidesPerView(3);
            } else if (window.innerWidth >= 1280) {
                setSlidesPerView(3);
            } else if (window.innerWidth >= 700) {
                setSlidesPerView(3);
            } else {
                setSlidesPerView(1.340);
            }
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    const getBoxShadowColor = (index) => {
        const colors = ['red', 'blue', 'yellow', 'green', 'purple'];
        return colors[index % colors.length];
    };

    return (
        <>
            <Box sx={{ width: '100%', height: ["25rem", "30rem", "40rem", "40rem", "40rem"], pt: 5 }}>
                <Swiper
                    slidesPerView={slidesPerView}
                    navigation={true}
                    centeredSlides={true}
                    spaceBetween={20}
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="mySwiper"
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        700: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        1280: {
                            slidesPerView: 3    ,
                            centeredSlides: false,
                        },
                        1700: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                    }}
                >
                    {industryData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: { xs: "91%", sm: "85%", md: "90%", lg: "90%", xl: "88%" },
                                    height: { xs: "15rem", sm: "18rem", md: "25rem", lg: "20rem", xl: "25rem" },
                                    borderRadius: "8px",
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transform: (index === activeIndex + Math.floor(slidesPerView / 2)) ? 'scale(1.20)' : 'scale(1)',
                                    transition: 'transform 0.3s ease',
                                    boxShadow: (index === activeIndex + Math.floor(slidesPerView / 2)) ? `0px 4px 20px ${getBoxShadowColor(index)}` : 'none',
                                }}
                            >
                                <Link to={item.link} onClick={ScrollToTop}>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '100%',
                                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                                            color: '#fff',
                                            textAlign: 'center',
                                            p: 1,
                                        }}
                                    >
                                        <Typography sx={{ fontSize: ['1rem'] }}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </Link>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
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

                    .swiper-button-next,
                    .swiper-button-prev {
                        background-color: #f5f5f7;
                        border-radius: 100%;
                        padding: 2rem;
                        height: 4rem;
                        width: 4rem;
                        color: gray;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .swiper-button-next:after {
                        font-size: 1.5rem;
                        font-weight: 900;
                        text-align: center;
                        margin-left: 6.5px;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                        -webkit-text-stroke: 3px gray;
                        text-stroke: 3px #F44247;
                    }

                    .swiper-button-prev:after {
                        font-size: 1.5rem;
                        font-weight: 900;
                        text-align: center;
                        margin-left: -5px;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                        -webkit-text-stroke: 3px gray;
                        text-stroke: 3px #F44247;
                    }

                    @media (max-width: 800px) {
                        .swiper-button-next,
                        .swiper-button-prev {
                            display:none;
                            padding: 1rem;
                            height: 2rem;
                            width: 2rem;
                        }

                        .swiper-button-next:after {
                            font-size: 1rem;
                            margin-left: 0.3rem;
                            -webkit-text-stroke: 0.1125rem #F44247;
                            text-stroke: 0.1125rem #F44247;
                        }

                        .swiper-button-prev:after {
                            font-size: 1rem;
                            margin-left: -0.5rem;
                            -webkit-text-stroke: 0.1125rem #F44247;
                            text-stroke: 0.1125rem #F44247;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default IndustryCarousel;
