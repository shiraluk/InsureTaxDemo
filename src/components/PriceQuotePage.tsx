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
  Grid,
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
  FormControlLabel as MuiFormControlLabel
} from '@mui/material';
import { UnderwritingFormData } from '../types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import CloseIcon from '@mui/icons-material/Close';

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

  const handleGetFinalPrice = () => {
    if (!uploads['2023'] || !uploads['2022']) {
      return;
    }
    setIsProcessing(true);
    // Simulate upload and processing
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          priceQuote: {
            immediatePayoutEnabled,
            immediatePayoutPrice,
            defendingCostEnabled,
            defendingCostAmount,
            defendingCostPrice,
            totalPrice
          }
        } 
      });
    }, 1500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
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
      setUploads(prev => ({
        ...prev,
        [currentUploadYear]: selectedFile
      }));
      handleCloseFileUpload();
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: theme.palette.background.default,
        py: 4
      }}
    >
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
                  
                  <Grid container spacing={2}>
                    {Object.entries(defendingCostPrices).map(([amount, price]) => (
                      <Grid item xs={6} sm={4} key={amount}>
                        <ButtonBase
                          sx={{
                            width: '100%',
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: defendingCostAmount === amount ? 'primary.main' : 'divider',
                            bgcolor: defendingCostAmount === amount ? 'primary.light' : 'background.paper',
                            '&:hover': {
                              bgcolor: defendingCostAmount === amount ? 'primary.light' : 'action.hover',
                            },
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
                      </Grid>
                    ))}
                  </Grid>
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
              <Typography variant="h6" sx={{ mb: 2 }}>Get Your Final Price</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Securely upload your tax returns to receive your final quote
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
                UPLOAD DOCUMENTS
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Upload Required Documents</Typography>
                  <IconButton onClick={handleCloseDialog} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Please upload your tax returns to receive your final price
                </Typography>

                <List sx={{ mb: 3 }}>
                  <ListItem 
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 2,
                      p: 2
                    }}
                  >
                    <ListItemIcon>
                      <CloudUploadIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="2023 Tax Return"
                      secondary="Upload your 2023 tax return"
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleUploadButtonClick('2023')}
                      >
                        {uploads['2023'] ? 'CHANGE' : 'UPLOAD'}
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem 
                    sx={{ 
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2
                    }}
                  >
                    <ListItemIcon>
                      <CloudUploadIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="2022 Tax Return"
                      secondary="Upload your 2022 tax return"
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleUploadButtonClick('2022')}
                      >
                        {uploads['2022'] ? 'CHANGE' : 'UPLOAD'}
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Accepted file types: PDF, JPG, JPEG, PNG
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                  Maximum file size: 10MB per file
                </Typography>

                <Typography variant="body2" color="info.main" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                  Your documents are secure and encrypted. We use industry-standard security measures to protect your sensitive information.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={handleCloseDialog}>
                    CANCEL
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!uploads['2023'] || !uploads['2022'] || isProcessing}
                    onClick={handleGetFinalPrice}
                  >
                    {isProcessing ? 'Processing...' : 'GET FINAL PRICE'}
                  </Button>
                </Box>
              </Dialog>
            </Paper>
          </Box>
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
          
          <Grid container spacing={4}>
            <Grid component="div" item xs={12} md={6}>
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
            </Grid>

            <Grid component="div" item xs={12} md={6}>
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
            </Grid>
          </Grid>
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
    </Box>
  );
};

export default PriceQuotePage; 