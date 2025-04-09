import { useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const TotalAssetsForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();
  const currentYear = new Date().getFullYear();
  const referenceYear = new Date().getMonth() < 3 ? currentYear - 2 : currentYear - 1;

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.totalAssets && Boolean(errors.totalAssets)}
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
        <InputLabel id="totalAssets-label">Total Assets as of December 31st {referenceYear}</InputLabel>
        <Select
          labelId="totalAssets-label"
          name="totalAssets"
          value={values.totalAssets}
          label={`Total Assets as of December 31st ${referenceYear}`}
          onChange={handleChange}
        >
          <MenuItem value="under_250k">Under $250,000</MenuItem>
          <MenuItem value="250k_500k">$250,000 - $500,000</MenuItem>
          <MenuItem value="500k_1m">$500,000 - $1,000,000</MenuItem>
          <MenuItem value="over_1m">Over $1,000,000</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TotalAssetsForm; 