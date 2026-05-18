const mongoose = require('mongoose');

// تعريف مخطط بيانات البطاقة
const cardSchema = new mongoose.Schema({
    shortCode: {
        type: String,
        required: true,
        unique: true, // كل بطاقة لها كود فريد مثل c123
    },
    destinationUrl: {
        type: String,
        default: '', // الرابط النهائي الذي سيوجه إليه المستخدم
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // ربط البطاقة بمعرف المستخدم من جدول Users
        default: null,
    },
    isActivated: {
        type: Boolean,
        default: false, // تبدأ البطاقة كغير مفعلة
    },
    clicksCount: {
        type: Number,
        default: 0, // عداد النقرات يبدأ من صفر
    }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);