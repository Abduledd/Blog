const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const cors = require('cors');
const User = require('./models/User');


const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(express.json());

// app.use(cors({
//     origin: 'http://localhost:3000',
// }));

// const PORT = process.env.PORT || 5000;

const PORT = 3000;


async function startServer() {
    try {
        await mongoose.connect('mongodb+srv://blog:1GkeKSRMCzcQ1o5C@cluster0.utbkidw.mongodb.net/?retryWrites=true&w=majority');
        console.log('server connected')
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
