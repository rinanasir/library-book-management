const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zxert.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);

async function run() {
    try {
        await client.connect();
        // console.log('connected successfully');
        const database = client.db('book_management');
        // collection for books
        const bookCollection = database.collection('books');
        // collection for users
        const userCollection = database.collection('users');
        // collection for checkedOut books
        const checkedOutCollection = database.collection('checkedOut');

        // GET api for all books
        app.get('/books', async (req, res) => {
            const cursor = bookCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });
        // GET api for single product
        app.get('/books/:id', async (req, res) => {
            const id = req.params.id;
            // console.log('single book', id);
            const query = { _id: ObjectId(id) };
            const product = await bookCollection.findOne(query);
            res.json(product);
        });
        // POST api for books
        app.post('/books', async (req, res) => {
            const product = req.body;
            const result = await bookCollection.insertOne(product);
            // console.log(result);
            res.json(result);
        });
        // DElETE api to remove a book
        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookCollection.deleteOne(query);
            res.json(result);
        });

        // Get checkedOut books according to user
        app.get('/checkedOut', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            // console.log(email);
            const cursror = checkedOutCollection.find(query);
            const order = await cursror.toArray();
            res.json(order);
        });
        // GET api for all checkedOut books
        app.get('/checkedOut', async (req, res) => {
            const cursor = checkedOutCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        });
        // POST checkedOut from the user
        app.post('/checkedOut', async (req, res) => {
            const order = req.body;
            // console.log(order);
            const result = await checkedOutCollection.insertOne(order);
            // console.log(result);
            res.json(result);
        });

        // POST api for users
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.json(result);
        });
        // PUT api to store google signin users
        app.put('/users', async (req, res) => {
            const user = req.body;
            // console.log('put', user);
            const filter = { email: user.email };
            const options = { upsert: true }; // doing UPSERT
            const updateDoc = { $set: user };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });
        // GET api users to see if the user is an admin
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        })
        // PUT api for making an admin
        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.json(result);
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Welcome to the book archive..!!');
});

app.listen(port, () => {
    console.log('listening at:', port);
})