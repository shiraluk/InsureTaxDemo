import { useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { PriceQuote } from '../types';

const ThankYouPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const priceQuote = location.state?.priceQuote as PriceQuote;

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
        py: 4
      }}
    >
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 5, 
            width: '1280px',
            borderRadius: 2,
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
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: theme.palette.primary.main
              }}
            >
              Thank You for Your Purchase!
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Your policy has been successfully created.
            </Typography>
          </Box>

          <Box sx={{ 
            mt: 4, 
            p: 4, 
            bgcolor: 'background.default', 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 500,
                color: theme.palette.primary.main,
                mb: 3
              }}
            >
              Next Steps:
            </Typography>
            <List>
              <ListItem sx={{ mb: 2 }}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Upload Tax Returns
                    </Typography>
                  }
                  secondary="Please upload your tax returns for the last three years. You can do this now or later through the email link we'll send you."
                />
              </ListItem>
              <ListItem sx={{ mb: 2 }}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Check Your Email
                    </Typography>
                  }
                  secondary="We've sent you an email with your policy details and a reference ID. Please keep this for your records."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Policy Activation
                    </Typography>
                  }
                  secondary="Your policy will be activated once we receive and verify your tax returns."
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => window.location.href = '/'}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ThankYouPage; 