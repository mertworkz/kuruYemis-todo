const config = {
    sv: {
        port: 3000,
        host: 'localhost'
    },
    db: {
        mongo: {
            url: 'mongodb://localhost:27017',
            db: 'kuruyemis'
        }
    }
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { authSchema } = require('./schema');
const { encryptData, decryptData } = require('./aes');
const { createToken, verifyToken } = require('./jwt');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(`${config.db.mongo.url}/${config.db.mongo.db}`, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        if (!token.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = await verifyToken(token.split(' ')[1]);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

app.post('/api/v1/register', async function(req, res) {
    try {
        const { username,password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Bad Request' });
        const isUserInDb = await authSchema.findOne({ username });
        if (isUserInDb) return res.status(400).json({ message: 'User already exists' });
        const encryptedPassword = encryptData(password);
        const newUser = new authSchema({ username, password: encryptedPassword });
        await newUser.save();
        return res.status(200).json({ message: 'Success' });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/v1/login', async function(req,res) {
    try {
        const {username,password} = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Bad Request' });
        const userInDb = await authSchema.findOne({ username });
        if (!userInDb) return res.status(400).json({ message: 'User not found' });
        if (decryptData(userInDb.password) !== password) return res.status(400).json({ message: 'Invalid password' });
        const token = createToken({ username });
        return res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.get('/api/v1/authControl', authMiddleware, async function(req, res) {
    try {
        return res.status(200).json({ message: 'Authorized' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})



app.listen(config.sv.port, config.sv.host, async() => {
    await connectDatabase();
    console.log(`Server started at http://${config.sv.host}:${config.sv.port}`);
});

