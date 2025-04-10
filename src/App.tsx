import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import UnderwritingWizard from './components/UnderwritingWizard';
import PriceQuotePage from './components/PriceQuotePage';
import ThankYouPage from './components/ThankYouPage';
import IneligiblePage from './components/IneligiblePage';
import LoadingPage from './components/LoadingPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

console.log('App component loaded');

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  console.log('App component rendering');
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <UnderwritingWizard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/loading" 
              element={
                <ProtectedRoute>
                  <LoadingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/price-quote" 
              element={
                <ProtectedRoute>
                  <PriceQuotePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/thank-you" 
              element={
                <ProtectedRoute>
                  <ThankYouPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/ineligible" element={<IneligiblePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
