const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const donorRoutes = require('./routes/donorRoutes');
const recipientRoutes = require('./routes/recipientRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/recipient', recipientRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Blood Bank Management System API is running');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection failed:', err));