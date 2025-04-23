import React from "react";
import {
  Typography,
  Grid,
  Chip,
  Box,
  Switch
} from "@mui/material";
import { Email, Phone, GitHub } from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../../slices/themeSlice.js';

import "./footer.scss";

export default () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleThemeToggle = () => {
      dispatch(toggleTheme());
  };

  return (
    <Box className="footer" component="footer">
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Information:</Typography>
          <Grid 
            container 
            spacing={1} 
            sx={{
              p: 1,
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
        <Box display="flex" alignItems="center" gap={1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd" 
                    clipRule="evenodd"
                    d="M2.263 9.745L.008 12l2.255 2.255a9.941 9.941 0 001.26 3.04v3.19h3.19a9.94 9.94 0 003.04 1.26L12.007 24l2.255-2.255a9.943 9.943 0 003.04-1.26h3.19v-3.191a9.944 9.944 0 001.26-3.039L24.007 12l-2.256-2.255a9.944 9.944 0 00-1.259-3.039V3.514H17.3a9.942 9.942 0 00-3.037-1.259L12.008 0 9.752 2.255a9.941 9.941 0 00-3.037 1.259H3.523v3.192a9.942 9.942 0 00-1.26 3.039zM14.008 12c0 2.421-2.435 4.508-4.5 5.456a6 6 0 100-10.912c2.065.948 4.5 3.035 4.5 5.456z"
                    fill="#ACB6C5"
                />
            </svg>
            <Switch
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
                sx={{
                    '& .MuiSwitch-thumb': {
                        backgroundColor: '#fc9703',
                    },

                    '& .MuiSwitch-track': {
                        backgroundColor: '#ccc', 
                        opacity: 0.7,        
                    },

                    '& .Mui-checked': {
                        '& .MuiSwitch-thumb': {
                            backgroundColor: '#fff', 
                        }
                    },
                }}
            />
        </Box>
      </Box>
    </Box>
  );
};