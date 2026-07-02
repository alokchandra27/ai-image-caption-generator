const mongoose = require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected To DB");
    })
    .catch((err)=>{
        console.log("Error connected to DB: " , err);
        
    })
}

module.exports = connectToDB;