import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid, Box, Button, Typography, TextField, Chip,
    Stack, Divider, Paper, IconButton,
    Dialog, DialogContent, DialogTitle,
    InputAdornment, Stepper, Step, StepLabel,
    Fade, Slide, Avatar, Backdrop
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
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from '../Component/Footer';
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice';
import Navbar from '../Component/Navbar';
import Title from '../Component/Title.jsx';
import TopBar from '../Component/Announcement.jsx';

const PROMO_CODES = { WELCOME10: 0.10, SAVE20: 0.20 };
const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 50;

const pink = '#E91E8C';
const pinkLight = '#FCE4F3';
const pinkDark = '#C2185B';
const brown = '#92553D';
const brownLight = '#fdf5f2';
const dark = '#1a1a1a';
const surface = '#FAFAFA';

// ─── Glassmorphism Dialog ───────────────────────────────────────────────────
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
            {/* Header gradient */}
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
                            <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }`}</style>
                        </Box>
                    </Fade>
                )}
            </DialogContent>
        </Dialog>
    );
};

// ─── Main Cart Component ────────────────────────────────────────────────────
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');
    const [promoSuccess, setPromoSuccess] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));

    const handleUpdateQty = (id, delta) => {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, (item.quantity || item.qty || 1) + delta);
        dispatch(updateQuantity({ id, quantity: newQty }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        setAppliedPromo(null);
        setPromoInput('');
        setPromoError('');
        setPromoSuccess('');
    };

    const applyPromo = () => {
        const code = promoInput.trim().toUpperCase();
        if (PROMO_CODES[code]) {
            setAppliedPromo({ code, rate: PROMO_CODES[code] });
            setPromoError('');
            setPromoSuccess(`🎉 "${code}" applied — ${PROMO_CODES[code] * 100}% off!`);
        } else {
            setPromoError('Invalid code. Try WELCOME10 or SAVE20.');
            setAppliedPromo(null);
            setPromoSuccess('');
        }
    };

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
        const whatsappNumber = '919952857016';
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const url = isMobile
            ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        window.open(url, '_blank');
        setDialogOpen(false);
    };


    // const handleShoppingClick = () => {
    //     const message = cartItems.map(item =>
    //         `Name: ${item.name}\nPrice: ₹${item.price}\nQty: ${item.quantity || item.qty || 1}${item.selectedGram ? `\nGrams: ${item.selectedGram}` : ''}`
    //     ).join('\n\n');

    //     const encodedMessage = encodeURIComponent(
    //         `Hi! I'm interested in these products:\n\n${message}\n\nTotal: ₹${total}\n\nPlease help me place an order.`
    //     );

    //     const whatsappNumber = '919952857016';
    //     const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    //     const whatsappUrl = isMobile
    //         ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    //         : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    //     window.open(whatsappUrl, '_blank');
    // };


    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || item.qty || 1)), 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const discount = appliedPromo ? Math.round(subtotal * appliedPromo.rate) : 0;
    const total = subtotal + shipping - discount;
    const toFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

    return (
        <>
            <TopBar />
            <Navbar color="#fff" />

            <Box sx={{ pt: '3%', bgcolor: surface, minHeight: '100vh' }}>
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
                            <Typography variant="body2" color="text.secondary" mt={0.5}>
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
                        /* ── Empty State ── */
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
                                    {cartItems.map((item, index) => {
                                        const qty = item.quantity || item.qty || 1;
                                        const originalPrice = item.originalPrice || item.mrp || null;
                                        const discountPct = originalPrice ? Math.round((1 - item.price / originalPrice) * 100) : null;

                                        return (
                                            <Paper key={item.id} elevation={0}
                                                sx={{
                                                    p: 2.5, borderRadius: '20px',
                                                    border: '1px solid #f0f0f0',
                                                    bgcolor: '#fff',
                                                    transition: 'all 0.25s',
                                                    '&:hover': {
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                                        transform: 'translateY(-2px)',
                                                        borderColor: 'rgba(233,30,140,0.2)'
                                                    }
                                                }}>
                                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                                                    {/* Image */}
                                                    <Box sx={{ position: 'relative', flexShrink: 0 }}>
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
                                                                    bgcolor: '#00C853', color: '#fff',
                                                                    fontWeight: 800, fontSize: 10, height: 20,
                                                                    '& .MuiChip-label': { px: 0.8 }
                                                                }} />
                                                        )}
                                                    </Box>

                                                    {/* Info */}
                                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                                        <Typography fontWeight={700} fontSize={15} color={dark} noWrap>
                                                            {item.name}
                                                        </Typography>
                                                        {item.selectedGram && (
                                                            <Chip label={`${item.selectedGram}g`} size="small"
                                                                sx={{ mt: 0.4, height: 20, fontSize: 11, bgcolor: '#f5f5f5', color: '#666', '& .MuiChip-label': { px: 1 } }} />
                                                        )}

                                                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.8 }}>
                                                            <Typography fontWeight={600} color={"#ff2d74"} fontSize={17}>
                                                                ₹{item.price}
                                                            </Typography>
                                                            {originalPrice && (
                                                                <Typography variant="body2" color="#bbb" sx={{ textDecoration: 'line-through', fontSize: 13 }}>
                                                                    ₹{originalPrice}
                                                                </Typography>
                                                            )}
                                                        </Box>

                                                        {/* Qty controls + line total */}
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

                                                    {/* Remove */}
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

                            {/* ── Order Summary ── */}
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} sx={{
                                    p: 3, borderRadius: '20px',
                                    border: '1px solid #f0f0f0',
                                    bgcolor: '#fff',
                                    position: 'sticky', top: 20
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
                                        {appliedPromo && (
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary">Promo</Typography>
                                                    <Chip label={appliedPromo.code} size="small"
                                                        onDelete={() => { setAppliedPromo(null); setPromoSuccess(''); setPromoInput(''); }}
                                                        sx={{ height: 18, fontSize: 10, bgcolor: pinkLight, color: pink, '& .MuiChip-label': { px: 0.8 } }} />
                                                </Box>
                                                <Typography variant="body2" fontWeight={700} color="#00C853">
                                                    -₹{discount}.00
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>

                                    {/* Free shipping nudge */}
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

                                    <Button fullWidth variant="contained" size="large"
                                        endIcon={<ShoppingCartCheckoutIcon />}
                                        onClick={() => setDialogOpen(true)}
                                        sx={{
                                            background: `linear-gradient(135deg, ${pinkDark}, ${pink})`,
                                            borderRadius: '14px', py: 1.7,
                                            fontWeight: 800, fontSize: 15, textTransform: 'none',
                                            boxShadow: `0 8px 24px rgba(233,30,140,0.3)`,
                                            letterSpacing: 0.3,
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                background: `linear-gradient(135deg, #880e4f, ${pinkDark})`,
                                                boxShadow: `0 12px 32px rgba(233,30,140,0.45)`,
                                                transform: 'translateY(-2px)'
                                            }
                                        }}>
                                        Place Order
                                    </Button>

                                    <Button fullWidth variant="text" href="/"
                                        sx={{
                                            mt: 1.5, borderRadius: '12px', py: 1.2,
                                            fontWeight: 600, fontSize: 14, textTransform: 'none',
                                            color: 'text.secondary',
                                            '&:hover': { color: brown, bgcolor: brownLight }
                                        }}>
                                        ← Continue Shopping
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>

            {/* ── Order Dialog ── */}
            <OrderDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                cartItems={cartItems}
                total={total}
                onConfirm={handleShoppingClick}
            />

            <Box sx={{ bgcolor: dark, px: 2 }}>
                <Footer />
            </Box>
        </>
    );
};

export default Cart;