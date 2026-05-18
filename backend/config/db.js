// استدعاء مكتبة mongoose للتعامل مع MongoDB
const mongoose = require('mongoose');

// دالة للاتصال بقاعدة البيانات
const connectDB = async () => {
    try {
        // جلب رابط الاتصال من ملف المتغيرات البيئية
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // إيقاف الخادم في حال فشل الاتصال
    }
};

module.exports = connectDB;