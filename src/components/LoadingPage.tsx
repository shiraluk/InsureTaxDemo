import { Box, CircularProgress, Typography, Container, Paper, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UnderwritingFormData } from '../types';
import Header from './Header';

const LoadingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData as UnderwritingFormData;
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Analyzing your information...');

  useEffect(() => {
    if (!formData) {
      navigate('/');
      return;
    }

    // Simulate loading with different messages
    const loadingMessages = [
      'Analyzing your information...',
      'Calculating risk factors...',
      'Determining coverage options...',
      'Generating your personalized quote...',
      'Almost ready...'
    ];

    let currentMessageIndex = 0;
    const messageInterval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[currentMessageIndex]);
    }, 2000);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 200);

    // Navigate to quote page after loading completes
    const timeout = setTimeout(() => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      navigate('/price-quote', { state: { formData } });
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [formData, navigate]);

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
            maxWidth: '500px',
            p: 4,
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
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress 
              size={80}
              thickness={4}
              variant="determinate" 
              value={progress} 
              sx={{ mb: 4 }}
            />
            
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2,
                fontWeight: 500,
                fontSize: { xs: '1.75rem', sm: '2rem' },
                lineHeight: 1.2
              }}
            >
              {loadingText}
            </Typography>
            
            <Typography 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                maxWidth: '320px',
                mx: 'auto',
                lineHeight: 1.5
              }}
            >
              We're preparing your personalized insurance quote based on your information. This will only take a moment.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoadingPage; 