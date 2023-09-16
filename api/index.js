const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('./models/Post');

const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'xnoqdnfodfiouibmqsgroqneofngq';


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://blog:1GkeKSRMCzcQ1o5C@cluster0.utbkidw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


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

    if (!userDoc) {
        // Utilisateur non trouvé, renvoyer un message d'erreur
        return res.status(400).json('Utilisateur non trouvé, veuillez vous inscrire.');
    }

    const checkPassword = bcrypt.compareSync(password, userDoc.password);

    if (checkPassword) {
        // Mot de passe correct, générer un token JWT et le renvoyer
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        // Mot de passe incorrect, renvoyer un message d'erreur
        res.status(400).json('Mot de passe incorrect.');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    // Check if token is undefined or null
    if (!token) {
        return res.status(400).json({ error: 'Token not provided' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Token verification successful, respond with info
        res.json(info);
    });
});




app.post('/logout', async (req, res) => {
    res.cookie('token', '').json('ok');
});


app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    // res.json({ ext });
    fs.renameSync(path, newPath);
    const { title, summary, content } = req.body;

    // Extraire les informations de l'utilisateur à partir du token JWT
    const token = req.cookies.token;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            // Gérer les erreurs de vérification du token ici
            return res.status(401).json('Accès non autorisé');
        }

        try {

            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            });
            res.json(postDoc);
        } catch (e) {
            console.log('erreur');
            res.status(400).json(e);
        }
    });
});




app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
})


app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});