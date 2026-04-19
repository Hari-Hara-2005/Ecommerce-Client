import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import api from "../utils/api";

const MainProductSlide = () => {
  const [banners, setBanner] = useState([]);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  // ✅ Detect mobile/desktop on resize
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(media.matches);
    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  // ✅ Fetch banners
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/banner");
        setBanner(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // ✅ Normalize boolean — handles: true, "t", false, "f"
  const isTrue = (val) => val === true || val === "t";

  // ✅ is_active = "t"  → mobile banners
  // ✅ is_active = "f"  → desktop banners
  const filteredBanners = banners.filter((b) =>
    isMobile ? isTrue(b.is_active) : !isTrue(b.is_active),
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "500px",
            sm: "400px",
            md: "400px",
            lg: "650px",
            xl: "730px",
          },
          overflow: "hidden",
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={filteredBanners.length > 1}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {filteredBanners.map((banner) => {
            const isExternal = banner.link?.startsWith("http");

            return (
              <SwiperSlide key={banner.id}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  {/* 🔗 INTERNAL LINK */}
                  {!isExternal ? (
                    <Link
                      to={`category/${banner.link || ""}`}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={banner.image_url}
                        alt="Banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  ) : (
                    /* 🔗 EXTERNAL LINK */
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={banner.image_url}
                        alt="Banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                  )}
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      {/* 🎨 STYLES */}
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
            transform: scale(1.6);
          }

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
