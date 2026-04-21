import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid, Box, Button, Typography, TextField, Chip,
    Stack, Divider, Paper, IconButton, DialogContent,
    InputAdornment,
    Fade, Slide,
    Dialog,
    useMediaQuery,
    useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from '../Component/Footer';
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice';
import Navbar from '../Component/Navbar';
import Title from '../Component/Title.jsx';
import TopBar from '../Component/Announcement.jsx';

import { Helmet } from 'react-helmet-async';

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 50;
const MIN_ORDER_AMOUNT = 100;

const pink = '#E91E8C';
const pinkLight = '#FCE4F3';
const pinkDark = '#C2185B';
const brown = '#92553D';
const brownLight = '#fdf5f2';
const dark = '#1a1a1a';
const surface = '#FAFAFA';

// ─── Hover-only CSS ───────────────────────────────────────────────────────────
const HoverStyles = () => (
    <style>{`
        .kt-cart-card {
            transition: all 0.25s cubic-bezier(.4,0,.2,1);
            position: relative;
        }
        .kt-cart-card::before {
            content: '';
            position: absolute;
            left: 0; top: 14px; bottom: 14px;
            width: 3px;
            background: linear-gradient(to bottom, ${pinkDark}, ${pink});
            border-radius: 0 4px 4px 0;
            opacity: 0;
            transition: opacity 0.25s;
        }
        .kt-cart-card:hover {
            box-shadow: 0 8px 32px rgba(233,30,140,0.10), 0 2px 8px rgba(0,0,0,0.04);
            transform: translateY(-2px);
            border-color: rgba(233,30,140,0.2) !important;
        }
        .kt-cart-card:hover::before { opacity: 1; }
        .kt-img-wrap img { transition: transform 0.4s cubic-bezier(.4,0,.2,1); }
        .kt-cart-card:hover .kt-img-wrap img { transform: scale(1.06); }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }

        /* Sticky bar slide-up */
        @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
        }
        .kt-sticky-bar {
            animation: slideUp 0.35s cubic-bezier(.34,1.56,.64,1) both;
        }
    `}</style>
);

// ─── Cart SEO ─────────────────────────────────────────────────────────────────
const CartSEO = () => (
    <Helmet>
        <title>My Cart | Kudanthai Trends – Women's Jewellery & Fashion, Kumbakonam</title>
        <meta name="description" content="Review your selected jewellery and fashion accessories in your Kudanthai Trends cart. Place your order via WhatsApp for fast delivery across Tamil Nadu." />
        <meta name="keywords" content="Kudanthai Trends cart, buy jewellery online Tamil Nadu, order earrings online, fashion accessories checkout, Kumbakonam jewellery order" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://kudanthaitrends.in/cart" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kudanthai Trends" />
        <meta property="og:title" content="My Cart | Kudanthai Trends" />
        <meta property="og:description" content="You're one step away! Complete your order at Kudanthai Trends and get trendy jewellery delivered to your door." />
        <meta property="og:url" content="https://kudanthaitrends.in/cart" />
        <meta property="og:image" content="https://kudanthaitrends.in/Images/KT1.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Cart | Kudanthai Trends" />
        <meta name="twitter:description" content="Complete your jewellery order at Kudanthai Trends – Kumbakonam. Fast WhatsApp ordering, delivery across Tamil Nadu." />
        <meta name="twitter:image" content="https://kudanthaitrends.in/Images/KT1.png" />
        <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CheckoutPage',
            name: 'Shopping Cart – Kudanthai Trends',
            url: 'https://kudanthaitrends.in/cart',
            provider: {
                '@type': 'OnlineStore',
                name: 'Kudanthai Trends',
                url: 'https://kudanthaitrends.in',
                telephone: '+919500597455',
                email: 'kudanthaitrends@gmail.com',
                address: { '@type': 'PostalAddress', addressLocality: 'Kumbakonam', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
            },
        })}</script>
    </Helmet>
);

