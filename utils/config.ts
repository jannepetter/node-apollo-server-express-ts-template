export{}
require('dotenv').config()
let PORT = process.env.PORT
let dburl = process.env.MONGOURL

if(process.env.NODE_ENV==='test'){
  console.log('env',process.env.NODE_ENV)
dburl=process.env.TEST_MONGOURL
}

module.exports = {
  dburl,
  PORT
}