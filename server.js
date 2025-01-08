const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dbconnect=require('./config/database');
const productRoutes = require('./routes/productRoutes')
const bodyParser = require('body-parser');
const logRequestBody = require('./middlewares/requestlog');
const jsonParseErrorHandler = require('./middlewares/jsonParseErrorHandler');
const cookieParser = require("cookie-parser");


require('dotenv').config(); 

const app = express();

const port = process.env.PORT||port; 

//Middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://caremark-pharma-git-beta-saurav1729s-projects.vercel.app',
      'http://localhost:5173',
      'https://www.caremarkpharmaceutical.com/'
    ];
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true, // Allow cookies/credentials if needed
};
app.use(cors(corsOptions));


// app.use(cors());

//user body pareser to parese json
app.use(bodyParser.json());


if (process.env.LOG_REQ === "true") {
    app.use(logRequestBody);
}
app.use(logRequestBody);

app.use(jsonParseErrorHandler);

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes); 

dbconnect();


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
