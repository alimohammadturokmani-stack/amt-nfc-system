const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    // التحقق من وجود التوكن في الـ Headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // فك تشفير التوكن لمعرفة من هو المستخدم
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // جلب بيانات المستخدم وإضافتها للطلب (بدون كلمة المرور)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'غير مصرح لك، التوكن غير صالح أو انتهت صلاحيته' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'غير مصرح لك، لا يوجد توكن اتصال' });
    }
};

module.exports = { protect };