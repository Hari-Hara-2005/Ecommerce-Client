import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { animateHero } from '../gsapAnimations';
import Navbar from '../Component/Navbar';
import StickyWhatsapp from '../Component/StickyWhatsapp';
import CustomerReview from '../Component/CustomerReview';
import Title from '../Component/Title';
import IndustryCarousel from '../Component/ProductSlide';
import Faq from '../Component/Faq';
import Footer from '../Component/Footer';
import { Link } from 'react-router-dom';
import MainProductSlide from '../Component/MainProductSlide';
import api from '../api';
import CategorySection from '../Component/CategorySection';

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
    const ScrollToTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <Box>
            <StickyWhatsapp link={"https://wa.me/7339534672"} />
            <Box sx={{ background: "#ff2d74" }}>
                <Navbar />
                <MainProductSlide />
            </Box>
            <Box>
                <Navbar color="#fff" />
                <CategorySection industryData={industryData} />
            </Box>
            <Box sx={{ bgcolor: '#fff' }} className="three" >
                <Box component='img'
                    src='Images/leaf3.avif'
                    alt='leaf'
                    sx={{
                        width: ["70%", "50%", "30%"],
                        ml: [-10],
                        mt: [54, 20, 0, -5, -5],
                        position: 'absolute',
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black', px: [2, 5, 8], pb: [5, 12] }}>
                    <Title color="#282828">Our Products</Title>
                </Box>
                <Box sx={{ mx: [2, 5, 5, 12] }}>
                    <Grid container spacing={{ xs: 3, sm: 3, md: 5 }} justifyContent={'center'} columns={{ xs: 2, sm: 3, md: 3 }}>
                        {industryData.map((item, index) => (
                            <Grid item xs={1} sm={1} md={1} key={index} sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'scale(1.10)',
                                }
                            }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Link
                                        to={`/category/${item.slug}`}
                                        onClick={ScrollToTop}
                                        color={"inherit"}
                                        style={{ textDecoration: 'none' }}
                                        key={index}
                                    >
                                        <Box sx={{ width: ["100%", "100%", "100%", "100%", '25rem'] }}>
                                            <Box
                                                component='img'
                                                src={item.category_image}
                                                alt='pack'
                                                sx={{
                                                    width: ["100%"],
                                                    borderRadius: '3%',
                                                    height: ['12rem', '18rem', '20rem', '25rem'],
                                                    border: '3px solid #92553D',
                                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                                                    cursor: 'pointer',
                                                    mb: [-4.5, -6]
                                                }}
                                            />
                                        </Box>
                                        <Typography sx={{
                                            fontSize: ['1.2rem', '1.5rem', '1.5rem'],
                                            fontWeight: '600',
                                            color: '#fff',
                                            textAlign: 'center',
                                            letterSpacing: 1,
                                        }}>
                                            {item.category_name}
                                        </Typography>
                                    </Link>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <IndustryCarousel />
            </Box>
            <Box sx={{ bgcolor: '#282828', }}>
                <Box sx={{ display: 'flex', justifyContent: 'start', px: [2, 5, 8], pb: [0, 0, 3], pt: 5 }}>
                    <Title color="#fff" >Read our customers say</Title>
                </Box>
                <CustomerReview />
            </Box>
            <Box sx={{ px: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black', px: [2, 5, 8], pb: 5 }}>
                    <Title color="#282828">Frequently Asked Question</Title>
                </Box>
                <Faq />
            </Box>
            <Box sx={{ bgcolor: 'black', mt: 20, px: 2 }}>
                <Footer />
            </Box>
        </Box>
    );
}

export default Hero;
