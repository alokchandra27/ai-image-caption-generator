const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId, //user id
        ref:"user" //kis collection se belong krta haiii , means dbcompass ke ander collection ka name
    }
})

const postModel = mongoose.model("post",postSchema)


module.exports = postModel