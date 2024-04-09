import  React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate({Iconsize}) {
  const size = Iconsize ||20;
  return (
    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',height:'100%' }}>
      <CircularProgress size={size} />
    </Box>
  );
}