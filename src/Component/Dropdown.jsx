import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const DropdownBox = ({ open, anchorEl, onClose }) => {
  if (!open || !anchorEl) return null;

  const { bottom, left } = anchorEl.getBoundingClientRect();

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        position: 'absolute',
        top: bottom + window.scrollY,
        left: left + window.scrollX,
        zIndex: 1,
      }}
      onMouseLeave={onClose}
    >
      <Box p={2} width="300px">
        <Typography variant="h6">Industry 1</Typography>
        <Typography variant="body1">Description for Industry 1</Typography>
        <Typography variant="h6">Industry 2</Typography>
        <Typography variant="body1">Description for Industry 2</Typography>
        <Typography variant="h6">Industry 3</Typography>
        <Typography variant="body1">Description for Industry 3</Typography>
      </Box>
    </Paper>
  );
};

export default DropdownBox;
