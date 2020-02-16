export{}
const {tokenHandler} = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const {speedLimiter}=require('./utils/security')

const app = express();
app.use(speedLimiter) 
const corsConfig =
    process.env.NODE_ENV !== "production"
        ? {
            origin: "http://localhost:3000",
            /* credentials: true, */
        }
        : {
            origin: "https://your-website.com",
            /* credentials: true */
        };

app.use(cors(corsConfig));
app.use(express.json())     //should replace bodyparser
app.use(tokenHandler)

module.exports=app