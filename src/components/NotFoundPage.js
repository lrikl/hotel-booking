import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'; 

export default () => {
  return (
    <Container maxWidth="md" disableGutters>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <SentimentVeryDissatisfiedIcon
            sx={{
              fontSize: '6rem',
              mb: 2, 
              color: '#fc9703',
            }}
          />

          <Typography
            variant="h2"
            component="h2" 
            sx={{
              fontWeight: 700,
              fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
              lineHeight: 1,
              mb: 2, 
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h3"
            sx={{
              mb: 2,
            }}
          >
            Ow! Page not found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4, 
              maxWidth: '500px',
            }}
          >
            It looks like you are lost. The page you are looking for does not exist or has been moved.
          </Typography>

          <Button
            variant="contained"
            component={Link} 
            to="/" 
            size="large"
            sx={{
                textTransform: 'none',
                px: 4, 
                py: 1.5, 
                background: '#fc9703',
                fontWeight: 'bold'
            }}
          >
            Back to Home
          </Button>
        </Box>
    </Container>
  );
};
