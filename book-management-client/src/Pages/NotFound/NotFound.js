import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

const NotFound = () => {
    return (
        <Box>
            <Typography sx={{ color: 'red', fontWeight: 'bold', m: 10 }} variant="h3" component="div">
                404<br />
                Page Not Found
            </Typography>
            <Link style={{ textDecoration: 'none' }} to="/">
                <Button style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 20, fontWeight: 'bold' }} variant="contained"><HomeIcon />Home</Button>
            </Link>
        </Box>
    );
};

export default NotFound;