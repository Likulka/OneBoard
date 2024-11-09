const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Подключение модели пользователя

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

// Используем CORS и bodyParser
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) { // Ошибка уникальности email
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Error registering user' });
        }
    }
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token, message: 'You are authorized!' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login' });
    }
});

// Защищенный маршрут
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            res.json({ message: 'This is protected data' });
        });
    } else {
        res.sendStatus(401);
    }
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
