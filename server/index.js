const express = require('express');
const client = require('./connection');
var cors = require('cors')
var bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser.json())
const PORT = process.env.PORT || 5001;

const collection = client.db('esd').collection('details');

app.get('/', async (req, res) => {
    try {
        console.log('Loaded data from MongoDB Atlas');
        res.json({ message: 'Loaded data from MongoDB Atlas' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/authenticate', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const username = body['username'];
        const password = body['password'];
        const user = await collection.findOne({ username: username });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.password != password) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        res.json(user)
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/add_sale', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const product = body['product'];
        const quantity = body['quantity'];
        const price = body['price'];
        const name = body['name'];
        const id = body['id'];

        const sales = {
            product: product,
            quantity: Number(quantity),
            price: Number(price),
            name: name,
            id: id
        }

        result = await collection.updateOne({ username: "Yadav" }, { $push : { "sales": sales } });
        console.log(result);
        res.json({ message: 'Sale item added!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/delete_sale', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const id = body['id'];
        const result = await collection.updateOne({ username: "Yadav" }, { $pull : { "sales": {'id': id} } });
        console.log(result);
        res.json({ message: 'Sale item deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/update_sale', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const product = body['product'];
        const quantity = body['quantity'];
        const price = body['price'];
        const name = body['name'];
        const id = body['id'];

        const sales = {
            product: product,
            quantity: Number(quantity),
            price: Number(price),
            name: name,
            id: id
        }

        result = await collection.updateOne({ username: "Yadav", "sales.id": id }, { $set : { "sales.$": sales } });
        console.log(result);
        res.json({ message: 'Sale item edited!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/add_purchase', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const product = body['product'];
        const quantity = body['quantity'];
        const price = body['price'];
        const name = body['name'];
        const id = body['id'];

        const sales = {
            product: product,
            quantity: Number(quantity),
            price: Number(price),
            name: name,
            id: id
        }

        result = await collection.updateOne({ username: "Yadav" }, { $push : { "purchase": sales } });
        console.log(result);
        res.json({ message: 'Purchase item added!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/delete_purchase', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const id = body['id'];
        const result = await collection.updateOne({ username: "Yadav" }, { $pull : { "purchase": {'id': id} } });
        console.log(result);
        res.json({ message: 'Purchase item deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/update_purchase', async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const product = body['product'];
        const quantity = body['quantity'];
        const price = body['price'];
        const name = body['name'];
        const id = body['id'];

        const purchase = {
            product: product,
            quantity: Number(quantity),
            price: Number(price),
            name: name,
            id: id
        }

        result = await collection.updateOne({ username: "Yadav", "purchase.id": id }, { $set : { "purchase.$": purchase } });
        console.log(result);
        res.json({ message: 'Purchase item edited!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// app.put('/delete_order', async (req, res) => {
//     try {
//         const body = req.body;
//         console.log(body);
//         const userId = body['id'];
//         const user = await collection.findOne({ id: userId });
//         if (!user) {
//             res.status(404).json({ message: 'User not found' });
//             return;
//         }
//         result = await collection.updateOne({ id: userId }, { $pull : { "products": {'id': body['productId']} } });
//         console.log(result);
//         res.json({ message: 'Order deleted' });
//     } catch(err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.put('/add_order', async (req, res) => {
//     try {
//         const body = req.body;
//         console.log(body);
//         const userId = body['id'];
//         const user = await collection.findOne({ id: userId });
//         if (!user) {
//             res.status(404).json({ message: 'User not found' });
//             return;
//         }
//         const order = {
//             id: body['productId'],
//             productName: body['productName'],
//             price: body['price'],
//             rating : body['rating']
//         }
//         const result = await collection.updateOne({id: userId}, { $push : {"products" : order } })
//         res.json({ message: 'Order added'});
//     } catch(err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.post('/add_user', async (req, res) => {
//     try {
//         const body = req.body;
//         console.log(body);
//         const userId = body['id'];
//         const user = await collection.findOne({ id: userId });
//         if (user) {
//             res.status(404).json({ message: 'User already exists' });
//             return;
//         }
//         const result = await collection.insertOne(body);
//         res.json({ message: 'User added'});
//     } catch(err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});