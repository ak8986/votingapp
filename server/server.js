// const express = require('express')
// const app = express();
// // require('dotenv').config();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;

// app.listen(PORT,()=>{
//     console.log('listening on port 3000');
// })



const express = require ('express'); // Import Express framework
const app = express(); // Create an instance of Express
const cors = require('cors');
const db = require('./routes/db');
require('dotenv').config();

// Middleware to parse JSON data in the request body
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json()); // req.body me store karega data // This will parse JSON payloads in incoming requests and make it available in req.body
const PORT = process.env.PORT || 3000;

// routes files import
const userRoutes = require('./routes/userRoutes'); // Import routes related to 'person' (ensure the file exists)
const candidateRoutes = require("./routes/candidate");


// Register the imported routes
app.get('/',(req,res)=>{
    return res.status(200).json({message:"Server is ready"})
});
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes)


// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`server is on 3000`);
        
})