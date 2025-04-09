import { Box, CircularProgress, Typography, Container, Paper, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UnderwritingFormData } from '../types';

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
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: 6,
          width: '100%',
          maxWidth: '500px',
          mx: 2,
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
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 4
          }}
        >
          <CircularProgress 
            size={100}
            thickness={4}
            variant="determinate" 
            value={progress} 
            sx={{ 
              color: theme.palette.primary.main
            }} 
          />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                fontWeight: 500,
                color: theme.palette.text.primary
              }}
            >
              {loadingText}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '400px', mx: 'auto' }}
            >
              We're preparing your personalized insurance quote based on your information.
              This will only take a moment.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoadingPage; 