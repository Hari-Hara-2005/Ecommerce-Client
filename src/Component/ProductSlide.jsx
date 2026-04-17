// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Stack,
//   Skeleton,
// } from "@mui/material";
// import api from "../api";

// const ProductSkeleton = () => (
//   <Box sx={{ minWidth: 220 }}>
//     <Skeleton variant="rounded" height={220} />
//     <Skeleton width="80%" />
//     <Skeleton width="40%" />
//     <Skeleton variant="rounded" height={40} sx={{ mt: 1 }} />
//   </Box>
// );

// const NewArrivals = () => {
//   const [categories, setCategories] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState({});
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/api/category");

//         // ✅ FIX: correct response handling
//         setCategories(res.data.data || []);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ✅ Fetch Products (Parallel API calls)
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         // 🔥 parallel calls (fast)
//         const requests = categories.map((cat) =>
//           api.get(`/api/product/${cat.slug}`),
//         );

//         const responses = await Promise.all(requests);

//         let result = {};

//         responses.forEach((res, index) => {
//           const slug = categories[index].slug;

//           // ✅ FIX: correct data path + limit 6
//           result[slug] = res.data?.data?.products?.slice(0, 6) || [];
//         });

//         setCategoryProducts(result);
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (categories.length > 0) {
//       fetchProducts();
//     }
//   }, [categories]);

//   return (
//     <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
//       {categories.map((cat) => (
//         <Box key={cat._id} sx={{ mb: 6 }}>
//           {/* 🔥 Header */}
//           <Stack
//             direction="row"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={3}
//           >
//             <Box>
//               <Typography variant="h4" fontWeight="700">
//                 {cat.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 You Blink, You Miss
//               </Typography>
//             </Box>

//             <Typography
//               sx={{
//                 color: "#ff2e6d",
//                 cursor: "pointer",
//                 fontWeight: 500,
//               }}
//             >
//               View all
//             </Typography>
//           </Stack>

//           {/* 🔥 Products */}
//           <Box
//             sx={{
//               display: "flex",
//               gap: 2,
//               overflowX: "auto",
//               pb: 2,
//             }}
//           >
//             {loading ? (
//               Array.from(new Array(6)).map((_, i) => (
//                 <ProductSkeleton key={i} />
//               ))
//             ) : categoryProducts[cat.slug]?.length > 0 ? (
//               categoryProducts[cat.slug].map((item) => (
//                 <Card
//                   key={item._id}
//                   sx={{
//                     minWidth: { xs: 220, sm: 250 },
//                     borderRadius: 3,
//                     boxShadow: 2,
//                     flexShrink: 0,
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="220"
//                     image={item.image}
//                     alt={item.name}
//                     sx={{ borderRadius: "12px 12px 0 0" }}
//                   />

//                   <CardContent>
//                     <Typography fontSize={14} fontWeight={500} mb={1}>
//                       {item.name}
//                     </Typography>

//                     <Stack direction="row" spacing={1}>
//                       <Typography fontWeight={600}>₹{item.price}</Typography>

//                       <Typography
//                         sx={{
//                           textDecoration: "line-through",
//                           color: "#999",
//                           fontSize: 13,
//                         }}
//                       >
//                         ₹{item.originalPrice || item.price}
//                       </Typography>

//                       <Typography
//                         sx={{
//                           color: "#ff2e6d",
//                           fontSize: 12,
//                           fontWeight: 500,
//                         }}
//                       >
//                         {item.discount || 0}% Off
//                       </Typography>
//                     </Stack>

//                     <Button
//                       fullWidth
//                       sx={{
//                         mt: 2,
//                         backgroundColor: "#ff2e6d",
//                         color: "#fff",
//                         borderRadius: "30px",
//                         textTransform: "none",
//                         fontWeight: 600,
//                         "&:hover": {
//                           backgroundColor: "#e02660",
//                         },
//                       }}
//                     >
//                       Add to Cart
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))
//             ) : (
//               <Typography>No products found</Typography>
//             )}
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default NewArrivals;
