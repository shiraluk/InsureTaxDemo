import { Box, Container, Typography, Paper, Button, List, ListItem, ListItemIcon, ListItemText, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from './Header';
import { PriceQuote } from '../types';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const priceQuote = location.state?.priceQuote as PriceQuote & {
    uploadPath: 'now' | 'later';
    cardAuthorized?: boolean;
    uploads?: Record<string, File | null>;
  };

  if (!priceQuote) {
    navigate('/');
    return null;
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Header />
      </Box>
      <Box 
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          p: 2
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            width: '100%',
            maxWidth: '600px',
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {priceQuote.uploadPath === 'now' 
                ? 'Thank You for Your Purchase!' 
                : 'Card Successfully Authorized!'}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {priceQuote.uploadPath === 'now'
                ? 'Your policy has been successfully created.'
                : 'Complete your purchase by uploading your tax returns.'}
            </Typography>
          </Box>

          {priceQuote.uploadPath === 'later' && (
            <Alert severity="info" sx={{ mb: 4 }}>
              Your card has been authorized for ${priceQuote.totalPrice}. We'll only charge it after you upload your tax returns.
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Next Steps:
            </Typography>
            <List>
              {priceQuote.uploadPath === 'later' ? (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <CloudUploadIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Upload Your Tax Returns"
                      secondary="You have 7 days to upload your tax returns for 2022 and 2023. We'll send you email reminders."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Automatic Processing"
                      secondary="Once you upload your returns, we'll process your payment and activate your policy."
                    />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Policy Details"
                      secondary="We've sent you an email with your policy details and reference number."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Coverage Active"
                      secondary="Your tax insurance coverage is now active."
                    />
                  </ListItem>
                </>
              )}
            </List>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{ 
                px: 4, 
                py: 1.5,
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ThankYouPage; 