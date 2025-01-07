const mongoose  = require('mongoose');
require('dotenv').config();


const dbconnect = async()=>{ 
    await mongoose.connect(
    process.env.DATABASE_URL
).then(console.log("database connection successfull")).catch((err)=>{
    console.log("error in connecting database");
    console.error(err);
    process.exit(1);
})
}

module.exports=dbconnect;