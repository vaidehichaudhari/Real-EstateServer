const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const { sequelize, connectDB } = require('./confiq/db'); 
app.use(express.json());

// For form data (e.g., file uploads + text fields)
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Needed if using cookies or auth headers
}));


// // Routes
const propertyRoute = require('./routes/propertyRoute');
app.use('/api/property', propertyRoute);

const userRoute = require('./routes/userRoute');
app.use('/api/user', userRoute);

const inquiryRoutes=require('./routes/inquiryRoutes');
app.use('/api/inquiry',inquiryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sync DB & start server
(async () => {
  try {
    await connectDB(); // optional, but good for testing the connection
    await sequelize.sync({ alter:false }); 
    console.log('Database & tables synced!');

    app.listen(9000, () => {
      console.log('Server running on port 9000');
    });
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
})();
