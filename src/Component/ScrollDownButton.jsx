import React from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { keyframes } from '@mui/system';

// Define a keyframe animation for bouncing
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const ScrollDownButton = () => {
    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight, // Scrolls down by one viewport height
            behavior: 'smooth', // Smooth scrolling
        });
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: '2rem', // Position it slightly above the bottom
                left: ['43.5%','48.5%'],
                transform: 'translateX(-50%)',
                zIndex: 1000,
                animation: `${bounce} 2s infinite`, // Apply the bouncing animation
            }}
        >
            <IconButton sx={{  }} onClick={handleScroll}>
                <KeyboardDoubleArrowDownIcon sx={{ fontSize: 40, color: '#fff', fontWeight: 900 }} />
            </IconButton>
        </Box>
    );
};
