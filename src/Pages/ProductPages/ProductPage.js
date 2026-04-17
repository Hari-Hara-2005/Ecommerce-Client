import { Card, CardContent, IconButton, Typography, Grid, Box, Stack, Button, Skeleton, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from '../../Component/Navbar';
import Title from '../../Component/Title';
import ProductNavbar from '../../Component/ProductNavbar';
import Footer from '../../Component/Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import TopBar from '../../Component/Announcement';
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
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
    flexDirection: 'column', // Change to column for larger screens
  },
}));

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




const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.product_id,
      name: product.product_name,
      image: product.image_url,
      price: product.product_price * selectedQty,
      originalPrice: product.product_price * 0 * 1.2,
      selectedQty
    }));
    toast.success('Successfully added to cart!', {
      position: 'bottom-left',
      autoClose: 3000,
    });
  }

  const [liked, setLiked] = useState(false);
  const [selectedQty, setselectedQty] = useState(1);
  const quantities = [
    { label: "250 gm", multiplier: 1 },
    { label: "500 gm", multiplier: 2 },
    { label: "750 gm", multiplier: 3 },
    { label: "1 kg", multiplier: 4 },
  ];



  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleQtyChange = (e) => {
    const newQty = e.target.value;
    setselectedQty(newQty);
  };
  // const discount = Math.round(
  //   ((original - price) / original) * 100
  // );
  const handleShoppingClick = (product) => {
    const encodedMessage = encodeURIComponent(`Hi! I'm interested in this product:\n\nName: ${product.name}\nPrice:\n\nPockets: ${selectedQty}\n\nPlease provide more details and help me place an order.`);
    const whatsappNumber = '919952857016';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareClick = async (product) => {
    const shareUrl = `https://smartdryfruitdryfruit.vercel.app/dates`;
    const message = `Check out this amazing product: ${product.name}\nPrice:\n${shareUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '+919952857016';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Product Share',
          text: message,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <StyledCard>
      {isLoading ? (
        <Skeleton variant="rectangular" animation="wave" width="100%" height={260} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: [2, 0], mt: [0, 2] }}>
          <Box
            sx={{
              width: ["7.5rem", "12rem"],
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover .mainImg": { opacity: 0 },
              "&:hover .hoverImg": { opacity: 1 }
            }}
          >
            <Box
              component="img"
              src={product.image_url}
              className="mainImg"
              sx={{
                width: ['85%', '100%'],
                top: 0,
                left: 0,
                transition: "0.5s",
                opacity: 1
              }}
            />

            <Box
              component="img"
              src={product.hover_image || product.image_url}
              className="hoverImg"
              sx={{
                width: ['85%', '100%'],
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "0.5s",
                opacity: 0
              }}
            />
          </Box>
        </Box>
      )}
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton variant="text" animation="wave" width="80%" />
            <Skeleton variant="text" animation="wave" width="60%" />
            <Skeleton variant="text" animation="wave" width="40%" />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </>
        ) : (
          <>
            <Box sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "#ff2d74",
              color: "#fff",
              px: 1.5,
              py: 0.5,
              fontSize: "0.7rem",
              fontWeight: "bold",
              borderRadius: "10px"
            }}>
              HOT
            </Box>

            <Typography component="div" color={'#000'} sx={{ textAlign: 'start', fontWeight: [700, 600], letterSpacing: 1, fontSize: ['0.8rem', '1.3rem'] }} >
              {product.product_name}
            </Typography>
            <Typography color={'#000'} sx={{ textAlign: 'start', fontWeight: 600, fontSize: '0.8rem', letterSpacing: 0.5, mt: 1, display: 'flex', }} >
              <VerifiedIcon sx={{ fontSize: '1rem' }} />
              Kudanthai Trends
            </Typography>
            <Stack direction={["column", 'row']} justifyContent={'space-between'}>
              <Box>
                <RatingStars rating={product.rating} size="1.2rem" />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>


                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#000'
                    }}
                  >
                    ₹{product.product_price * selectedQty}
                  </Typography>

                  {/* ❌ Original Price */}
                  <Typography
                    sx={{
                      color: "#888",
                      fontSize: '0.9rem',
                      textDecoration: "line-through"
                    }}
                  >
                    ₹{Math.round(product.product_price * 1.5)}
                  </Typography>

                  {/* 🔥 Offer Badge */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.3,
                      bgcolor: "#e8f5e9",
                      color: "#ff2d74",
                      px: 0.8,
                      py: 0.3,
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600
                    }}
                  >
                    <LocalOfferOutlinedIcon sx={{ fontSize: "0.8rem" }} />
                    50% OFF
                  </Box>

                </Box>
              </Box>
              <Box sx={{ display: ['flex'], alignItems: 'center', mt: [1.5, 0] }}>
                <Box sx={{ mt: [0, 2] }}>
                  <Box sx={{ display: ['flex'], alignItems: 'center', mt: [0, 1.5] }}>
                    <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />} sx={{
                      bgcolor: "#ff2d74", textTransform: 'none', borderRadius: '50px', px: [2.5], '&:hover': {
                        bgcolor: "#282828"
                      }
                    }} onClick={handleAddToCart}>
                      Add to cart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </>
        )}
      </CardContent>
    </StyledCard >
  );
};

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setcategoryName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await api.get(`/api/product/${slug}`);
        setProducts(data.data.products);
        setcategoryName(data.data.category);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setProducts([]);
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.title = categoryName || "SmartDry Fruits";
  }, [categoryName]);

  return (
    <>
      <TopBar />
      <Navbar color="#fff" />
      <Box component='img'
        src='Images/leaf3.avif'
        alt='leaf'
        sx={{
          width: ["70%", "50%", "25%", "25%", "25%"],
          zIndex: -2,
          ml: [-10],
          mt: [0, 20, -2, -2, -2],
          position: 'absolute',
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black', px: [2, 5, 4], pt: 8 }}>
        <Title title={categoryName} />
      </Box>
      <Box sx={{ textAlign: 'center', px: [2, 3, 0], py: [5], zIndex: 30 }}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3.8} lg={3.6}>
              <ProductCard product={product} isLoading={isLoading} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ bgcolor: 'black', mt: 20, px: 2 }}>
        <Footer />
      </Box>
    </>
  );
};

export default ProductPage;