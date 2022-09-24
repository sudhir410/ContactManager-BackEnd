const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
    name: String,
    designation: String,
    company: String,
    industry: String,
    email: String,
    mobile: String,
    country: String,
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true })

// const contactsSchema=new mongoose.Schema({
//    contact:[{
//     name:String,
//     designation:String,
//     company:String,
//     industry:String,
//     email:String,
//     mobile:String,
//     country:String,
//    }],
//     userid:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
// },{timestamps:true})

const contactModel = mongoose.model('Contact', contactsSchema)

module.exports = contactModel;