import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Calendar from '../../Shared/Calendar/Calendar';
import Navigation from '../../Shared/Navigation/Navigation';
import Book from '../Book/Book';

const Books = () => {
    const [date, setDate] = React.useState(new Date());

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    return (
        <>
            <Navigation />
            <Typography
                style={{ color: '#BD9200', fontWeight: '600' }}
                sx={{ m: 5 }}
                variant="h4"
                gutterBottom component="div">
                Books
            </Typography>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Calendar date={date} setDate={setDate}></Calendar>
                    </Grid>
                    <Grid container sx={{ mb: 4 }} spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            books.map(book => <Book
                                key={book.name}
                                book={book}
                                date={date}
                            ></Book>)
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Books;