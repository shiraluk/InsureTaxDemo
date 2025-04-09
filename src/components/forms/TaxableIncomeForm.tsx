import { useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Box, useTheme } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const TaxableIncomeForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const referenceYear = new Date().getMonth() < 3 ? currentYear - 2 : currentYear - 1;

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.taxableIncome && Boolean(errors.taxableIncome)}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          }
        }}
      >
        <InputLabel id="taxableIncome-label">Taxable Income</InputLabel>
        <Select
          labelId="taxableIncome-label"
          name="taxableIncome"
          value={values.taxableIncome}
          label="Taxable Income"
          onChange={handleChange}
        >
          <MenuItem value="under_100k">Under $100,000</MenuItem>
          <MenuItem value="100k_250k">$100,000 - $250,000</MenuItem>
          <MenuItem value="250k_500k">$250,000 - $500,000</MenuItem>
          <MenuItem value="500k_1m">$500,000 - $1,000,000</MenuItem>
          <MenuItem value="over_1m">Over $1,000,000</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaxableIncomeForm; 