// Last updated: April 9, 2025 - File upload functionality added
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Container, 
  Button, 
  Switch, 
  FormControlLabel, 
  Alert,
  Divider,
  useTheme,
  Stack,
  ButtonBase,
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel as MuiFormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import CloseIcon from '@mui/icons-material/Close';
<<<<<<< HEAD
import { UnderwritingFormData } from '../types';
=======
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UnderwritingFormData } from '../types';
import Header from './Header';
>>>>>>> 933b6d0335c4c7be9b4d28617f760eed2339098f

const PriceQuotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const formData = location.state?.formData as UnderwritingFormData;
  
  const [immediatePayoutEnabled, setImmediatePayoutEnabled] = useState(true);
  const [defendingCostEnabled, setDefendingCostEnabled] = useState(true);
  const [defendingCostAmount, setDefendingCostAmount] = useState('100k');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploads, setUploads] = useState({
    '2023': null as File | null,
    '2022': null as File | null
  });
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [currentUploadYear, setCurrentUploadYear] = useState<'2023' | '2022' | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [calendarYear, setCalendarYear] = useState('');
  const [grossReceipts, setGrossReceipts] = useState('');
  const [taxPreparer, setTaxPreparer] = useState('');
  const [endOfYearAssets, setEndOfYearAssets] = useState('');
  const [balanceSheetNotSubmitted, setBalanceSheetNotSubmitted] = useState(false);
  const [uploadPath, setUploadPath] = useState<'now' | 'later' | null>(null);
  const [paymentStep, setPaymentStep] = useState(0);
  const [cardNumber, setCardNumber] = useState('4242424242424242');
  const [cardExpiry, setCardExpiry] = useState('12/25');
  const [cardCVC, setCardCVC] = useState('123');
  const [cardName, setCardName] = useState('John Doe');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const [grossReceipts2023, setGrossReceipts2023] = useState('');
  const [grossReceipts2022, setGrossReceipts2022] = useState('');
  const [taxPreparer2023, setTaxPreparer2023] = useState('');
  const [taxPreparer2022, setTaxPreparer2022] = useState('');
  const [endOfYearAssets2023, setEndOfYearAssets2023] = useState('');
  const [endOfYearAssets2022, setEndOfYearAssets2022] = useState('');
  const [balanceSheetNotSubmitted2023, setBalanceSheetNotSubmitted2023] = useState(false);
  const [balanceSheetNotSubmitted2022, setBalanceSheetNotSubmitted2022] = useState(false);

  const immediatePayoutPrice = immediatePayoutEnabled ? 1000 : 0;
  const defendingCostPrices: Record<string, number> = {
    '25k': 1250,
    '50k': 2500,
    '75k': 3750,
    '100k': 5000,
    '150k': 7500,
    '200k': 10000
  };
  const defendingCostPrice = defendingCostEnabled ? defendingCostPrices[defendingCostAmount] : 0;
  const totalPrice = immediatePayoutPrice + defendingCostPrice;

  useEffect(() => {
    if (!formData) {
      navigate('/');
    }
  }, [formData, navigate]);

  const handleDefendingCostAmountChange = (
    event: React.MouseEvent<HTMLElement>,
    newAmount: string,
  ) => {
    if (newAmount !== null) {
      setDefendingCostAmount(newAmount);
    }
  };

  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleFileUpload = (year: '2023' | '2022') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploads(prev => ({
        ...prev,
        [year]: file
      }));
    }
  };

  const handleUploadPathSelect = (path: 'now' | 'later') => {
    setUploadPath(path);
    if (path === 'later') {
      setPaymentStep(0);
    }
  };

  const handleAuthorizeCard = () => {
    // In a real implementation, this would call your payment processor's API
    // to authorize (but not charge) the card
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          priceQuote: {
            immediatePayoutEnabled,
            immediatePayoutPrice,
            defendingCostEnabled,
            defendingCostAmount,
            defendingCostPrice,
            totalPrice,
            uploadPath: 'later',
            cardAuthorized: true
          }
        } 
      });
    }, 1500);
  };

  const handleGetFinalPrice = () => {
    if (uploadPath === 'now' && (!uploads['2023'] || !uploads['2022'])) {
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          priceQuote: {
            immediatePayoutEnabled,
            immediatePayoutPrice,
            defendingCostEnabled,
            defendingCostAmount,
            defendingCostPrice,
            totalPrice,
            uploadPath: 'now',
            uploads
          }
        } 
      });
    }, 1500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      
      // Demo: Auto-populate form fields after file drop
      if (currentUploadYear === '2023') {
        setCalendarYear('2023');
        setGrossReceipts('1,250,000');
        setTaxPreparer('cpa');
        setEndOfYearAssets('850,000');
      } else {
        setCalendarYear('2022');
        setGrossReceipts('1,100,000');
        setTaxPreparer('cpa');
        setEndOfYearAssets('750,000');
      }
    }
  };

  const handleFiles = (file: File) => {
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Demo: Auto-populate form fields after file selection
      if (currentUploadYear === '2023') {
        setCalendarYear('2023');
        setGrossReceipts('1,250,000');
        setTaxPreparer('cpa');
        setEndOfYearAssets('850,000');
      } else {
        setCalendarYear('2022');
        setGrossReceipts('1,100,000');
        setTaxPreparer('cpa');
        setEndOfYearAssets('750,000');
      }
    }
  };

  const handleUploadButtonClick = (year: '2023' | '2022') => {
    setCurrentUploadYear(year);
    setFileUploadDialogOpen(true);
  };

  const handleCloseFileUpload = () => {
    setFileUploadDialogOpen(false);
    setSelectedFile(null);
    setCalendarYear('');
    setGrossReceipts('');
    setTaxPreparer('');
    setEndOfYearAssets('');
    setBalanceSheetNotSubmitted(false);
    setCurrentUploadYear(null);
  };

  const handleSubmitFileUpload = () => {
    if (currentUploadYear && selectedFile) {
      // Demo mode: Populate the form data after file upload
      setUploads(prev => ({ ...prev, [currentUploadYear]: selectedFile }));
      
      if (currentUploadYear === '2023') {
        setGrossReceipts2023('1,250,000');
        setTaxPreparer2023('cpa');
        setEndOfYearAssets2023('850,000');
        setBalanceSheetNotSubmitted2023(false);
      } else {
        setGrossReceipts2022('1,100,000');
        setTaxPreparer2022('cpa');
        setEndOfYearAssets2022('750,000');
        setBalanceSheetNotSubmitted2022(false);
      }
      handleCloseFileUpload();
    }
  };

  const getUploadLaterStep = () => {
    switch(paymentStep) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Review Terms & Consent
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                mb: 3, 
                bgcolor: 'grey.50',
                maxHeight: '200px',
                overflow: 'auto'
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', fontFamily: 'monospace' }}>
                COVERAGE UNDER THE PROPOSED POLICY IS NOT EFFECT UNTIL AND UNLESS A COMPLETED AND FILED TAX RETURN HAS BEEN PROVIDED TO US AND WE HAVE NOTIFIED YOU IN WRITING THAT UNDERWRITING IS COMPLETE, PAYMENT HAS BEEN RECEIVED, THE POLICY HAS BEEN ISSUED, AND THE POLICY EFFECTIVE DATE.

                BY SIGNING THIS ACKNOWLEDGEMENT, YOU GIVE US INSTRUCTIONS TO BIND COVERAGE BASED ON THESE CONDITIONS AND TERMS AND QUOTE PROVIDE ON {currentDate}.

                COVERAGE IS NOT IN EFFECTIVE UNTIL WE HAVE NOTIFIED YOU IN WRITING OF THE POLICY EFFECTIVE DATE DETERMINED BY US.
              </Typography>
            </Paper>
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label="I have read and understand the terms above"
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => setUploadPath(null)}>
                Back
              </Button>
              <Button
                variant="contained"
                disabled={!termsAccepted}
                onClick={() => setPaymentStep(1)}
              >
                Continue to Card Details
              </Button>
            </Box>
          </>
        );

      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Card Authorization
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your card will only be authorized now. We'll charge it after you upload your tax returns.
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                fullWidth
              />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  label="Expiry Date"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
                <TextField
                  label="CVC"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                />
              </Box>
              <TextField
                label="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                fullWidth
              />
            </Stack>

            <Alert severity="info" sx={{ mb: 3 }}>
              You'll have 7 days to upload your tax returns. We'll send you email reminders.
            </Alert>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => setPaymentStep(0)}>
                Back
              </Button>
              <Button
                variant="contained"
                disabled={!cardNumber || !cardExpiry || !cardCVC || !cardName || isProcessing}
                onClick={handleAuthorizeCard}
              >
                {isProcessing ? 'Processing...' : 'Authorize Card'}
              </Button>
            </Box>
          </>
        );
    }
  };

  const isUploadFormValid = () => {
    const has2023Data = uploads['2023'] && grossReceipts2023 && taxPreparer2023 && endOfYearAssets2023;
    const has2022Data = uploads['2022'] && grossReceipts2022 && taxPreparer2022 && endOfYearAssets2022;
    return has2023Data && has2022Data && !isProcessing;
  };

  if (!formData) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: theme.palette.background.default,
      }}
    >
