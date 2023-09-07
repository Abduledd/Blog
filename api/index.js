const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');

app.use(express.json());

const PORT = 3000; // Définition du port que vous souhaitez utiliser

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
        const userDoc = await User.create({ username, password });
        res.json(userDoc);
    } catch (e) {
        console.log('erreur')
        res.status(400).json(e);
    }
});
