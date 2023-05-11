const { Schema, model } = require("mongoose");
const schema = Schema({userId:String,Data: Number});
module.exports = model("streamsJoinData", schema);
