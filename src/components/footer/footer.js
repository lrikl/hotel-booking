import React from "react";
import {
  Typography,
  Grid,
  Chip,
  Box
} from "@mui/material";
import { Email, Phone, GitHub } from "@mui/icons-material";

import "./footer.scss";

export default () => {
  return (
    <Box component="footer" className="footer">
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Information:</Typography>
      <Grid 
        container 
        spacing={2} 
        sx={{
          p: 2,
            '& .MuiChip-outlined': { 
              borderColor: '#fc9703',
  
              '& .MuiChip-icon': {
                color: '#fc9703',
              },
            },
          }}
        >
        <Grid>
        <Chip
            icon={<Phone />}
            label="+38 (066) 001-25-54"
            variant="outlined"
            component="a"
            href="tel:+380660012554"
            clickable
          />
        </Grid>
        <Grid >
        <Chip
            icon={<Email />}
            label="tihomiirov@gmail.com"
            variant="outlined"
            component="a" 
            href="mailto:tihomiirov@gmail.com"
            clickable 
          />
        </Grid>
        <Grid>
          <Chip icon={<GitHub />} 
            label="GitHub" 
            target="_blank" 
            component="a"
            href="https://github.com/lrikl" 
            clickable 
            variant="outlined" />
        </Grid>
      </Grid>
    </Box>
  );
};