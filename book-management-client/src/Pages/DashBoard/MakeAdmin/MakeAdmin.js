import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://arcane-shelf-64714.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data);
                    setSuccess(true);
                }
            })
        e.preventDefault();
    };

    return (
        <Box>
            <Container>
                <Typography sx={{ color: '#BD9200', fontWeight: 'bold' }} variant="h4" color="text.secondary">
                    Make Admin
                </Typography>
                <form onSubmit={handleAdminSubmit}>
                    <TextField
                        sx={{ width: '75%', m: 2 }}
                        id="standard-basic"
                        label="Admin Email"
                        name="email"
                        type="email"
                        onBlur={handleOnBlur}
                        variant="standard" />
                    <Button
                        type="submit"
                        sx={{ width: '45%', m: 1 }}
                        style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained"
                    >Add Admin</Button>
                </form>
                {success && <Alert severity="success">Made Admin Successfully</Alert>}
            </Container>
        </Box>
    );
};

export default MakeAdmin;