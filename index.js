const express = require('express')
const cors = require('cors');
const uuid = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const app = express()

//port of the server
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qhccbie.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//  JSON WEB TOKEN
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        next();
    });
}


async function run(){
    await client.connect();
    try{
        // Collections
        const userCollection = client.db('hero_rider').collection('userCollection');

    }finally{

    }
}
run().catch(err => {
    console.error(err);
})

app.get('/', (req, res) => {
    res.send(`
    <p>
        <h1>Hero Rider server is running</h1>
    </p>
  `)
})

app.listen(port, () => {
    console.log(`Hero Rider app listening on port ${port}`)
})

//Export the express api
module.exports = app;