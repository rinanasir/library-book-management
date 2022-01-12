import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPowerOff, faUserAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Typography } from '@mui/material';


const Navigation = () => {
    const { user, logOut } = useAuth();

    const userIcon = <FontAwesomeIcon icon={faUserAlt} />
    const powerIcon = <FontAwesomeIcon icon={faPowerOff} />
    const bookIcon = <FontAwesomeIcon icon={faBook} />
    const doorIcon = <FontAwesomeIcon icon={faDoorOpen} />

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ backgroundColor: '#BD9200' }} position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography style={{ textAlign: 'left' }} variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Library
                    </Typography>
                    {
                        user?.email ?
                            <Box>
                                <NavLink to="/books">
                                    <Button style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} title="books" color="inherit">{bookIcon}</Button>
                                </NavLink>
                                <NavLink to="/dashboard">
                                    <Button style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} title="Dashboard" color="inherit">{doorIcon}</Button>
                                </NavLink>
                                <Button onClick={logOut} style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} title="Logout" color="inherit">{powerIcon}_{user.displayName}</Button>
                            </Box>
                            :
                            <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                <Button style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} title="Account" color="inherit">{userIcon}</Button>
                            </NavLink>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;