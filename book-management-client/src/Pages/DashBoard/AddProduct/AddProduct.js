import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

const AddProduct = () => {
    const [productData, setProductData] = useState();
    const [addedSuccess, setAddedSuccess] = useState(false);

    const handleOnBlur = e => {
        const field = e.target.name;
        let value = e.target.value;
        const newProductData = { ...productData };
        newProductData[field] = value;
        // console.log(newProductData);
        setProductData(newProductData);
    };

    const handleProductSubmit = e => {
        // console.log(productData);
        fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setAddedSuccess(true);
                }
            })
        // alert('Product Added Successfully');
        e.preventDefault();
    }

    return (
        <Container>
            <Grid item sx={{ mt: 10, ml: 10 }} xs={12} md={6}>
                <Typography
                    style={{ color: '#BD9200', fontWeight: '600' }}
                    variant="h4"
                    gutterBottom component="div">
                    Add Book
                </Typography>
                <form onSubmit={handleProductSubmit}>
                    <TextField
                        sx={{ width: '75%', m: 1 }}
                        id="standard-basic"
                        label="Book Name"
                        type="text"
                        name="name"
                        onBlur={handleOnBlur}
                        variant="standard" />

                    <TextField
                        sx={{ width: '75%', m: 1 }}
                        id="standard-basic"
                        label="Author Name"
                        type="text"
                        name="author"
                        onBlur={handleOnBlur}
                        variant="standard" />
                    <TextField
                        sx={{ width: '75%', m: 1 }}
                        id="standard-basic"
                        label="Image URL"
                        type="text"
                        name="image"
                        onBlur={handleOnBlur}
                        variant="standard" />
                    <Button
                        type="submit"
                        sx={{ width: '75%', m: 1 }}
                        style={{ backgroundColor: '#BD9200', color: 'white', fontSize: 15, fontWeight: 'bold' }} variant="contained"
                    >Submit</Button>
                </form>
                {addedSuccess && <Alert sx={{ fontWeight: 'bold', fontSize: 15 }} severity="success">Product Added Successfully</Alert>}
            </Grid>
        </Container>
    );
};

export default AddProduct;