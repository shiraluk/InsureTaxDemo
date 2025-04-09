import { useFormikContext } from 'formik';
import { Box, TextField } from '@mui/material';
import { UnderwritingFormData } from '../../types';

const PersonalInfoForm = () => {
  const { values, errors, touched, handleChange } = useFormikContext<UnderwritingFormData>();

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        name="name"
        label="Full Name"
        value={values.name}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
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
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
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
      />
      <TextField
        fullWidth
        name="phone"
        label="Phone"
        value={values.phone}
        onChange={handleChange}
        error={touched.phone && Boolean(errors.phone)}
        helperText={touched.phone && errors.phone}
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
      />
    </Box>
  );
};

export default PersonalInfoForm; 