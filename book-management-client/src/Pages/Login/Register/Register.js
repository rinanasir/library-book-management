import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState();

    const { user, registerUser, isLoading, authError } = useAuth();

    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    };
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        };
        // registerUser(loginData.email, loginData.password, loginData.name, history);
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    };
    return (
        <>
            <>
                <Typography
                    style={{ color: '#BD9200', fontWeight: '600' }}
                    sx={{ m: 5 }}
                    variant="h4"
                    gutterBottom component="div">
                    Welcome to the Library
                </Typography>
                <Container sx={{ pb: 21 }}>
                    <Grid container spacing={2}>
                        <Grid item sx={{ mt: 15 }} xs={12} md={6}>
                            <Typography
                                style={{ color: '#BD9200', fontWeight: '600' }}
                                variant="h4"
                                gutterBottom component="div">
                                Register
                            </Typography>
                            {!isLoading && <form onSubmit={handleLoginSubmit}>
                                <TextField
                                    sx={{ width: '75%', m: 1 }}
                                    id="standard-basic"
                                    label="Your Name"
                                    name="name"
                                    onBlur={handleOnBlur}
                                    variant="standard" />
                                <TextField
                                    sx={{ width: '75%', m: 1 }}
                                    id="standard-basic"
                                    label="Your Email"
                                    name="email"
                                    type="email"
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
                                <TextField
                                    sx={{ width: '75%', m: 1 }}
                                    id="standard-basic"
                                    label="ReType Your Password"
                                    type="password"
                                    name="password2"
                                    onBlur={handleOnBlur}
                                    variant="standard" />
                                <Button
                                    type="submit"
                                    sx={{ width: '75%', m: 1 }}
                                    style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained"
                                >Register</Button>
                            </form>}
                            {isLoading && <CircularProgress sx={{ color: '#BD9200' }} color="inherit" />}
                            {authError && <Alert severity="error">{authError}</Alert>}
                        </Grid>
                        <Grid item sx={{ mt: 15 }} xs={12} md={6}>
                            <Typography
                                sx={{ mb: 5 }}
                                style={{ color: '#BD9200', fontWeight: '600' }}
                                variant="h4"
                                gutterBottom component="div">
                                Login
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', mb: 4, pb: 2 }} variant="subtitle1" color="text.secondary">
                                Already Registerd ?
                            </Typography>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to="/login">
                                <Button sx={{ width: '75%', m: 1 }} style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained">Login</Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Container>
            </>
        </>
    );
};

export default Register;