// ─── Order Dialog ─────────────────────────────────────────────────────────────
const OrderDialog = ({ open, onClose, cartItems, total, onConfirm }) => {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', address: '', pincode: '', city: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
        if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Valid 10-digit Indian mobile required';
        if (!form.address.trim()) e.address = 'Delivery address is required';
        if (!/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit pincode required';
        if (!form.city.trim()) e.city = 'City is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = () => {
        if (!validate()) return;
        setSubmitted(true);
        setTimeout(() => {
            onConfirm(form);
            setSubmitted(false);
            setForm({ name: '', email: '', phone: '', address: '', pincode: '', city: '' });
        }, 1800);
    };

    const fieldSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: '#fff',
            fontSize: 14,
            transition: 'all 0.2s',
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: pink },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: pink, borderWidth: 2 },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: pink },
    };

    return (
        <Dialog
            open={open}
            onClose={!submitted ? onClose : undefined}
            maxWidth="sm"
            fullWidth
            TransitionComponent={Slide}
            TransitionProps={{ direction: 'up' }}
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 32px 80px rgba(233,30,140,0.18)',
                    border: '1px solid rgba(233,30,140,0.12)',
                }
            }}
            BackdropProps={{
                sx: { backdropFilter: 'blur(6px)', bgcolor: 'rgba(0,0,0,0.45)' }
            }}
        >
            {/* Header */}
            <Box sx={{
                background: `linear-gradient(135deg, ${pinkDark} 0%, ${pink} 60%, #ff6eb4 100%)`,
                px: 3, py: 2.5,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Box>
                    <Typography fontWeight={800} fontSize={18} color="#fff" fontFamily="'Playfair Display', serif">
                        Complete Your Order
                    </Typography>
                    <Typography variant="caption" color="rgba(255,255,255,0.8)">
                        Tell us where to send your goodies 🎁
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <DialogContent sx={{ px: 3, py: 3, bgcolor: '#fafafa' }}>
                {!submitted ? (
                    <Fade in={!submitted}>
                        <Box>
                            {/* Order mini-summary */}
                            <Box sx={{ mb: 2.5, p: 2, borderRadius: '14px', bgcolor: pinkLight, border: `1px solid rgba(233,30,140,0.15)` }}>
                                <Typography variant="caption" color={pink} fontWeight={700} textTransform="uppercase" letterSpacing={1}>
                                    Order Summary · {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cartItems.map(i => i.name).join(', ').slice(0, 55)}{cartItems.length > 2 ? '…' : ''}
                                    </Typography>
                                    <Typography fontWeight={800} color={pink} fontSize={15}>₹{total}</Typography>
                                </Box>
                            </Box>

                            <Typography variant="subtitle2" fontWeight={700} color={dark} mb={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PersonOutlineIcon fontSize="small" sx={{ color: pink }} /> Contact Details
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth label="Full Name" value={form.name}
                                        onChange={handleChange('name')} error={!!errors.name}
                                        helperText={errors.name} size="small"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ color: pink, fontSize: 18 }} /></InputAdornment> }}
                                        sx={fieldSx}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth label="Email Address" value={form.email}
                                        onChange={handleChange('email')} error={!!errors.email}
                                        helperText={errors.email} size="small" type="email"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon sx={{ color: pink, fontSize: 18 }} /></InputAdornment> }}
                                        sx={fieldSx}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth label="Phone Number" value={form.phone}
                                        onChange={handleChange('phone')} error={!!errors.phone}
                                        helperText={errors.phone} size="small" type="tel"
                                        inputProps={{ maxLength: 10 }}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlinedIcon sx={{ color: pink, fontSize: 18 }} /></InputAdornment> }}
                                        sx={fieldSx}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="subtitle2" fontWeight={700} color={dark} mt={2.5} mb={1.5} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <HomeOutlinedIcon fontSize="small" sx={{ color: pink }} /> Delivery Address
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth label="Full Address" value={form.address}
                                        onChange={handleChange('address')} error={!!errors.address}
                                        helperText={errors.address} size="small" multiline rows={2}
                                        placeholder="House/Flat No., Street, Landmark"
                                        InputProps={{ startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}><HomeOutlinedIcon sx={{ color: pink, fontSize: 18 }} /></InputAdornment> }}
                                        sx={fieldSx}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth label="City" value={form.city}
                                        onChange={handleChange('city')} error={!!errors.city}
                                        helperText={errors.city} size="small"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PinDropOutlinedIcon sx={{ color: pink, fontSize: 18 }} /></InputAdornment> }}
                                        sx={fieldSx}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth label="Pincode" value={form.pincode}
                                        onChange={handleChange('pincode')} error={!!errors.pincode}
                                        helperText={errors.pincode} size="small" type="tel"
                                        inputProps={{ maxLength: 6 }}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><PinDropOutlinedIcon sx={{ color: pink, fontSize: 18 }} /></InputAdornment> }}
                                        sx={fieldSx}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth variant="contained" size="large"
                                onClick={handleSubmit}
                                startIcon={<WhatsAppIcon />}
                                sx={{
                                    mt: 3, borderRadius: '14px', py: 1.6,
                                    fontWeight: 800, fontSize: 15, textTransform: 'none',
                                    background: `linear-gradient(135deg, ${pinkDark}, ${pink})`,
                                    boxShadow: `0 8px 24px rgba(233,30,140,0.35)`,
                                    letterSpacing: 0.3,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        background: `linear-gradient(135deg, #880e4f, ${pinkDark})`,
                                        boxShadow: `0 12px 32px rgba(233,30,140,0.45)`,
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                            >
                                Place Order via WhatsApp
                            </Button>

                            <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1.5}>
                                🔒 Your details are safe and only used for order processing
                            </Typography>
                        </Box>
                    </Fade>
                ) : (
                    <Fade in={submitted}>
                        <Box sx={{ py: 5, textAlign: 'center' }}>
                            <Box sx={{
                                width: 80, height: 80, borderRadius: '50%',
                                background: `linear-gradient(135deg, ${pinkLight}, rgba(233,30,140,0.2))`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                mx: 'auto', mb: 2.5,
                                animation: 'pulse 1s ease-in-out infinite'
                            }}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 44, color: pink }} />
                            </Box>
                            <Typography fontWeight={800} fontSize={20} color={dark} fontFamily="'Playfair Display', serif" mb={1}>
                                Redirecting to WhatsApp…
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your order details are being prepared 🎉
                            </Typography>
                        </Box>
                    </Fade>
                )}
            </DialogContent>
        </Dialog>
    );
};

