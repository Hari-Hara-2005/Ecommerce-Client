import React, { useEffect, useRef } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Player } from "@lordicon/react";

import LOCK from "../Pages/lock.json";
import TRUCK from "../Pages/truck.json";
import QUALITY from "../Pages/quality.json";
import COINS from "../Pages/coins.json";

const PRIMARY = "#ff2d74";

// 🔥 Container
const FeatureContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  color: "#fff",
  boxShadow: "0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)",
}));

// 🔥 Item
const FeatureItem = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  borderColor: "rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",

  "&:hover p": {
    color: PRIMARY,
  },

  [theme.breakpoints.down("md")]: {
    "&:nth-of-type(1), &:nth-of-type(2)": {
      borderBottom: "2px solid rgba(255,255,255,0.2)",
    },
    "&:nth-of-type(1), &:nth-of-type(3)": {
      borderRight: "2px solid rgba(255,255,255,0.2)",
    },
  },

  [theme.breakpoints.up("md")]: {
    "&:not(:last-child)": {
      borderRight: "2px solid rgba(255,255,255,0.2)",
    },
  },
}));

const FeaturesSection = () => {
  const lockRef = useRef(null);
  const truckRef = useRef(null);
  const qualityRef = useRef(null);
  const coinsRef = useRef(null);

  const size = window.innerWidth < 600 ? 70 : 96;
  useEffect(() => {
    lockRef.current?.playFromBeginning();
    truckRef.current?.playFromBeginning();
    qualityRef.current?.playFromBeginning();
    coinsRef.current?.playFromBeginning();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 2, md: 5 } }}>
      <FeatureContainer>
        <Grid container justifyContent="center">
          {/* 1 */}
          <FeatureItem item xs={6} md={3}>
            <Box display="flex" justifyContent="center">
              <Player
                ref={truckRef}
                icon={TRUCK}
                size={size}
                trigger="loop"
                colors={`primary:${PRIMARY},secondary:white`}
                onComplete={() =>
                  setTimeout(() => {
                    truckRef.current?.playFromBeginning();
                  }, 200)
                }
              />
            </Box>
            <Typography mt={1}>Free Shipping Purchase Upto ₹1000</Typography>
          </FeatureItem>

          {/* 2 */}
          <FeatureItem item xs={6} md={3}>
            <Box display="flex" justifyContent="center">
              <Player
                ref={lockRef}
                icon={LOCK}
                size={size}
                trigger="loop"
                colors={`primary:${PRIMARY},secondary:white`}
                onComplete={() =>
                  setTimeout(() => {
                    lockRef.current?.playFromBeginning();
                  }, 200)
                }
              />
            </Box>
            <Typography mt={1}>Pay On Delivery</Typography>
          </FeatureItem>

          {/* 3 */}
          <FeatureItem item xs={6} md={3}>
            <Box display="flex" justifyContent="center">
              <Player
                ref={qualityRef}
                icon={QUALITY}
                size={size}
                trigger="loop"
                colors={`primary:${PRIMARY},secondary:white`}
                onComplete={() =>
                  setTimeout(() => {
                    qualityRef.current?.playFromBeginning();
                  }, 200)
                }
              />
            </Box>
            <Typography mt={1}>100% Quality Guaranteed</Typography>
          </FeatureItem>

          {/* 4 */}
          <FeatureItem item xs={6} md={3}>
            <Box display="flex" justifyContent="center">
              <Player
                ref={coinsRef}
                icon={COINS}
                size={size}
                trigger="loop"
                colors={`primary:${PRIMARY},secondary:white`}
                onComplete={() =>
                  setTimeout(() => {
                    coinsRef.current?.playFromBeginning();
                  }, 200)
                }
              />
            </Box>
            <Typography mt={1}>Reward Points On Every Purchase</Typography>
          </FeatureItem>
        </Grid>
      </FeatureContainer>
    </Box>
  );
};

export default FeaturesSection;
