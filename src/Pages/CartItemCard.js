// src/Components/CartItemCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Stack } from '@mui/material';
import { styled } from '@mui/system';
import VerifiedIcon from '@mui/icons-material/Verified';

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#fff',
    color: '#92553D',
    fontWeight: 900,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    border:'2px solid #92553D',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(2),
}));

const CartItemCard = ({ product, onRemove }) => {
    return (
        <StyledCard>
            <Box sx={{ width: "8rem" }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{ width: '100%', height: 'auto'}}
                />
            </Box>
            <CardContent sx={{ flex: '1 1 auto', ml: [0,2] }}>
                <Typography variant="h6" sx={{ fontWeight: 700,textAlign:'start' }}>
                    {product.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 1, display: 'flex', alignItems: 'center' }}>
                    <VerifiedIcon sx={{ fontSize: '1rem', mr: 1 }} />
                    {product.brandName || 'Smart Dry Fruits'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, textAlign: 'start' }}>
                    {product.selectedGram}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                        {product.originalPrice}
                    </Typography>
                </Stack>
                <Box sx={{ display: 'flex',alignItems: 'center', py: 2 }}>
                    <Button variant="contained" sx={{
                        bgcolor: "#92553D", textTransform: 'none', borderRadius: '50px', px: [2.5], '&:hover': {
                            bgcolor: "#282828"
                        }
                    }} onClick={onRemove}>
                        Remove
                    </Button>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

export default CartItemCard;