// ─── Mobile Sticky Bottom Bar ─────────────────────────────────────────────────
const MobileStickyBar = ({ total, itemCount, isOrderEnabled, onPlaceOrder, shipping, subtotal }) => (
    <Box
        className="kt-sticky-bar"
        sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            // Safe area for notched phones
            pb: 'env(safe-area-inset-bottom)',
            bgcolor: '#fff',
            borderTop: '1px solid rgba(233,30,140,0.15)',
            boxShadow: '0 -8px 32px rgba(233,30,140,0.12)',
            px: 2,
            pt: 1.5,
            pb: 1.5,
            display: { xs: 'block', md: 'none' },
        }}
    >
        {/* Mini summary row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
            <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                    {shipping === 0 && subtotal > 0 && (
                        <Box component="span" sx={{ ml: 0.8, color: '#00C853', fontWeight: 700 }}>· FREE shipping</Box>
                    )}
                </Typography>
                <Typography fontWeight={900} fontSize={22} color={pink} lineHeight={1.1} display="block">
                    ₹{total}
                </Typography>
            </Box>

            <Button
                variant="contained"
                size="large"
                endIcon={<ShoppingCartCheckoutIcon />}
                onClick={onPlaceOrder}
                disabled={!isOrderEnabled}
                sx={{
                    background: isOrderEnabled
                        ? `linear-gradient(135deg, ${pinkDark}, ${pink})`
                        : undefined,
                    borderRadius: '14px',
                    px: 3,
                    py: 1.4,
                    fontWeight: 800,
                    fontSize: 15,
                    textTransform: 'none',
                    boxShadow: isOrderEnabled ? `0 6px 20px rgba(233,30,140,0.38)` : 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s',
                    '&:hover': {
                        background: `linear-gradient(135deg, #880e4f, ${pinkDark})`,
                        transform: 'translateY(-1px)',
                        boxShadow: `0 10px 28px rgba(233,30,140,0.45)`,
                    },
                    '&.Mui-disabled': {
                        background: '#e0e0e0',
                        color: '#aaa',
                        boxShadow: 'none',
                    }
                }}
            >
                Place Order
            </Button>
        </Box>
        {!isOrderEnabled && subtotal > 0 && (
            <Typography variant="caption" color="error" display="block" textAlign="center" mt={1}>
                Minimum order amount is ₹{MIN_ORDER_AMOUNT}. Add ₹{MIN_ORDER_AMOUNT - subtotal} more to proceed.
            </Typography>
        )}
        {/* WhatsApp hint */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <WhatsAppIcon sx={{ fontSize: 13, color: '#25D366' }} />
            <Typography variant="caption" color="text.secondary" fontSize={11}>
                Order placed via WhatsApp · Fast & Secure
            </Typography>
        </Box>
    </Box>
);

