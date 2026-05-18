const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// مسارات واجهة برمجة التطبيقات
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cards', require('./routes/cardRoutes'));

// محرك التوجيه الأساسي (Redirect Engine)
const { handleRedirect } = require('./controllers/redirectController');
app.get('/:shortCode', handleRedirect);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));