import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
const industryData = [
    { id: "1", img: "Images/mpi/img1.png" },
    { id: "2", img: "Images/mpi/img2.png" },
    { id: "3", img: "Images/mpi/img3.png" },
    { id: "4", img: "Images/mpi/img4.png" },
    { id: "5", img: "Images/mpi/img5.png" },
    { id: "6", img: "Images/mpi/img6.png" },
    { id: "7", img: "Images/mpi/img7.png" },
    { id: "8", img: "Images/mpi/img8.png" },
    { id: "9", img: "Images/mpi/img9.png" },
    { id: "10", img: "Images/mpi/img10.png" },
    { id: "11", img: "Images/mpi/img11.png" },
    { id: "12", img: "Images/mpi/img12.png" },
    { id: "13", img: "Images/mpi/img13.png" },
    { id: "14", img: "Images/mpi/img14.png" }
];

const MainProductSlide = () => {
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
                setSlidesPerView(3);
            }
        };

        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', alignContent: 'center', height: ['120%', '130%', '85%','85%','85%'] }}>
                <Swiper
                    slidesPerView={slidesPerView}
                    navigation={false}
                    spaceBetween={0}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        700: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        1280: {
                            slidesPerView: 3,
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
                                    width: { xs: "70%", sm: "60%", md: "60%", lg: "45%", xl: "45%" },
                                    cursor: 'pointer',
                                    transform: (index === activeIndex + Math.floor(slidesPerView / 2)) ? ['scale(1.5)', 'scale(1.5)', 'scale(1.09)'] : 'scale(0.4)',
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt='Product Iamge'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
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
                        align-items: center;
                          justify-content: center;
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
                    display:none;
                        background-color: #f5f5f7;
                        border-radius: 100%;
                        padding: 2rem;
                        height: 4rem;
                        width: 4rem;
                        color: gray;
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

export default MainProductSlide;