// ─── Main Cart Component ──────────────────────────────────────────────────────
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));

    const handleUpdateQty = (id, delta) => {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, (item.quantity || item.qty || 1) + delta);
        dispatch(updateQuantity({ id, quantity: newQty }));
    };

    const handleClearCart = () => dispatch(clearCart());

    const handleShoppingClick = (form) => {
        const message = cartItems.map(item =>
            `• ${item.name} (x${item.quantity || item.qty || 1})${item.selectedGram ? ` - ${item.selectedGram}g` : ''} — ₹${item.price * (item.quantity || item.qty || 1)}`
        ).join('\n');

        const fullMessage =
            `🛍️ *New Order*\n\n` +
            `*Customer Details*\n` +
            `Name: ${form.name}\n` +
            `Email: ${form.email}\n` +
            `Phone: ${form.phone}\n\n` +
            `*Delivery Address*\n` +
            `${form.address}, ${form.city} - ${form.pincode}\n\n` +
            `*Order Items*\n${message}\n\n` +
            `*Total: ₹${total}*\n\n` +
            `Please confirm my order. Thank you!`;

        const encodedMessage = encodeURIComponent(fullMessage);
        const whatsappNumber = '919500597455';
        const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const url = isMobileDevice
            ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        window.open(url, '_blank');
        dispatch(clearCart());
        setDialogOpen(false);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || item.qty || 1)), 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;
    const toFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
    const isOrderEnabled = subtotal >= MIN_ORDER_AMOUNT;

    const totalSavings = cartItems.reduce((sum, item) => {
        const orig = item.originalPrice || item.mrp || 0;
        const qty = item.quantity || item.qty || 1;
        return orig > item.price ? sum + (orig - item.price) * qty : sum;
    }, 0);

    return (
        <>
            <CartSEO />
            <HoverStyles />

            <TopBar />
            <Navbar color="#fff" />

            <Box sx={{
                pt: '3%',
                bgcolor: surface,
                minHeight: '100vh',
                // On mobile, add bottom padding so cart items aren't hidden behind sticky bar
                pb: { xs: '90px', md: 0 },
            }}>
                {/* Decorative blob */}
                <Box component="img" src="Images/leaf3.avif" alt="leaf"
                    sx={{ width: ['70%', '50%', '22%'], zIndex: 0, ml: [-10], mt: [0, 18, -2], position: 'absolute', opacity: 0.55 }} />

                <Box sx={{ maxWidth: 1200, mx: 'auto', px: [2, 3, 4], pb: 10, position: 'relative', zIndex: 1 }}>

                    {/* Page Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, pt: 3 }}>
                        <Box>
                            <Typography variant="overline" color={"#ff2d74"} fontWeight={700} letterSpacing={2} fontSize={20}>
                                MY CART
                            </Typography>
                            <Title color={dark}>Shopping Cart</Title>
                            <Typography variant="body2" color="text.secondary">
                                {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} waiting for you
                            </Typography>
                        </Box>
                        {cartItems.length > 0 && (
                            <Button variant="outlined" size="small" onClick={handleClearCart}
                                sx={{
                                    borderColor: '#ddd', color: '#999', borderRadius: '10px',
                                    textTransform: 'none', fontSize: 13,
                                    '&:hover': { borderColor: '#e53935', color: '#e53935', bgcolor: '#fff5f5' }
                                }}>
                                Clear All
                            </Button>
                        )}
                    </Box>

                    {cartItems.length === 0 ? (
                        <Box sx={{
                            textAlign: 'center', py: 10, px: 4,
                            borderRadius: '24px',
                            background: 'linear-gradient(145deg, #fff 0%, #fce4f3 100%)',
                            border: `1px dashed rgba(233,30,140,0.25)`
                        }}>
                            <Typography fontSize={56} mb={1}>🛒</Typography>
                            <Typography variant="h5" fontWeight={800} color={dark} fontFamily="'Playfair Display', serif" mb={1}>
                                Your cart is empty
                            </Typography>
                            <Typography color="text.secondary" mb={3}>Looks like you haven't added anything yet.</Typography>
                            <Button variant="contained" startIcon={<StorefrontIcon />} href="/"
                                sx={{
                                    bgcolor: "#ff2d74", borderRadius: '12px', textTransform: 'none',
                                    fontWeight: 700, px: 4, py: 1.4,
                                    '&:hover': { bgcolor: "#ff2d74" }
                                }}>
                                Explore Products
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3} alignItems="flex-start">

                            {/* ── Cart Items ── */}
                            <Grid item xs={12} md={8}>
                                <Stack spacing={2}>
                                    {cartItems.map((item) => {
                                        const qty = item.quantity || item.qty || 1;
                                        const originalPrice = item.originalPrice || item.mrp || null;
                                        const discountPct = originalPrice ? Math.round((1 - item.price / originalPrice) * 100) : null;
                                        const savings = originalPrice && originalPrice > item.price
                                            ? (originalPrice - item.price) * qty : 0;

                                        return (
                                            <Paper key={item.id} elevation={0}
                                                className="kt-cart-card"
                                                sx={{
                                                    p: 2.5, borderRadius: '20px',
                                                    border: '1px solid #f0f0f0',
                                                    bgcolor: '#fff',
                                                }}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                                                    {/* Image */}
                                                    <Box className="kt-img-wrap" sx={{ position: 'relative', flexShrink: 0 }}>
                                                        <Box component="img"
                                                            src={item.image || item.img || item.imageUrl}
                                                            alt={item.name}
                                                            sx={{ width: 95, height: 95, borderRadius: '14px', objectFit: 'cover', bgcolor: '#f8f8f8', display: 'block' }}
                                                            onError={e => { e.target.style.display = 'none'; }}
                                                        />
                                                        {discountPct > 0 && (
                                                            <Chip label={`${discountPct}%`} size="small"
                                                                sx={{
                                                                    position: 'absolute', top: -8, right: -8,
                                                                    bgcolor: '#ff2d74', color: '#fff',
                                                                    fontWeight: 800, fontSize: 10, height: 20,
                                                                    '& .MuiChip-label': { px: 0.8 }
                                                                }} />
                                                        )}
                                                    </Box>

                                                    {/* Details */}
                                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                                        <Typography fontWeight={700} fontSize={15} color={dark} noWrap>
                                                            {item.name}
                                                        </Typography>

                                                        {/* Tags */}
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5, flexWrap: 'wrap' }}>
                                                            {item.selectedGram && (
                                                                <Chip label={`${item.selectedGram}g`} size="small"
                                                                    sx={{
                                                                        mt: 0.4, height: 20, fontSize: 11,
                                                                        bgcolor: pinkLight, color: pinkDark,
                                                                        border: `1px solid rgba(233,30,140,0.2)`,
                                                                        '& .MuiChip-label': { px: 1 }
                                                                    }} />
                                                            )}
                                                            {item.category && (
                                                                <Chip label={item.category} size="small"
                                                                    sx={{
                                                                        mt: 0.4, height: 20, fontSize: 11,
                                                                        bgcolor: '#f5f5f5', color: '#666',
                                                                        '& .MuiChip-label': { px: 1 }
                                                                    }} />
                                                            )}
                                                        </Box>

                                                        {/* Price */}
                                                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.8 }}>
                                                            <Typography fontWeight={600} color={"#ff2d74"} fontSize={17}>
                                                                ₹{item.price}
                                                            </Typography>
                                                            {originalPrice && (
                                                                <Typography variant="body2" color="#bbb" sx={{ textDecoration: 'line-through', fontSize: 13 }}>
                                                                    ₹{originalPrice}
                                                                </Typography>
                                                            )}
                                                            {savings > 0 && (
                                                                <Box sx={{
                                                                    fontSize: 11, fontWeight: 600,
                                                                    px: 1, py: '2px', borderRadius: '20px',
                                                                    bgcolor: '#e8f7f0', color: '#007a4d',
                                                                }}>
                                                                    Save ₹{savings}
                                                                </Box>
                                                            )}
                                                        </Box>

                                                        {/* Qty + line total */}
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
                                                            <Box sx={{
                                                                display: 'flex', alignItems: 'center',
                                                                border: '1.5px solid #eee', borderRadius: '12px',
                                                                overflow: 'hidden', bgcolor: '#fafafa'
                                                            }}>
                                                                <IconButton size="small" onClick={() => handleUpdateQty(item.id, -1)}
                                                                    sx={{ borderRadius: 0, px: 1.2, py: 0.5, '&:hover': { bgcolor: pinkLight } }}>
                                                                    <RemoveIcon sx={{ fontSize: 16 }} />
                                                                </IconButton>
                                                                <Typography sx={{ px: 2, fontWeight: 800, minWidth: 24, textAlign: 'center', fontSize: 15 }}>
                                                                    {qty}
                                                                </Typography>
                                                                <IconButton size="small" onClick={() => handleUpdateQty(item.id, 1)}
                                                                    sx={{ borderRadius: 0, px: 1.2, py: 0.5, '&:hover': { bgcolor: pinkLight } }}>
                                                                    <AddIcon sx={{ fontSize: 16 }} />
                                                                </IconButton>
                                                            </Box>
                                                            <Typography fontWeight={700} fontSize={15} color={dark}>
                                                                ₹{item.price * qty}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {/* Delete */}
                                                    <IconButton onClick={() => handleRemoveFromCart(item.id)}
                                                        sx={{
                                                            color: '#ccc', alignSelf: 'flex-start',
                                                            '&:hover': { color: '#e53935', bgcolor: '#fff5f5' },
                                                            transition: 'all 0.2s'
                                                        }}>
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Box>
                                            </Paper>
                                        );
                                    })}
                                </Stack>
                            </Grid>

                            {/* ── Order Summary (desktop only sticky panel) ── */}
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} sx={{
                                    p: 3, borderRadius: '20px',
                                    border: '1px solid #f0f0f0',
                                    bgcolor: '#fff',
                                    position: { md: 'sticky' },
                                    top: { md: 20 },
                                }}>
                                    <Typography variant="h6" fontWeight={800} color={dark} mb={0.5} fontFamily="'Playfair Display', serif">
                                        Order Summary
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
                                    </Typography>

                                    <Divider sx={{ my: 2.5 }} />

                                    <Stack spacing={1.8}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                                            <Typography variant="body2" fontWeight={600}>₹{subtotal}.00</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Shipping</Typography>
                                            <Typography variant="body2" fontWeight={600} color={shipping === 0 ? '#00C853' : dark}>
                                                {shipping === 0 ? '✓ FREE' : `₹${shipping}`}
                                            </Typography>
                                        </Box>
                                        {totalSavings > 0 && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="text.secondary">You saved</Typography>
                                                <Typography variant="body2" fontWeight={600} color="#007a4d">
                                                    ₹{totalSavings}.00
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>

                                    {/* Free shipping progress */}
                                    {toFreeShipping > 0 && subtotal > 0 && (
                                        <Box sx={{ mt: 2, p: 1.5, borderRadius: '12px', bgcolor: pinkLight, border: `1px solid rgba(233,30,140,0.15)` }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                <Typography variant="caption" color={pink} fontWeight={600}>
                                                    Free shipping at ₹{FREE_SHIPPING_THRESHOLD}
                                                </Typography>
                                                <Typography variant="caption" color={pink} fontWeight={700}>
                                                    ₹{toFreeShipping} away
                                                </Typography>
                                            </Box>
                                            <Box sx={{ height: 6, borderRadius: 4, bgcolor: 'rgba(233,30,140,0.15)', overflow: 'hidden' }}>
                                                <Box sx={{
                                                    height: '100%', borderRadius: 4,
                                                    bgcolor: pink,
                                                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                                                    transition: 'width 0.5s ease'
                                                }} />
                                            </Box>
                                        </Box>
                                    )}

                                    {subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                                        <Box sx={{ mt: 2, p: 1.5, borderRadius: '12px', bgcolor: '#e8f7f0', border: '1px solid rgba(0,168,107,0.2)' }}>
                                            <Typography variant="caption" color="#007a4d" fontWeight={600}>
                                                🎉 Free shipping unlocked!
                                            </Typography>
                                        </Box>
                                    )}

                                    <Divider sx={{ my: 2.5 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography fontWeight={800} fontSize={17} color={dark}>Total</Typography>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography fontWeight={900} fontSize={24} color={pink} lineHeight={1}>
                                                ₹{total}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">incl. all taxes</Typography>
                                        </Box>
                                    </Box>

                                    {/* Desktop Place Order button — hidden on mobile (sticky bar handles it) */}
                                    <Button fullWidth variant="contained" size="large"
                                        endIcon={<ShoppingCartCheckoutIcon />}
                                        onClick={() => setDialogOpen(true)}
                                        disabled={!isOrderEnabled}
                                        sx={{
                                            display: { xs: 'none', md: 'flex' },
                                            background: isOrderEnabled
                                                ? `linear-gradient(135deg, ${pinkDark}, ${pink})`
                                                : undefined,
                                            borderRadius: '14px', py: 1.7,
                                            fontWeight: 800, fontSize: 15, textTransform: 'none',
                                            boxShadow: isOrderEnabled ? `0 8px 24px rgba(233,30,140,0.3)` : 'none',
                                            letterSpacing: 0.3,
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                background: `linear-gradient(135deg, #880e4f, ${pinkDark})`,
                                                boxShadow: `0 12px 32px rgba(233,30,140,0.45)`,
                                                transform: 'translateY(-2px)'
                                            },
                                            '&.Mui-disabled': {
                                                background: '#e0e0e0',
                                                color: '#aaa',
                                                boxShadow: 'none',
                                            }
                                        }}>
                                        Place Order
                                    </Button>

                                    {!isOrderEnabled && subtotal > 0 && (
                                        <Typography variant="caption" color="error" display="block" textAlign="center" mt={1}>
                                            Minimum order amount is ₹{MIN_ORDER_AMOUNT}. Add ₹{MIN_ORDER_AMOUNT - subtotal} more to proceed.
                                        </Typography>
                                    )}

                                    <Button fullWidth variant="text" href="/"
                                        sx={{
                                            mt: 1.5, borderRadius: '12px', py: 1.2,
                                            fontWeight: 600, fontSize: 14, textTransform: 'none',
                                            color: 'text.secondary',
                                            '&:hover': { color: brown, bgcolor: brownLight }
                                        }}>
                                        ← Continue Shopping
                                    </Button>

                                    {/* Trust badges */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2.5, pt: 2, borderTop: '1px solid #f5f5f5' }}>
                                        {[
                                            { icon: '🔒', label: 'Secure' },
                                            { icon: '✅', label: 'Verified' },
                                            { icon: '🚚', label: 'Fast Delivery' },
                                        ].map(b => (
                                            <Box key={b.label} sx={{ textAlign: 'center' }}>
                                                <Typography fontSize={16}>{b.icon}</Typography>
                                                <Typography variant="caption" color="text.secondary" display="block" fontSize={10}>
                                                    {b.label}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>

            {/* ── Mobile Sticky Place Order Bar ── */}
            {cartItems.length > 0 && (
                <MobileStickyBar
                    total={total}
                    itemCount={cartItems.length}
                    isOrderEnabled={isOrderEnabled}
                    onPlaceOrder={() => setDialogOpen(true)}
                    shipping={shipping}
                    subtotal={subtotal}
                />
            )}

            <OrderDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                cartItems={cartItems}
                total={total}
                onConfirm={handleShoppingClick}
            />

            <Box sx={{ bgcolor: "#000", px: 2 }}>
                <Footer />
            </Box>
        </>
    );
};

export default Cart;