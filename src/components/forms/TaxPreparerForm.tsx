import { useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Box, useTheme } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const TaxPreparerForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const referenceYear = new Date().getMonth() < 3 ? currentYear - 2 : currentYear - 1;

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.taxPreparer && Boolean(errors.taxPreparer)}
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
        <InputLabel id="taxPreparer-label">Tax Preparer</InputLabel>
        <Select
          labelId="taxPreparer-label"
          name="taxPreparer"
          value={values.taxPreparer}
          label="Tax Preparer"
          onChange={handleChange}
        >
          <MenuItem value="tax_professional">Tax Professional</MenuItem>
          <MenuItem value="self_prepared">Self Prepared</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaxPreparerForm; 