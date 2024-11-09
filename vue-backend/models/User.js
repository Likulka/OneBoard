const mongoose = require('mongoose');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Создание модели пользователя на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User;
