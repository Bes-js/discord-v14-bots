const { Schema, model } = require("mongoose");
const schema = Schema({guildId:{ type: String,default:""},userId:{type:String,default:""},point: {type:Number,default:0}});
module.exports = model("points", schema);
