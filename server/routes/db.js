const mongoose = require('mongoose');
require('dotenv').config();
    
    // const mongoURL = process.env.MONGODB_URL;
 const mongoURL = process.env.MONGO_URL_LOCAL
//setup mongodb connection
mongoose.connect(process.env.MONGO_URL_LOCAL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB'); 
});

db.on('error', (err) => {
    console.log('MongoDB connection error');  
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});  