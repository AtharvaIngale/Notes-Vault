import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import logo from '../../assets/Images/logo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const Navbar = ({ direction, ...args }) => {

    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const settings = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Profile', path: '/viewUser' },
        { name: 'Update Profile', path: '/updateUser' },
        { name: 'Delete Account', path: '/deleteUser' },
        { name: 'Logout', path: '/signout' }
    ];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

     const handleMenuItemClick = (path) => {
        handleCloseUserMenu(); // Close the menu
        navigate(path);         // Navigate to the selected route
    };

    return (
    <div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

        <Link to="/home"><img src={logo} alt="Notes Vault" style={{height:'50px', width:'80px', margin:'10px'}}></img></Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Notes Vault
          </Typography>


            <Box sx={{ flexGrow: 0, position: 'absolute', marginLeft: '96%' }}>
            <Tooltip title="User Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="" variant='rounded' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={() => handleMenuItemClick(setting.path)} >
                    <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
            ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
    )
}
export default Navbar