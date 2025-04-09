import { useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Box, useTheme } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const TaxAmendmentsForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.taxAmendments && Boolean(errors.taxAmendments)}
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
        <InputLabel id="taxAmendments-label">Tax Amendments</InputLabel>
        <Select
          labelId="taxAmendments-label"
          name="taxAmendments"
          value={values.taxAmendments}
          label="Tax Amendments"
          onChange={handleChange}
        >
          <MenuItem value="no">No amended returns in the last 4 years</MenuItem>
          <MenuItem value="yes">Yes, filed amended returns</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaxAmendmentsForm; 