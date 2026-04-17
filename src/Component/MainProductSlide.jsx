import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Swiper modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import api from "../api";

const MainProductSlide = () => {
  const [banners, setBanner] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/banner");
      setBanner(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "200px",
            sm: "300px",
            md: "400px",
            lg: "730px",
          },
          overflow: "hidden",
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true, // 🔥 sliding feel
          }}
          className="mySwiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box sx={{ width: "100%", height: "100%" }}>
                <img
                  src={banner.image_url}
                  alt="Banner"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
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
            display: flex;
            justify-content: center;
            align-items: center;
          }

          /* 🔥 Navigation Arrows */
          .swiper-button-next,
          .swiper-button-prev {
            color: #000;
            background: rgba(255,255,255,0.7);
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px;
            font-weight: bold;
          }

          /* 🔥 Sliding Pagination Effect */
          .swiper-pagination {
            bottom: 20px !important;
          }

          .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            background: #bbb;
            opacity: 1;
            margin: 0 5px !important;
            transition: all 0.4s ease;
          }

          .swiper-pagination-bullet-active {
            background: #ff2d74;
            transform: scale(1.6); /* 🔥 zoom effect */
          }

          /* dynamic bullets extra effect */
          .swiper-pagination-bullet-active-main {
            transform: scale(1.8);
          }

          .swiper-pagination-bullet-active-prev,
          .swiper-pagination-bullet-active-next {
            transform: scale(1.3);
          }
        `}
      </style>
    </>
  );
};

export default MainProductSlide;
