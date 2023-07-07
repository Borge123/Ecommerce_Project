require('dotenv').config();
const mongoose =  require("mongoose"); 

const connect = async (dbstring) => {  
    await mongoose.connect(dbstring, {useNewUrlParser: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful...`))
.catch(err => console.log(`Error in DB connection`)); 
}

module.exports = connect(process.env.DBSTRING);    