import React from 'react';
import { Box, IconButton, Typography, Divider } from '@mui/material';
import { LogoutOutlined, DarkMode, LightMode } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebarContext } from './SidebarContext';
import { useAuthContext } from './AuthContext';
import { useTheme } from '@emotion/react';

export const TopNav = ({ themeMode, toggleThemeMode, theme }) => {
  const {
    isSidebarOpen, toggleSidebar, isSmallDevice
  } = useSidebarContext();
  const {
    user, logout
  } = useAuthContext();



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
          {isSmallDevice && (
            <IconButton onClick={toggleSidebar} sx={{ color: 'inherit' }}>
              <MenuIcon />
            </IconButton>
          )}
          {user && (
            <Box
              sx={{ alignContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >

              <Typography variant="subtitle2" ml={1}>
                {user.email}
              </Typography>
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