<<<<<<< HEAD
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 4, position: 'relative' }}>
          {/* Left column - Coverage options */}
          <Box sx={{ flex: 1, maxWidth: '800px' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Coverage Options
            </Typography>

            {/* Immediate Payout Option */}
            <Paper sx={{ mb: 3, p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ShieldOutlinedIcon color="primary" />
                  <Box>
                    <Typography variant="h6">Immediate Payout</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive compensation quickly without lengthy claims process
                    </Typography>
                  </Box>
                </Stack>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={immediatePayoutEnabled}
                      onChange={(e) => setImmediatePayoutEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={<Typography color="primary">+$1,000/year</Typography>}
                  labelPlacement="start"
                />
              </Box>
              {immediatePayoutEnabled && (
                <Alert 
                  icon={<InfoOutlinedIcon />} 
                  severity="info"
                  sx={{ 
                    borderRadius: 1,
                    '& .MuiAlert-message': { width: '100%' }
                  }}
                >
                  For an additional $1,000 per year, receive automatic payouts based on predefined audit triggers
                  without waiting for claims processing.
                </Alert>
              )}
            </Paper>

            {/* Defending Cost Coverage */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <GavelOutlinedIcon color="primary" />
                  <Box>
                    <Typography variant="h6">Defending Cost Coverage</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Comprehensive protection for legal and professional fees
                    </Typography>
                  </Box>
                </Stack>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={defendingCostEnabled}
                      onChange={(e) => setDefendingCostEnabled(e.target.checked)}
                      color="primary"
                    />
                  }
                  label=""
                />
              </Box>

              {defendingCostEnabled && (
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Coverage Amount: ${defendingCostAmount}
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                    {Object.entries(defendingCostPrices).map(([amount, price]) => (
                      <Box key={amount} sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}>
                        <ButtonBase
                          sx={{
                            width: '100%',
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            textAlign: 'center',
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                          onClick={(e) => handleDefendingCostAmountChange(e, amount)}
                        >
                          <Stack spacing={1}>
                            <Typography variant="h6" color={defendingCostAmount === amount ? 'primary' : 'text.primary'}>
                              ${amount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              +${price.toLocaleString()}/year
                            </Typography>
                          </Stack>
                        </ButtonBase>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          </Box>

          {/* Right column - Price summary */}
          <Box 
            sx={{ 
              width: '380px',
              position: 'sticky',
              top: 20,
              alignSelf: 'flex-start'
            }}
          >
            <Paper 
              sx={{ 
                p: 3,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                mb: 3
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>Initial Price</Typography>
              <Typography variant="h2" sx={{ fontWeight: 600, mb: 4 }}>
                ${totalPrice.toLocaleString()}
=======
      <Header />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 380px' }, gap: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Coverage Options
>>>>>>> 933b6d0335c4c7be9b4d28617f760eed2339098f
              </Typography>

              {/* Immediate Payout Option */}
              <Paper sx={{ mb: 3, p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ShieldOutlinedIcon color="primary" />
                    <Box>
                      <Typography variant="h6">Immediate Payout</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Receive compensation quickly without lengthy claims process
                      </Typography>
                    </Box>
                  </Stack>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={immediatePayoutEnabled}
                        onChange={(e) => setImmediatePayoutEnabled(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={<Typography color="primary">+$1,000/year</Typography>}
                    labelPlacement="start"
                  />
                </Box>
                {immediatePayoutEnabled && (
                  <Alert 
                    icon={<InfoOutlinedIcon />} 
                    severity="info"
                    sx={{ 
                      borderRadius: 1,
                      '& .MuiAlert-message': { width: '100%' }
                    }}
                  >
                    For an additional $1,000 per year, receive automatic payouts based on predefined audit triggers
                    without waiting for claims processing.
                  </Alert>
                )}
              </Paper>

              {/* Defending Cost Coverage */}
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <GavelOutlinedIcon color="primary" />
                    <Box>
                      <Typography variant="h6">Defending Cost Coverage</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Comprehensive protection for legal and professional fees
                      </Typography>
                    </Box>
                  </Stack>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={defendingCostEnabled}
                        onChange={(e) => setDefendingCostEnabled(e.target.checked)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </Box>

                {defendingCostEnabled && (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Coverage Amount: ${defendingCostAmount}
                    </Typography>
                    
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                      {Object.entries(defendingCostPrices).map(([amount, price]) => (
                        <Box key={amount} sx={{ gridColumn: { xs: 'span 2', sm: 'span 1' } }}>
                          <ButtonBase
                            sx={{
                              width: '100%',
                              p: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              textAlign: 'center',
                              '&:hover': {
                                bgcolor: 'action.hover'
                              }
                            }}
                            onClick={(e) => handleDefendingCostAmountChange(e, amount)}
                          >
                            <Stack spacing={1}>
                              <Typography variant="h6" color={defendingCostAmount === amount ? 'primary' : 'text.primary'}>
                                ${amount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                +${price.toLocaleString()}/year
                              </Typography>
                            </Stack>
                          </ButtonBase>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </Paper>
            </Box>

            <Box>
              <Paper 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  mb: 3
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>Initial Price</Typography>
                <Typography variant="h2" sx={{ fontWeight: 600, mb: 4 }}>
                  ${totalPrice.toLocaleString()}
                </Typography>

                <Stack spacing={3}>
                  {immediatePayoutEnabled && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography>Immediate Payout</Typography>
                        <Typography>+${immediatePayoutPrice.toLocaleString()}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Automatic payment triggers
                      </Typography>
                    </Box>
                  )}

                  {defendingCostEnabled && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography>Defending Cost</Typography>
                        <Typography>+${defendingCostPrice.toLocaleString()}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Coverage up to ${defendingCostAmount}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                      Final price may vary based on uploaded documents
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Lock In Your Rate</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Secure your coverage now - upload tax returns today or within 7 days
                </Typography>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUploadClick}
                  sx={{ 
                    py: 2,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  }}
                >
                  SECURE YOUR COVERAGE
                </Button>

                <Dialog
                  open={uploadDialogOpen}
                  onClose={handleCloseDialog}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      p: 3
                    }
                  }}
                >
                  {uploadPath === null ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Choose Your Path</Typography>
                        <IconButton onClick={handleCloseDialog} size="small">
                          <CloseIcon />
                        </IconButton>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        You can either upload your tax returns now to get your final price immediately, or secure your rate now and upload the documents later.
                      </Typography>

                      <Stack spacing={3}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CloudUploadIcon color="primary" />
                              <Typography variant="subtitle1">Upload Now</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              • Get your final price immediately
                              <br />
                              • Complete your purchase today
                              <br />
                              • Takes about 5 minutes
                            </Typography>
                            <Button
                              variant="contained"
                              size="large"
                              onClick={() => setUploadPath('now')}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload Now
                            </Button>
                          </Stack>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 3 }}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <AccessTimeIcon color="primary" />
                              <Typography variant="subtitle1">Upload Later</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              • Lock in your rate today
                              <br />
                              • Authorize your card now (no charge)
                              <br />
                              • Upload documents within 7 days
                              <br />
                              • We'll send you email reminders
                            </Typography>
                            <Button
                              variant="outlined"
                              size="large"
                              onClick={() => setUploadPath('later')}
                              startIcon={<AccessTimeIcon />}
                            >
                              Upload Later
                            </Button>
                          </Stack>
                        </Paper>
                      </Stack>
                    </>
                  ) : uploadPath === 'now' ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6">Upload Required Documents</Typography>
                        <IconButton onClick={() => setUploadPath(null)} size="small">
                          <ArrowBackIcon />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Please upload your tax returns to receive your final price
                      </Typography>

                      <Stack spacing={2} sx={{ mb: 3 }}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CloudUploadIcon color="primary" />
                              <Box>
                                <Typography variant="subtitle1">2023 Tax Return</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {uploads['2023'] ? uploads['2023'].name : 'Upload your 2023 tax return'}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              variant="outlined"
                              onClick={() => handleUploadButtonClick('2023')}
                            >
                              {uploads['2023'] ? 'CHANGE' : 'UPLOAD'}
                            </Button>
                          </Box>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CloudUploadIcon color="primary" />
                              <Box>
                                <Typography variant="subtitle1">2022 Tax Return</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {uploads['2022'] ? uploads['2022'].name : 'Upload your 2022 tax return'}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              variant="outlined"
                              onClick={() => handleUploadButtonClick('2022')}
                            >
                              {uploads['2022'] ? 'CHANGE' : 'UPLOAD'}
                            </Button>
                          </Box>
                        </Paper>
                      </Stack>

                      <Typography variant="caption" color="text.secondary">
                        Accepted file types: PDF, JPG, JPEG, PNG
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Maximum file size: 10MB per file
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 3 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="body2" color="primary">
                          Your documents are secure and encrypted. We use industry-standard security measures to protect your sensitive information.
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => setUploadPath(null)}>
                          CANCEL
                        </Button>
                        <Button
                          variant="contained"
                          disabled={!uploads['2023'] || !uploads['2022']}
                          onClick={handleGetFinalPrice}
                        >
                          {isProcessing ? 'Processing...' : 'GET FINAL PRICE'}
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Stepper activeStep={paymentStep} sx={{ mb: 3 }}>
                        <Step>
                          <StepLabel>Review Terms</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Authorize Card</StepLabel>
                        </Step>
                        <Step>
                          <StepLabel>Upload Later</StepLabel>
                        </Step>
                      </Stepper>

                      {getUploadLaterStep()}
                    </>
                  )}
                </Dialog>

                {/* File Upload Dialog */}
                <Dialog
                  open={fileUploadDialogOpen}
                  onClose={handleCloseFileUpload}
                  maxWidth="sm"
                  fullWidth
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      p: 3
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Add a tax year for coverage</Typography>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>Upload 1120-S tax return</Typography>
                      <Box
                        component="div"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={(e) => {
                          e.preventDefault();
                          handleDrag(e);
                        }}
                        onDrop={handleDrop}
                        sx={{
                          border: '2px dashed',
                          borderColor: dragActive ? 'primary.main' : 'divider',
                          borderRadius: 2,
                          p: 3,
                          textAlign: 'center',
                          cursor: 'pointer',
                          bgcolor: dragActive ? 'action.hover' : 'background.paper',
                          mb: 2
                        }}
                        onClick={handleBrowseClick}
                      >
                        <input
                          id="fileInput"
                          type="file"
                          onChange={handleFileInputChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          style={{ display: 'none' }}
                        />
                        <Box sx={{ mb: 2 }}>
                          <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        </Box>
                        <Typography>
                          Drag and drop here, or <Button component="span" sx={{ p: 0, minWidth: 'auto' }}>browse</Button>
                        </Typography>
                      </Box>

                      {selectedFile && (
                        <Box>
                          <Typography variant="subtitle2">Files</Typography>
                          <Paper variant="outlined" sx={{ p: 1, mt: 1 }}>
                            <Typography>{selectedFile.name}</Typography>
                          </Paper>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>Filing Information</Typography>
                      <Stack spacing={2}>
                        <Select
                          value={calendarYear}
                          onChange={(e) => setCalendarYear(e.target.value)}
                          displayEmpty
                          fullWidth
                          renderValue={calendarYear !== '' ? undefined : () => "Calendar year"}
                        >
                          <MenuItem value="2023">2023</MenuItem>
                          <MenuItem value="2022">2022</MenuItem>
                        </Select>

                        <TextField
                          fullWidth
                          placeholder="Gross receipts or sales"
                          value={grossReceipts}
                          onChange={(e) => setGrossReceipts(e.target.value)}
                        />

                        <Select
                          value={taxPreparer}
                          onChange={(e) => setTaxPreparer(e.target.value)}
                          displayEmpty
                          fullWidth
                          renderValue={taxPreparer !== '' ? undefined : () => "Tax return preparer"}
                        >
                          <MenuItem value="self">Self-prepared</MenuItem>
                          <MenuItem value="cpa">CPA</MenuItem>
                          <MenuItem value="enrolled">Enrolled Agent</MenuItem>
                        </Select>

                        <TextField
                          fullWidth
                          placeholder="End-of-year assets ($)"
                          value={endOfYearAssets}
                          onChange={(e) => setEndOfYearAssets(e.target.value)}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={balanceSheetNotSubmitted}
                              onChange={(e) => setBalanceSheetNotSubmitted(e.target.checked)}
                            />
                          }
                          label="Balance sheet was not submitted"
                        />
                      </Stack>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button onClick={handleCloseFileUpload}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!selectedFile || !calendarYear || !grossReceipts || !taxPreparer || !endOfYearAssets}
                      onClick={handleSubmitFileUpload}
                    >
                      Add Tax Year
                    </Button>
                  </Box>
                </Dialog>
              </Paper>
            </Box>
          </Box>
<<<<<<< HEAD
        </Box>
      </Container>

      {/* File Upload Dialog */}
      <Dialog 
        open={fileUploadDialogOpen} 
        onClose={handleCloseFileUpload}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 3
          }
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Add a tax year for coverage</Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Upload 1120-S tax return</Typography>
              
              <Box
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                sx={{
                  border: '2px dashed',
                  borderColor: dragActive ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: dragActive ? 'action.hover' : 'background.paper',
                  mb: 2
                }}
                onClick={handleBrowseClick}
              >
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                />
                <Box sx={{ mb: 2 }}>
                  <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography>
                  Drag and drop here, or <Button component="span" sx={{ p: 0, minWidth: 'auto' }}>browse</Button>
                </Typography>
              </Box>

              {selectedFile && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Files</Typography>
                  <Paper variant="outlined" sx={{ p: 1, mt: 1 }}>
                    <Typography>{selectedFile.name}</Typography>
                  </Paper>
                </Box>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Filing Information</Typography>
              
              <Stack spacing={2}>
                <Select
                  value={calendarYear}
                  onChange={(e) => setCalendarYear(e.target.value)}
                  displayEmpty
                  fullWidth
                  renderValue={calendarYear !== '' ? undefined : () => "Calendar year"}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                </Select>

                <TextField
                  fullWidth
                  placeholder="Gross receipts or sales"
                  value={grossReceipts}
                  onChange={(e) => setGrossReceipts(e.target.value)}
                />

                <Select
                  value={taxPreparer}
                  onChange={(e) => setTaxPreparer(e.target.value)}
                  displayEmpty
                  fullWidth
                  renderValue={taxPreparer !== '' ? undefined : () => "Tax return preparer"}
                >
                  <MenuItem value="self">Self-prepared</MenuItem>
                  <MenuItem value="cpa">CPA</MenuItem>
                  <MenuItem value="enrolled">Enrolled Agent</MenuItem>
                </Select>

                <TextField
                  fullWidth
                  placeholder="End-of-year assets ($)"
                  value={endOfYearAssets}
                  onChange={(e) => setEndOfYearAssets(e.target.value)}
                />

                <MuiFormControlLabel
                  control={
                    <Checkbox
                      checked={balanceSheetNotSubmitted}
                      onChange={(e) => setBalanceSheetNotSubmitted(e.target.checked)}
                    />
                  }
                  label="Balance sheet was not submitted"
                />
              </Stack>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleCloseFileUpload}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitFileUpload}
            disabled={!selectedFile || !calendarYear}
          >
            Submit
          </Button>
        </Box>
      </Dialog>
=======
        </Container>
      </Box>
>>>>>>> 933b6d0335c4c7be9b4d28617f760eed2339098f
    </Box>
  );
};

export default PriceQuotePage; 