import {
  Box,
  Paper,
  Typography,
  Container,
  Button,
  Alert,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const IneligiblePage = () => {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Header />
      <Container 
        maxWidth="sm" 
        sx={{
          height: 'calc(100vh - 64px)', // Subtract header height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
            <Typography variant="h4" gutterBottom>
              We're Sorry
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Based on your responses, we are unable to offer you a policy at this time.
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Our eligibility criteria are based on various factors including:
            </Alert>
            <ul>
              <li>Business size and assets</li>
              <li>Tax filing history</li>
              <li>Audit history</li>
              <li>Business structure</li>
            </ul>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => window.location.href = '/'}
            >
              Start Over
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default IneligiblePage; 