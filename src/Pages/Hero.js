import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { animateHero } from '../gsapAnimations';
import Navbar from '../Component/Navbar';
import StickyWhatsapp from '../Component/StickyWhatsapp';
import CustomerReview from '../Component/CustomerReview';
import Title from '../Component/Title';
import Footer from '../Component/Footer';
import MainProductSlide from '../Component/MainProductSlide';
import api from '../utils/api';
import CategorySection from '../Component/CategorySection';
import TopBar from '../Component/Announcement';
import SlideProduct from '../Component/SlideProducts';
import NewArrivals from './ProductPages/NewArrivals';
import Earrings from './ProductPages/Earrings';
import HairAccessories from './ProductPages/HairAccessories';
import FeaturesSection from '../Component/FeaturesSection';

const Hero = () => {
    useEffect(() => {
        animateHero();
        fetchData();
    }, []);

    const [industryData, setIndustryData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await api.get("/api/category");
            setIndustryData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Box>
            <StickyWhatsapp link={"https://wa.me/7339534672"} />
            <Box>
                <TopBar />
                <Navbar color="#fff" />
                <MainProductSlide />
            </Box>
            <Box>
                <CategorySection industryData={industryData} />
            </Box>
            <Box sx={{ bgcolor: '#fff' }} >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Title title="Estailo Exclusive" subtitle="Rare Finds" />
                    <SlideProduct />
                </Box>
                <Box sx={{ px: { xs: 2, md: 6 }, py: 5 }}>
                    <NewArrivals />
                </Box>
                <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
                    <Box
                        sx={{
                            width: "100%",
                            borderRadius: 4,
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            component="img"
                            src="Client/src/SMART.jpg"
                            alt="Free Gift Banner"
                            sx={{
                                width: "100%",
                                height: { xs: 180, sm: 250, md: 320 },
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{ px: { xs: 2, md: 6 }, py: 5 }}>
                    <Earrings />
                </Box>
                <Box sx={{ px: { xs: 2, md: 6 }, py: 5 }}>
                    <HairAccessories />
                </Box>
            </Box>
            <FeaturesSection />
            <Box sx={{ px: { xs: 2, md: 6 }, py: 5 }}>
                <Typography variant="h4" sx={{ fontSize: ["25px", "20px", "35px"] }} fontWeight={700} color={"black"} pt={5}>
                    Read our customers say
                </Typography>
                <CustomerReview />
            </Box>
            <Box sx={{ bgcolor: 'black', mt: 20, px: 2 }}>
                <Footer />
            </Box>
        </Box >
    );
}

export default Hero;
