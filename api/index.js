const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require('./models/User')

app.use(express.json());

const PORT = 3001 || 6001;
mongoose.connect('mongodb+srv://blog:1GkeKSRMCzcQ1o5C@cluster0.utbkidw.mongodb.net/?retryWrites=true&w=majority').then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
})
    .catch((error) => {
        console.log(error.message);
    });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password });
        res.json(userDoc);

    } catch (e) {
        res.status(400).json(e)
    }
    res.json({ requestData: { username, password } });
});

app.listen(3000);

