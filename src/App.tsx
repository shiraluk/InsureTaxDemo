import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import UnderwritingWizard from './components/UnderwritingWizard';
import PriceQuotePage from './components/PriceQuotePage';
import ThankYouPage from './components/ThankYouPage';
import IneligiblePage from './components/IneligiblePage';
import LoadingPage from './components/LoadingPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<UnderwritingWizard />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/price-quote" element={<PriceQuotePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/ineligible" element={<IneligiblePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
