import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ConfirmModal = ({ date, name, openConfirm, handleConfirmClose }) => {
    const { user } = useAuth();

    const initialInfo = { studentName: user.displayName, email: user.email, studentId: '', department: '', phone: '' };
    const [confirmInfo, setConfirmInfo] = useState(initialInfo);;
    // console.log(user.displayName, cart);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...confirmInfo };
        newInfo[field] = value;
        // console.log(newInfo);
        setConfirmInfo(newInfo);
    };

    const handleConfirmSubmit = e => {
        alert('Confirm submit');

        // collect data from the form
        const booking = {
            ...confirmInfo,
            bookName: name,
            date: date.toLocaleDateString()
        };
        // console.log(booking);

        // send data to server
        fetch('http://localhost:5000/checkedOut', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    handleConfirmClose();
                    alert('Book Checkedout Successfully');
                }
            });

        handleConfirmClose();
        e.preventDefault();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openConfirm}
            onClose={handleConfirmClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openConfirm}>
                <Box sx={style}>
                    <Typography style={{ color: '#BD9200', fontWeight: 'bold' }} id="transition-modal-title" variant="h6" component="h2">
                        {name}
                    </Typography>
                    <form onSubmit={handleConfirmSubmit}>
                        <TextField
                            disabled
                            label="Student Name"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="studentName"
                            onBlur={handleOnBlur}
                            defaultValue={user.displayName}
                            size="small"
                        />
                        <TextField
                            disabled
                            label="Email"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="email"
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            size="small"
                        />
                        <TextField
                            disabled
                            label="Date"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="date"
                            onBlur={handleOnBlur}
                            defaultValue={date.toDateString()}
                            size="small"
                        />
                        <TextField
                            label="Student ID"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="studentId"
                            onBlur={handleOnBlur}
                            defaultValue=""
                            size="small"
                        />
                        <TextField
                            label="Department"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="department"
                            onBlur={handleOnBlur}
                            defaultValue=""
                            size="small"
                        />
                        <TextField
                            label="Phone Number"
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            name="phone"
                            onBlur={handleOnBlur}
                            defaultValue=""
                            size="small"
                        />
                        <Button sx={{ width: '30%', mt: 5 }} style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} type="submit" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ConfirmModal;