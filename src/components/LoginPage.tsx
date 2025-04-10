import { Box, Button, Container, Paper, Typography, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import { useState } from 'react';

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      console.log('Starting Google sign-in...');
      await signInWithGoogle();
      console.log('Sign-in successful, navigating...');
      navigate('/');
    } catch (error) {
      console.error('Failed to sign in:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}
    >
      <Header />
      <Container 
        maxWidth="sm" 
        sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            width: '100%',
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
            Welcome Back
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Sign in to manage your insurance quotes and documents
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Button
            variant="contained"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Sign in with Google
          </Button>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 