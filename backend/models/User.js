const mongoose = require('mongoose');

// تعريف مخطط بيانات المستخدم
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // يمنع تكرار الإيميل
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Client'], // تحديد الأدوار المسموحة فقط
        default: 'Client',
    }
}, { timestamps: true }); // لتسجيل وقت الإنشاء والتحديث تلقائياً

module.exports = mongoose.model('User', userSchema);