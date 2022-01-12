import React from 'react';
import { Typography } from '@mui/material';
import Login from '../../Login/Login/Login';
import Navigation from '../../Shared/Navigation/Navigation';

const Home = () => {
    return (
        <>
            <Navigation />
            <Typography
                style={{ color: '#BD9200', fontWeight: '600' }}
                sx={{ m: 5 }}
                variant="h4"
                gutterBottom component="div">
                Welcome to the Library
            </Typography>
            <Login></Login>
        </>
    );
};

export default Home;