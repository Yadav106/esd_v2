const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const username = process.env.USERNAME
const password = process.env.PASSWORD
const hostname = process.env.HOSTNAME

const uri = `mongodb+srv://${username}:${password}@${hostname}/?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect()
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error(err);
    });
    

module.exports = client;