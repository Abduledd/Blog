const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'xnoqdnfodfiouibmqsgroqneofngq'

app.use(express.json());
app.use(cookieParser());



// app.use(cors({
//     origin: 'http://localhost:3000',
// }));

// const PORT = process.env.PORT || 5000;

const PORT = 3000;


async function startServer() {
    try {
        await mongoose.connect('mongodb+srv://blog:1GkeKSRMCzcQ1o5C@cluster0.utbkidw.mongodb.net/?retryWrites=true&w=majority');
        console.log('Server connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

startServer();

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        console.log('erreur')
        res.status(400).json(e);
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const checkPassword = bcrypt.compareSync(password, userDoc.password);
    // res.json(checkPassword);
    if (checkPassword) {
        //logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        })
    } else {
        res.status(400).json('wrong credentials');
    }
});


app.get('/profile', (req, res) => {
    // const [token] = req.cookies;
    // jwt.verify(token, secret, {}, (err, info) => {
    //     if (err) throw err;
    //     res.json(info);
    // });
});



app.post('/logout', async (req, res) => {
    res.cookie('token', '').json('ok');
})