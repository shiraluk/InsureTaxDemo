import { useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Box, useTheme } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const ForeignSubsidiariesForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.foreignSubsidiaries && Boolean(errors.foreignSubsidiaries)}
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
        <InputLabel id="foreignSubsidiaries-label">Foreign Subsidiaries</InputLabel>
        <Select
          labelId="foreignSubsidiaries-label"
          name="foreignSubsidiaries"
          value={values.foreignSubsidiaries}
          label="Foreign Subsidiaries"
          onChange={handleChange}
        >
          <MenuItem value="no">No foreign subsidiaries</MenuItem>
          <MenuItem value="yes">Yes, has foreign subsidiaries</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ForeignSubsidiariesForm; 