import {
  Card, CardContent, Typography, Grid, Box, Stack,
  Button, Skeleton, IconButton, Chip
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Navbar from '../../Component/Navbar';
import Title from '../../Component/Title';
import Footer from '../../Component/Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import TopBar from '../../Component/Announcement';
import { Helmet } from 'react-helmet-async';

// ─── SEO keyword map per category slug ───────────────────────────────────────
// Add or edit slugs to match whatever your backend returns.
const SEO_MAP = {
  earrings: {
    description:
      'Shop the latest trendy earrings for women at Kudanthai Trends – Kumbakonam. Studs, hoops, jhumkas & more. Affordable prices, fast delivery across Tamil Nadu.',
    keywords:
      'earrings online, buy earrings Tamil Nadu, jhumka earrings, stud earrings women, hoop earrings Kumbakonam, trendy earrings India, fashion earrings online',
  },
  rings: {
    description:
      'Buy stylish women\'s rings online at Kudanthai Trends – Kumbakonam. Finger rings, statement rings & more at the best prices. Shop now!',
    keywords:
      'rings online, women rings Tamil Nadu, finger rings Kumbakonam, fashion rings India, buy rings online, statement rings women',
  },
  'hair-bands': {
    description:
      'Shop trendy hair bands & hair accessories for women at Kudanthai Trends – Kumbakonam. Wide range of styles at affordable prices.',
    keywords:
      'hair bands online, women hair accessories, hair bands Tamil Nadu, hair accessories Kumbakonam, buy hair bands India',
  },
  chips: {
    description:
      'Buy chips jewellery online at Kudanthai Trends – Kumbakonam. Lightweight, colourful chips for women at the best prices in Tamil Nadu.',
    keywords:
      'chips jewellery online, chips earrings Tamil Nadu, colourful chips women, buy chips jewellery India, Kumbakonam chips jewellery',
  },
  // Fallback for any other category
  default: {
    description:
      'Shop the latest women\'s fashion jewellery & accessories at Kudanthai Trends – Kumbakonam, Tamil Nadu. Earrings, rings, hair bands, chips & more.',
    keywords:
      'women jewellery online, fashion accessories Tamil Nadu, Kudanthai Trends, Kumbakonam jewellery shop, buy jewellery online India',
  },
};

// ─── Dynamic SEO component ───────────────────────────────────────────────────
const PageSEO = ({ slug, categoryName, productCount }) => {
  const seoKey = slug ? slug.toLowerCase().replace(/\s+/g, '-') : 'default';
  const seo = SEO_MAP[seoKey] || SEO_MAP.default;

  const pageTitle = categoryName
    ? `${categoryName} | Kudanthai Trends – Women's Jewellery & Fashion Online, Kumbakonam`
    : 'Kudanthai Trends – Women\'s Jewellery & Fashion Online, Kumbakonam';

  const canonicalUrl = `https://kudanthaitrends.in/products/${slug || ''}`;

  // Rich structured data for this product listing page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName || 'Products',
    description: seo.description,
    url: canonicalUrl,
    numberOfItems: productCount || 0,
    provider: {
      '@type': 'OnlineStore',
      name: 'Kudanthai Trends',
      url: 'https://kudanthaitrends.in',
      telephone: '+919500597455',
      email: 'kudanthaitrends@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kumbakonam',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <Helmet>
      {/* Title */}
      <title>{pageTitle}</title>

      {/* Core meta */}
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph – WhatsApp / Facebook previews */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kudanthai Trends" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://kudanthaitrends.in/Images/KT1.png" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="https://kudanthaitrends.in/Images/KT1.png" />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.15); }
`;

// ─── Styled Card ──────────────────────────────────────────────────────────────
const StyledCard = styled(Card)(({ theme, animdelay }) => ({
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease',
  borderRadius: 20,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  animation: `${fadeUp} 0.55s ease both`,
  animationDelay: animdelay || '0s',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 40px rgba(255,45,116,0.18)',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'column',
  },
}));

// ─── Rating Stars ─────────────────────────────────────────────────────────────
const RatingStars = ({ rating, size = '1.1rem' }) => (
  <Box display="flex" alignItems="center" gap={0.2}>
    {[1, 2, 3, 4, 5].map((star) => {
      const filled = rating >= star;
      const half = !filled && rating >= star - 0.5;
      const Icon = filled ? StarIcon : half ? StarHalfIcon : StarBorderIcon;
      return <Icon key={star} sx={{ color: filled || half ? '#f59e0b' : '#d1d5db', fontSize: size }} />;
    })}
    <Typography sx={{ fontSize: '0.72rem', color: '#6b7280', ml: 0.5, fontWeight: 500 }}>
      ({rating})
    </Typography>
  </Box>
);

// ─── Qty Selector ─────────────────────────────────────────────────────────────
const QtySelector = ({ qty, onChange }) => (
  <Box display="flex" alignItems="center"
    sx={{ border: '1.5px solid #e5e7eb', borderRadius: '50px', overflow: 'hidden', height: 34 }}>
    <IconButton size="small" onClick={() => onChange(Math.max(1, qty - 1))}
      sx={{ width: 30, height: 30, borderRadius: 0, '&:hover': { bgcolor: '#fff0f4' } }}>
      <RemoveIcon sx={{ fontSize: '0.85rem', color: '#ff2d74' }} />
    </IconButton>
    <Typography sx={{ px: 1.2, fontWeight: 700, fontSize: '0.85rem', minWidth: 20, textAlign: 'center' }}>
      {qty}
    </Typography>
    <IconButton size="small" onClick={() => onChange(qty + 1)}
      sx={{ width: 30, height: 30, borderRadius: 0, '&:hover': { bgcolor: '#fff0f4' } }}>
      <AddIcon sx={{ fontSize: '0.85rem', color: '#ff2d74' }} />
    </IconButton>
  </Box>
);

// ─── Mobile Image Strip ───────────────────────────────────────────────────────
const MobileImageStrip = ({ product, wished, onWishToggle }) => {
  const images = [...new Set([product.image_url, product.hover_image].filter(Boolean))];
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);
  const startX = useRef(null);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, images.length - 1));
    setActiveIdx(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: trackRef.current.offsetWidth * clamped, behavior: 'smooth' });
    }
  }, [images.length]);

  const handleScroll = () => {
    if (!trackRef.current) return;
    setActiveIdx(Math.round(trackRef.current.scrollLeft / trackRef.current.offsetWidth));
  };

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) goTo(activeIdx + (diff > 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <Box sx={{
      position: 'relative',
      bgcolor: '#fdf6f0',
      borderRadius: '20px 0 0 20px',
      width: '100%',
      height: '215px',
      flexShrink: 0,
      alignSelf: 'stretch',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {product.label && (
        <Box sx={{
          position: 'absolute', top: 8, left: 6, zIndex: 3,
          bgcolor: '#ff2d74', color: '#fff', px: 1, py: 0.2,
          fontSize: '0.55rem', fontWeight: 700, borderRadius: '20px',
          letterSpacing: 0.4, textTransform: 'uppercase',
          boxShadow: '0 2px 6px rgba(255,45,116,0.35)',
        }}>
          {product.label}
        </Box>
      )}

      <Box ref={trackRef} onScroll={handleScroll} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        sx={{
          flex: 1,
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}>
        {images.map((src, i) => (
          <Box key={i} component="img" src={src} alt={`${product.product_name} ${i + 1}`}
            sx={{
              flex: '0 0 100%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              scrollSnapAlign: 'start',
              display: 'block',
            }}
          />
        ))}
      </Box>

      {images.length > 1 && activeIdx > 0 && (
        <IconButton onClick={() => goTo(activeIdx - 1)} size="small"
          sx={{
            position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.85)', width: 22, height: 22,
            boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
            '&:hover': { bgcolor: '#fff' },
          }}>
          <ChevronLeftIcon sx={{ fontSize: '0.85rem', color: '#374151' }} />
        </IconButton>
      )}
      {images.length > 1 && activeIdx < images.length - 1 && (
        <IconButton onClick={() => goTo(activeIdx + 1)} size="small"
          sx={{
            position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.85)', width: 22, height: 22,
            boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
            '&:hover': { bgcolor: '#fff' },
          }}>
          <ChevronRightIcon sx={{ fontSize: '0.85rem', color: '#374151' }} />
        </IconButton>
      )}

      {images.length > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, position: 'absolute', bottom: 6, width: '100%' }}>
          {images.map((_, i) => (
            <Box key={i} onClick={() => goTo(i)}
              sx={{
                width: i === activeIdx ? 12 : 5, height: 5,
                borderRadius: '50px',
                bgcolor: i === activeIdx ? '#ff2d74' : 'rgba(255,255,255,0.75)',
                cursor: 'pointer',
                transition: 'width 0.3s ease, background-color 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

// ─── Desktop Image Section ────────────────────────────────────────────────────
const DesktopImageSection = ({ product, wished, onWishToggle }) => (
  <Box sx={{
    position: 'relative', bgcolor: '#fdf6f0', overflow: 'hidden',
    borderRadius: '20px 20px 0 0', width: '100%', aspectRatio: '1 / 1',
  }}>
    {product.label && (
      <Box sx={{
        position: 'absolute', top: 10, left: 10, zIndex: 2,
        bgcolor: '#ff2d74', color: '#fff', px: 1.4, py: 0.25,
        fontSize: '0.65rem', fontWeight: 700, borderRadius: '20px',
        letterSpacing: 0.5, textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(255,45,116,0.35)',
      }}>
        {product.label}
      </Box>
    )}

    <IconButton onClick={onWishToggle}
      sx={{
        position: 'absolute', top: 8, right: 8, zIndex: 2,
        bgcolor: wished ? '#fff0f4' : 'rgba(255,255,255,0.9)',
        width: 32, height: 32, backdropFilter: 'blur(4px)',
        transition: 'all 0.2s',
        '&:hover': { bgcolor: '#fff0f4', transform: 'scale(1.1)' },
        ...(wished && { animation: `${pulse} 0.3s ease` }),
      }}>
      {wished
        ? <FavoriteIcon sx={{ fontSize: '1rem', color: '#ff2d74' }} />
        : <FavoriteBorderIcon sx={{ fontSize: '1rem', color: '#9ca3af' }} />}
    </IconButton>

    <Box sx={{
      width: '100%', height: '100%', position: 'relative', cursor: 'zoom-in',
      '&:hover .mainImg': { opacity: 0, transform: 'scale(0.95)' },
      '&:hover .hoverImg': { opacity: 1, transform: 'scale(1.06)' },
    }}>
      {[
        { cls: 'mainImg', src: product.image_url, opacity: 1 },
        { cls: 'hoverImg', src: product.hover_image || product.image_url, opacity: 0 },
      ].map(({ cls, src, opacity }) => (
        <Box key={cls} component="img" src={src} className={cls} alt={product.product_name}
          sx={{
            width: '100%', height: '100%', objectFit: 'cover',
            display: 'block', position: 'absolute', top: 0, left: 0,
            transition: 'opacity 0.45s ease, transform 0.45s ease',
            opacity, transform: 'scale(1)',
          }}
        />
      ))}
    </Box>
  </Box>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, isLoading, index = 0 }) => {
  const dispatch = useDispatch();
  const [selectedQty, setSelectedQty] = useState(1);
  const [wished, setWished] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.product_id,
      name: product.product_name,
      image: product.image_url,
      price: product.product_price * selectedQty,
      originalPrice: product.strikeout_price * selectedQty,
      selectedQty,
    }));
    toast.success(`${product.product_name} added to cart!`, { position: 'bottom-left', autoClose: 2800 });
  };



  const discount = product.strikeout_price > product.product_price
    ? Math.round(((product.strikeout_price - product.product_price) / product.strikeout_price) * 100)
    : 0;

  return (
    <StyledCard animdelay={`${index * 0.07}s`}>
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" animation="wave"
            sx={{ width: ['44%', '100%'], height: [140, 220], flexShrink: 0 }} />
          <CardContent sx={{ flex: 1 }}>
            <Skeleton variant="text" width="75%" height={22} />
            <Skeleton variant="text" width="50%" height={16} sx={{ mt: 0.5 }} />
            <Skeleton variant="text" width="40%" height={16} sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 2, borderRadius: 2 }} />
          </CardContent>
        </>
      ) : (
        <>
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignSelf: 'stretch', width: '44%', flexShrink: 0 }}>
            <MobileImageStrip product={product} wished={wished} onWishToggle={() => setWished(p => !p)} />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '100%' }}>
            <DesktopImageSection product={product} wished={wished} onWishToggle={() => setWished(p => !p)} />
          </Box>

          <CardContent sx={{ flex: 1, p: [1.5, 2], display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 700, fontSize: ['0.78rem', '1rem'], color: '#111827', letterSpacing: 0.2, lineHeight: 1.35, mb: 0.5 }}>
              {product.product_name}
            </Typography>

            <Box display="flex" alignItems="center" gap={0.4} mb={0.5}>
              <VerifiedIcon sx={{ fontSize: '0.8rem', color: '#3b82f6' }} />
              <Typography sx={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500 }}>Kudanthai Trends</Typography>
            </Box>

            <RatingStars rating={product.rating} size="0.95rem" />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap', mt: 0.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: ['0.95rem', '1.15rem'], color: '#111827' }}>
                ₹{(product.product_price * selectedQty).toLocaleString('en-IN')}
              </Typography>
              {discount > 0 && (
                <>
                  <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem', textDecoration: 'line-through' }}>
                    ₹{(product.strikeout_price * selectedQty).toLocaleString('en-IN')}
                  </Typography>
                  <Chip
                    icon={<LocalOfferOutlinedIcon sx={{ fontSize: '0.65rem !important', color: '#16a34a !important' }} />}
                    label={`${discount}% OFF`}
                    size="small"
                    sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700, bgcolor: '#dcfce7', color: '#16a34a', '& .MuiChip-label': { px: 0.8 } }}
                  />
                </>
              )}
            </Box>

            <Stack direction="column" gap={1} mt={[1.5, 1.5]}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography sx={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 500 }}>Qty:</Typography>
                <QtySelector qty={selectedQty} onChange={setSelectedQty} />
              </Box>

              <Stack direction="row" gap={0.8}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    flex: 1,
                    bgcolor: '#ff2d74',
                    textTransform: 'none',
                    borderRadius: '50px',
                    border: '1px solid #ff2d74',
                    px: 2.5,
                    '&:hover': {
                      bgcolor: '#fff',
                      color: 'black',
                      border: '1px solid #ff2d74',
                    },
                  }}
                >
                  Add to cart
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </>
      )}
    </StyledCard>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <Box sx={{ textAlign: 'center', py: 12, color: '#9ca3af' }}>
    <Typography variant="h5" fontWeight={600} mb={1}>No products found</Typography>
    <Typography variant="body2">Check back soon — we're restocking!</Typography>
  </Box>
);

// ─── Product Page ─────────────────────────────────────────────────────────────
const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const skeletonItems = Array.from({ length: 8 }, (_, i) => ({ id: i }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await api.get(`/api/product/${slug}`);
        setProducts(data.data.products);
        setCategoryName(data.data.category);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setProducts([]);
    fetchData();
  }, [slug]);

  // ── Removed old document.title line — Helmet handles it now ──────────────

  const displayItems = isLoading ? skeletonItems : products;

  return (
    <>
      {/* ── Dynamic SEO — updates automatically for every slug ── */}
      <PageSEO
        slug={slug}
        categoryName={categoryName}
        productCount={products.length}
      />

      <TopBar />
      <Navbar color="#fff" />

      <Box component="img" src="Images/leaf3.avif" alt="" aria-hidden
        sx={{ width: ['65%', '40%', '22%'], zIndex: -1, ml: [-8, -10], mt: [0, 18, -4], position: 'absolute', opacity: 0.7, filter: 'saturate(1.3)' }}
      />

      <Box sx={{ px: [2, 5, 6], pt: 9, pb: 1 }}>
        <Title title={categoryName} />
        {!isLoading && products.length > 0 && (
          <Typography sx={{ mt: 0.5, fontSize: '0.85rem', color: '#6b7280' }}>
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </Typography>
        )}
      </Box>

      <Box sx={{ px: [2, 3, 4], py: 5 }}>
        {!isLoading && products.length === 0 ? (
          <EmptyState />
        ) : (
          <Grid container spacing={[2.5, 3.5]} justifyContent="center" alignItems="stretch">
            {displayItems.map((product, index) => (
              <Grid item key={product.id ?? product.product_id} xs={12} sm={6} md={4} lg={3} xl={2.4} sx={{ display: 'flex' }}>
                <ProductCard product={product} isLoading={isLoading} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box sx={{ bgcolor: '#000', mt: 16, px: 2 }}>
        <Footer />
      </Box>
    </>
  );
};

export default ProductPage;