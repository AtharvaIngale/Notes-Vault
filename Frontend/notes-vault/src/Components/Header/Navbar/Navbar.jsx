
import React from 'react';

import { styled } from '@mui/material/styles';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import logo from '../../../assets/Images/logo.png';

import RegistrationForm from '../../Register/RegistrationForm';

import { useLocation, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { AppRegistration } from '@mui/icons-material';

const Navbar = styled(AppBar)`
    z-index: ${props => props.theme.zIndex.drawer + 1};
    background-color: #fff;
    box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
    color : #383a3d;
    font-size: 22px;
    padding: 0 0 0 15px;
`;

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


const Header = ({ handleDrawer, open }) => {

    const location = useLocation();
    const pathName = capitalize(location.pathname.substring(1));

    const navigate = useNavigate();
    const RegisterClick = () => {
        navigate('RegistrationForm');
    };
    const LoginClick = () => {
        navigate('LoginForm');
    };
   

    return (
        <Navbar open={open}>
            <Toolbar>
                <IconButton
                    onClick={handleDrawer}
                    edge="start"
                    sx={{ marginRight: 5 }}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {
                        pathName ? "" : <img src={logo} alt="logo" style={{ width: 50 }} />
                    }
                    <Heading>{pathName || 'Note Vault'}</Heading>

                    <Avatar alt="Atharva Ingale"  
                    sx={{ bgcolor: 'darkcyan', position: 'absolute', marginLeft: '89%' }}/>

                    <Button variant="contained" startIcon={<LoginIcon />} onClick={LoginClick}
                    sx={{position: 'absolute', marginLeft: '80%',backgroundColor: '#c5c3fe', color: '#262729'}}>Login</Button>

                    <Button variant="contained" startIcon={<HowToRegIcon />} onClick={RegisterClick}
                    sx={{position: 'absolute', marginLeft: '70%',backgroundColor: '#c5c3fe', color: '#262729'}}>Register</Button>
                </Box>
            </Toolbar>
        </Navbar>
    )
}


export default Header;
