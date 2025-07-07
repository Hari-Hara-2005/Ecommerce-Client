import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { reviews } from "../utils/data";
import { keyframes } from "@emotion/react";

// Array of color combinations
const colorStyles = [
    { circleColor: '#7F60A3', lineColor: '#7F60A3' },
    { circleColor: '#81DE76', lineColor: '#81DE76' },
    { circleColor: '#7F60A3', lineColor: '#7F60A3' },
    { circleColor: '#81DE76', lineColor: '#81DE76' },
];

const CustomerReview = () => {
    const scrollX = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
  `;

    // Duplicate reviews for continuous scrolling effect
    const duplicateClients = [...reviews, ...reviews];

    return (
        <Box sx={{
            display: "flex",
            userSelect: "none",
            width: "100%",
            overflow: "hidden",
            maskImage:
                "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))",
        }}>
            <Box sx={{
                display: "flex",
                flexShrink: 0,
                alignItems: "center",
                justifyContent: "space-around",
                whiteSpace: "nowrap",
                gap: ['2rem', '2rem', '3rem'],
                py: '1rem',
                animation: `${scrollX} 250s linear infinite`,
            }}>
                {duplicateClients.map((review, index) => {
                    // Rotate through color styles for each review
                    const colorStyle = colorStyles[index % colorStyles.length];
                    return (
                        <Box key={index} sx={{ position: 'relative', my: [5, 5, 8] }}>
                            <Avatar
                                src={review.img}
                                alt={review.name}
                                sx={{ width: 100, height: 100, mx: 'auto', mb: -5, zIndex: 1 }}
                            />
                            <Card sx={{ maxWidth: [300, 350], mx: 'auto', textAlign: 'center', p: 2, borderRadius: '10px', bgcolor: '#f9f9f9', pt: 7 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {review.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.position}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                                        <Box sx={{ flex: 1, borderBottom: `1px solid ${colorStyle.lineColor}` }}></Box>
                                        <Box
                                            sx={{
                                                width: 70,
                                                height: 70,
                                                bgcolor: colorStyle.circleColor,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box>
                                                <img src='Images/double-1.png' alt='img' style={{ width: '4rem', marginTop: 5 }} />
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, borderBottom: `1px solid ${colorStyle.lineColor}` }}></Box>
                                    </Box>
                                    <Box sx={{ mt: 2, mb: 2 }}>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic', textWrap: 'wrap' }}>
                                            "{review.description}"
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {[...Array(5)].map((_, starIndex) => (
                                            <StarIcon key={starIndex} sx={{ color: 'gold', fontSize: 18 }} />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

export default CustomerReview;
