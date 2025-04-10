import { Box, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleClose();
  };

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
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img 
          src="/lloyds-coverholder.svg" 
          alt="Lloyd's" 
          style={{ height: '16px' }} 
        />
        
        {user && (
          <>
            <IconButton
              onClick={handleMenu}
              size="small"
              sx={{ ml: 2 }}
            >
              <Avatar 
                sx={{ width: 32, height: 32 }}
                src={user.photoURL || undefined}
                alt={user.displayName || 'User'}
              >
                {user.displayName?.[0] || 'U'}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                {user.email}
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header; 