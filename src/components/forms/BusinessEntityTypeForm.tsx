import { useFormikContext } from 'formik';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const BusinessEntityTypeForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl 
        fullWidth 
        error={touched.entityType && Boolean(errors.entityType)}
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
        <InputLabel id="entity-type-label">Business Entity Type</InputLabel>
        <Select
          labelId="entity-type-label"
          name="entityType"
          value={values.entityType}
          onChange={handleChange}
          label="Business Entity Type"
        >
          <MenuItem value="llc">LLC</MenuItem>
          <MenuItem value="corporation">Corporation</MenuItem>
          <MenuItem value="partnership">Partnership</MenuItem>
          <MenuItem value="sole_proprietorship">Sole Proprietorship</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BusinessEntityTypeForm; 