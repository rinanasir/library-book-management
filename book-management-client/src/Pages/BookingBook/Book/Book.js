import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import ConfirmModal from '../BookingModal/ConfirmModal';

const Book = ({ date, book }) => {
    const { name, author, image } = book;

    // Booking Modal
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const handleConfirmOpen = () => setOpenConfirm(true);
    const handleConfirmClose = () => setOpenConfirm(false);

    return (
        <>
            <Grid item xs={4} sm={4} md={4}>
                <Box sx={{ border: 0 }}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardMedia
                            component="img"
                            style={{ width: 'auto', height: '200px', margin: '0 auto' }}
                            image={image}
                            alt=""
                        />
                        <CardContent>
                            <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', color: 'red' }} variant="h6" component="div">
                                {author}
                            </Typography>
                            <br />
                            <Button onClick={handleConfirmOpen} style={{ backgroundColor: '#BD9200', color: 'white' }} variant="contained">Chekout Book</Button>
                            {/* <NavLink style={{ textDecoration: 'none' }} to={`/productdetails/${_id}`}>
                            <Button style={{ backgroundColor: '#BD9200', color: 'white' }} variant="contained">{infoIcon}_Details</Button>
                        </NavLink> */}
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
            <ConfirmModal
                openConfirm={openConfirm}
                handleConfirmClose={handleConfirmClose}
                date={date}
                name={name}
            ></ConfirmModal>
        </>
    );
};

export default Book;