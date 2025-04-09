import { useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, Box, useTheme } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const AuditHistoryForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.auditHistory && Boolean(errors.auditHistory)}
        sx={{ 
          mb: 3,
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
        <InputLabel id="auditHistory-label">Audit History</InputLabel>
        <Select
          labelId="auditHistory-label"
          name="auditHistory"
          value={values.auditHistory}
          label="Audit History"
          onChange={handleChange}
        >
          <MenuItem value="no">No audits in the last 7 years</MenuItem>
          <MenuItem value="yes">Yes, had an audit in the last 7 years</MenuItem>
        </Select>
      </FormControl>

      {values.auditHistory === 'yes' && (
        <FormControl 
          fullWidth 
          error={touched.taxAdjustments && Boolean(errors.taxAdjustments)}
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
          <InputLabel id="taxAdjustments-label">Tax Adjustments</InputLabel>
          <Select
            labelId="taxAdjustments-label"
            name="taxAdjustments"
            value={values.taxAdjustments}
            label="Tax Adjustments"
            onChange={handleChange}
          >
            <MenuItem value="under_10k">Under $10,000</MenuItem>
            <MenuItem value="10k_50k">$10,000 - $50,000</MenuItem>
            <MenuItem value="over_50k">Over $50,000</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default AuditHistoryForm; 