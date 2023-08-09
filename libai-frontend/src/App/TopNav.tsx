import React from 'react';
import { Box, IconButton, Typography, Divider } from '@mui/material';
import { LogoutOutlined, DarkMode, LightMode, AccountBox, AccountCircle, Menu } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from './AuthContext';
import { useTheme } from '@emotion/react';
import { useLocation, Location } from 'react-router-dom';

interface TopNavProps {
  themeMode: 'light' | 'dark';
  toggleThemeMode: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const TopNav = ({
  themeMode, toggleThemeMode, toggleSidebar, isSidebarOpen
}: TopNavProps) => {
  const {
    user, logout
  } = useAuthContext();

  const loc: Location  = useLocation();

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between', // This will push items to the edges
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: '1', // This will take up all the available space
            display: 'flex',
            justifyContent: 'left',
            flexDirection: 'row',
          }}
        >
          {loc.pathname !== '/' && (
            <IconButton onClick={toggleSidebar} sx={{ color: 'inherit' }}>
              <Menu />
            </IconButton>
          )
          }
          {user && (
            <Box
              sx={{
                alignContent: 'center', display: 'flex',
                flexDirection: 'row', alignItems: 'center',
                gap: 1,
              }}
            >
              <Box sx={{ml: 1, display: 'flex', alignItems: 'center'}}>
              <AccountBox sx={{height: '1rem', width: '1rem'}} />
              <Typography
              >
                {user.email}
              </Typography>
              </Box>
              <IconButton
                color="inherit"
                onClick={logout}
                sx={{}}
              >
                <LogoutOutlined />
              </IconButton>
            </Box>
          )}

        </Box>
        <Box
          sx={{
            width: '100px', // Set to the desired width
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            // This will push items to the right
          }}
        >
          <IconButton
            color="inherit"
            onClick={toggleThemeMode}
            sx={{}}
          >
            {themeMode === 'dark' ? <DarkMode /> : <LightMode />}
          </IconButton>


        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default TopNav;