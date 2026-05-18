const Card = require('../models/Card');
const crypto = require('crypto');

// للآدمن: توليد مجموعة بطاقات جديدة غير مفعلة
exports.generateCards = async (req, res) => {
    try {
        const { count } = req.body; // عدد البطاقات المطلوبة (مثلاً 50)
        let generatedCards = [];

        for (let i = 0; i < count; i++) {
            // توليد كود قصير عشوائي مكون من 6 أحرف/أرقام
            const shortCode = crypto.randomBytes(3).toString('hex');
            generatedCards.push({ shortCode });
        }

        // إدخال البطاقات دفعة واحدة لقاعدة البيانات
        const cards = await Card.insertMany(generatedCards);
        res.status(201).json({ message: `تم توليد ${cards.length} بطاقة بنجاح`, cards });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// للعميل: تحديث الرابط الوجهة (Destination URL) لبطاقته
exports.updateCardUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { destinationUrl } = req.body;

        // البحث عن البطاقة وتحديث الرابط
        // (ملاحظة: في بيئة الإنتاج يجب التحقق من أن req.user.id يطابق owner البطاقة)
        const updatedCard = await Card.findByIdAndUpdate(
            id, 
            { destinationUrl }, 
            { new: true } // لإرجاع النسخة المحدثة من البيانات
        );

        if (!updatedCard) return res.status(404).json({ message: 'البطاقة غير موجودة' });

        res.json({ message: 'تم تحديث الرابط بنجاح', updatedCard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// تفعيل بطاقة جديدة وربطها بحساب العميل
exports.activateCard = async (req, res) => {
    try {
        const { shortCode, destinationUrl } = req.body;
        const userId = req.user.id; // جلبناه من الـ Middleware

        const card = await Card.findOne({ shortCode });

        if (!card) return res.status(404).json({ message: 'البطاقة غير موجودة' });
        if (card.isActivated) return res.status(400).json({ message: 'هذه البطاقة مفعلة ومربوطة مسبقاً' });

        // تفعيل البطاقة وربطها بالعميل وإضافة الرابط الوجهة
        card.isActivated = true;
        card.owner = userId;
        card.destinationUrl = destinationUrl || ''; // إذا لم يضع رابطاً مبدئياً
        await card.save();

        res.json({ message: 'تم تفعيل البطاقة وربطها بحسابك بنجاح!', card });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// جلب بطاقات العميل الحالي
exports.getMyCards = async (req, res) => {
    try {
        // البحث عن البطاقات التي يملكها هذا المستخدم
        const cards = await Card.find({ owner: req.user._id });
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'حدث خطأ في الخادم أثناء جلب البطاقات' });
    }
};