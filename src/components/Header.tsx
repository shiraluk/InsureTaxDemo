import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'white'
      }}
    >
      <img 
        src="/insuretax-logo.svg" 
        alt="InsureTax" 
        style={{ height: '24px' }} 
      />
      <img 
        src="/lloyds-coverholder.svg" 
        alt="Lloyd's" 
        style={{ height: '16px' }} 
      />
    </Box>
  );
};

export default Header; 