import React, { useEffect } from 'react'
import Navbar from '../Component/Navbar'
import { Box, Container, Paper, Typography } from '@mui/material'
import Title from '../Component/Title'
import EmailIcon from '@mui/icons-material/Email';
import PhoneCallback from '@mui/icons-material/PhoneCallback';
import Footer from '../Component/Footer';
import StickyWhatsapp from '../Component/StickyWhatsapp';
export const Contact = () => {
    useEffect(() => {
        document.title = "Contact Us";
    }, []);
    return (
        <>
            <Navbar color="#000" />
            <StickyWhatsapp link={"https://wa.me/7339534672"} />
            <Box
                component='img'
                src='./360_F_829343592_9FbtgnN15AZJ2bunUhDzVvZaxssq1Q65.jpg'
                alt='pack'
                sx={{
                    width: ["100%"],
                    height: ['50vh','65vh'],
                    position: 'absolute',
                    mt: [2, 4, 3],
                    zIndex: -2
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '60vh', zIndex: 2, alignItems: 'center' }}>
                <Title color="#fff">Contact Us</Title>
            </Box>
            <Box sx={{ pb: 10 }}>
                <Box sx={{ fontFamily: '"League Spartan", sans-serif' }}>
                    <Container sx={{ pt: { xs: 8, md: 18 } }}>
                        <Paper elevation={3} sx={{ mx: 'auto', maxWidth: 800, border: 4, borderColor: '#92553D', borderRadius: 3 }}>
                            <Typography variant="h4" align="center" sx={{ py: 2, backgroundColor: '#92553D', color: 'white', fontWeight: 'bold', fontSize: ['1.5rem', '1.5rem', '2rem'] }}>
                                Registered address
                            </Typography>
                            <Box sx={{ borderBottom: 2, borderColor: '#92553D', mx: [2, 4], py: 4 }}>
                                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                                    Smart Dry Fruits
                                </Typography>
                                <Typography variant="body1" align="center" sx={{ mt: 2, lineHeight: 2 }}>
                                    31 , Sarangapani East Street,<br />
                                    Utchi Pillaiyar Kovil,<br />
                                    Kumbakonam, Tamil Nadu 612001, India.
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', py: 2, pb: [4], justifyContent: 'center', gap: ['1rem', '5rem'], flexDirection: ['column', 'row'] }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <EmailIcon sx={{ color: '#282828', mr: 1 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 'medium', letterSpacing: 1 }}>
                                        contactsmartdryfruits@gmail.com
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <PhoneCallback sx={{ color: '#282828', mr: 1 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 'medium', letterSpacing: 1 }}>
                                        +91 7339534672
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </Box>
            <Box sx={{
                mx: 'auto', mx: [2, 5], height: ['16rem', '25rem', '25rem', '30rem', '35rem'], border: 2, borderColor: '#92553D', borderRadius: '13px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)' }} >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.060694083806!2d79.37425997480764!3d10.95878798920133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baacd55129f3d37%3A0xeee2cd83d8b7f6ac!2sSmart%20dry%20fruits!5e0!3m2!1sen!2sin!4v1723128713816!5m2!1sen!2sin"
                    width="100%"
                    height='100%'
                    style={{ borderRadius: '15px', border: 'none' }}
                />
            </Box>
            <Box sx={{ bgcolor: 'black', mt: [10,16], px: 2 }}>
                <Footer />
            </Box>
        </>
    )
}
