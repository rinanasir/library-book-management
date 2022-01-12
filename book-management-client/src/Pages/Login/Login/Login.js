import React, { useState } from 'react';
import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState();

    const { loginUser, isLoading, signInWithGoogle, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    };
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    };

    return (
        <>
            <Container sx={{ pb: 16 }}>
                <Grid container spacing={2}>
                    <Grid item sx={{ mt: 15 }} xs={12} md={6}>
                        <Typography
                            style={{ color: '#BD9200', fontWeight: '600' }}
                            variant="h4"
                            gutterBottom component="div">
                            Login
                        </Typography>
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                id="standard-basic"
                                label="Your Email"
                                name="email"
                                onBlur={handleOnBlur}
                                variant="standard" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                id="standard-basic"
                                label="Your Password"
                                type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                variant="standard" />
                            <Button
                                type="submit"
                                sx={{ width: '75%', m: 1 }}
                                style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained"
                            >Login</Button>
                        </form>
                        {isLoading && <CircularProgress sx={{ color: '#BD9200' }} color="inherit" />}
                        {authError && <Alert severity="error">{authError}</Alert>}
                        <p style={{ color: '#BD9200', fontWeight: 'bold' }}>---------------------------------------------------------------</p>
                        <Button
                            onClick={handleGoogleSignIn}
                            type="submit"
                            sx={{ width: '75%', m: 1 }}
                            style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained"
                        >Login With Google</Button>
                    </Grid>
                    <Grid item sx={{ mt: 15 }} xs={12} md={6}>
                        <Typography
                            sx={{ mb: 5 }}
                            style={{ color: '#BD9200', fontWeight: '600' }}
                            variant="h4"
                            gutterBottom component="div">
                            Register
                        </Typography>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bold', mb: 4, pb: 2 }} variant="subtitle1" color="text.secondary">
                            Creating an account makes it easier to: checkout book faster, view your book history.
                        </Typography>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button sx={{ width: '75%', m: 1 }} style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained">Register</Button>
                        </NavLink>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Login;
