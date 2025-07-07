import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography, Grid, Box, Stack, Button } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { products } from "./utils/data";

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#fff', // Adjust for dark background
    color: '#92553D',
    fontWeight: 900,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    transition: 'transform 0.5s, box-shadow 0.5s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    },
    borderRadius: 16,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row', // Default for mobile
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column', // Change to row for larger screens
    },
}));

const StyledMedia = styled(CardMedia)`
  height: 220px;
  
  @media (min-width: 600px) {
    /* Adjust height for larger devices (like tablets and desktops) */
    height: 350px;
  }
`;

const IconContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 15,
    right: 15,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    [theme.breakpoints.down('sm')]: {
        width: '8%',
    },
}));

const RatingStars = ({ rating, size }) => (
    <Box display="flex" alignItems="center" sx={{ py: 1.5 }}>
        {[...Array(5)].map((_, index) => (
            <StarIcon
                key={index}
                sx={{ color: index < rating ? 'orange' : 'rgba(255, 215, 0, 0.6)', fontSize: size }}
            />
        ))}
    </Box>
);

const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
    };

    const handleShoppingClick = () => {
        window.open("https://wa.me/8220570301", "_blank");
    };

    return (
        <StyledCard>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StyledMedia component="img" sx={{ width: ["8rem", "18rem"] }} image={product.image} alt={product.name} />
            </Box>
            <IconContainer>
                <IconButton aria-label="add to favorites" sx={{
                    color: liked ? 'red' : '#fff', bgcolor: '#92553D', '&:hover': {
                        bgcolor: '#212121',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    },
                }} onClick={handleLikeClick}>
                    <FavoriteIcon sx={{ fontSize: ['0.8rem', '1.5rem'] }} />
                </IconButton>
                <IconButton aria-label="save" sx={{
                    color: bookmarked ? 'lightgray' : '#fff', bgcolor: '#92553D', '&:hover': {
                        bgcolor: '#212121',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    },
                }} onClick={handleBookmarkClick}>
                    <BookmarkIcon sx={{ fontSize: ['0.8rem', '1.5rem'] }} />
                </IconButton >
                <IconButton aria-label="add to cart" sx={{
                    color: '#fff', bgcolor: '#92553D', '&:hover': {
                        bgcolor: '#212121',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    },
                }} onClick={handleShoppingClick}>
                    <ShoppingCartIcon sx={{ fontSize: ['0.8rem', '1.5rem'] }} />
                </IconButton>
            </IconContainer>
            <CardContent>
                <Typography variant={["0.8rem", "h6"]} component="div" sx={{ textAlign: 'start', fontWeight: [700, 600], letterSpacing: 1 }} >
                    {product.name}
                </Typography>
                <Typography variant="body1" component="div" sx={{ textAlign: 'start', letterSpacing: 0.5 }} >
                    250 gm
                </Typography>
                <Typography color={'#92553D'} sx={{ textAlign: 'start', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 0.5, mt: 1, display: 'flex', }} >
                    <VerifiedIcon sx={{ fontSize: '1rem' }} />
                    Smart Dry Fruits
                </Typography>
                <Stack direction={["column", 'row']} justifyContent={'space-between'}>
                    <Box>
                        <RatingStars rating={product.rating} size="1.2rem" />
                        <Typography color={'#282828'} sx={{ textAlign: 'start', fontWeight: 700, fontSize: '1rem', letterSpacing: 0.5, display: 'flex', alignItems: 'center' }} >
                            {product.price}
                            <LocalOfferOutlinedIcon sx={{ fontSize: '0.9rem' }} />
                        </Typography>
                        <Typography color={'gray'} sx={{ textAlign: 'start', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 0.5, textDecoration: "line-through" }} >
                            {product.originalPrice}
                        </Typography>
                    </Box>
                    <Box sx={{ display: ['flex'], alignItems: 'center' }}>
                        <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />} sx={{ bgcolor: "#92553D", textTransform: 'none', borderRadius: '50px', px: [2.5] }}>
                            Add to cart
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </StyledCard>
    );
};

const ProductGrid = () => {
    return (
        <Box sx={{ textAlign: 'center', px: [2, 3, 0], py: 10 }}>
            <Grid container spacing={6} justifyContent="center" alignItems="center">
                {products.slice(0, 20).map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={3.5}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductGrid;
