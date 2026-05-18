const express = require('express');
const router = express.Router();
// استدعاء الدوال من الكنترولر (تمت إضافة getMyCards)
const { generateCards, updateCardUrl, activateCard, getMyCards } = require('../controllers/cardController');
const { protect } = require('../middleware/authMiddleware');

// مسار توليد البطاقات (للأدمن)
router.post('/generate', generateCards);

// مسار تفعيل البطاقة 
router.post('/activate', protect, activateCard);

// مسار جلب بطاقات العميل (يجب أن يكون قبل مسار :id)
router.get('/my-cards', protect, getMyCards);

// مسار تحديث الرابط 
router.put('/:id', protect, updateCardUrl);

module.exports = router;