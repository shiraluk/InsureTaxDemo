import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stepper, Step, StepLabel, Paper, Container, Button, Typography, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { UnderwritingFormData } from '../types';
import PersonalInfoForm from './forms/PersonalInfoForm';
import BusinessEntityTypeForm from './forms/BusinessEntityTypeForm';
import TotalAssetsForm from './forms/TotalAssetsForm';
import TaxableIncomeForm from './forms/TaxableIncomeForm';
import TaxPreparerForm from './forms/TaxPreparerForm';
import AuditHistoryForm from './forms/AuditHistoryForm';
import TaxAmendmentsForm from './forms/TaxAmendmentsForm';
import ForeignSubsidiariesForm from './forms/ForeignSubsidiariesForm';
import Header from './Header';

const steps = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8'
];

const stepQuestions = [
  'What is your name?',
  'What is the business entity type?',
  'What were the total business assets?',
  'What was the taxable income?',
  'Who prepared the tax returns?',
  'Was the business audited?',
  'Has the business filed amended returns?',
  'Does the business have foreign subsidiaries?'
];

const initialValues: UnderwritingFormData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '555-555-5555',
  entityType: 'llc',
  totalAssets: 'under_250k',
  taxableIncome: 'under_100k',
  taxPreparer: 'professional',
  auditHistory: 'no',
  taxAmendments: 'no',
  foreignSubsidiaries: 'no'
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  entityType: Yup.string().required('Entity type is required'),
  totalAssets: Yup.string().required('Total assets is required'),
  taxableIncome: Yup.string().required('Taxable income is required'),
  taxPreparer: Yup.string().required('Tax preparer is required'),
  auditHistory: Yup.string().required('Audit history is required'),
  taxAmendments: Yup.string().required('Tax amendments is required'),
  foreignSubsidiaries: Yup.string().required('Foreign subsidiaries is required')
});

const UnderwritingWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNext = (values: UnderwritingFormData) => {
    if (activeStep === steps.length - 1) {
      // Check eligibility
      const isEligible = checkEligibility(values);
      if (isEligible) {
        navigate('/loading', { state: { formData: values } });
      } else {
        navigate('/ineligible');
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const checkEligibility = (values: UnderwritingFormData): boolean => {
    // Add your eligibility logic here
    // Example: Check if total assets are under 50M
    const totalAssets = parseFloat(values.totalAssets.replace(/[^0-9.-]+/g, ''));
    if (totalAssets > 50000000) {
      return false;
    }
    return true;
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <BusinessEntityTypeForm />;
      case 2:
        return <TotalAssetsForm />;
      case 3:
        return <TaxableIncomeForm />;
      case 4:
        return <TaxPreparerForm />;
      case 5:
        return <AuditHistoryForm />;
      case 6:
        return <TaxAmendmentsForm />;
      case 7:
        return <ForeignSubsidiariesForm />;
      default:
        return 'Unknown step';
    }
  };

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
          p: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Paper 
          elevation={6} 
          sx={{ 
            width: '100%',
            maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '1000px' },
            p: { xs: 2, sm: 3, md: 4 },
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
              background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 3, sm: 4 }, 
              fontWeight: 600,
              color: 'primary.main',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
            }}
          >
            Business Insurance Quote
          </Typography>
          
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{
              '& .MuiStepLabel-label': {
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              },
              '& .MuiStepLabel-label.Mui-active': {
                color: 'primary.main'
              },
              '& .MuiStepLabel-label.Mui-completed': {
                color: 'success.main'
              }
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ 
            mt: { xs: 4, sm: 6 }, 
            minHeight: { xs: '300px', sm: '350px' }, 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                textAlign: 'center', 
                mb: { xs: 3, sm: 4 },
                fontWeight: 500,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              {stepQuestions[activeStep]}
            </Typography>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleNext}
            >
              {({ values, handleSubmit }) => (
                <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '500px' },
                    margin: '0 auto'
                  }}>
                    {getStepContent(activeStep)}
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mt: { xs: 3, sm: 4 },
                    pt: { xs: 2, sm: 3 },
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'background.paper',
                    borderTop: 1,
                    borderColor: 'divider',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '500px' },
                    margin: '0 auto'
                  }}>
                    <Button
                      variant="outlined"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      sx={{ 
                        px: { xs: 3, sm: 4 },
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ 
                        px: { xs: 3, sm: 4 },
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Get Quote' : 'Next'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UnderwritingWizard; 