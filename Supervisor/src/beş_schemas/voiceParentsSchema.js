const { Schema, model } = require("mongoose");
const schema = Schema({guildId: String,userId: String,parentId: String,parentData:{type:Number,default:0}});
module.exports = model("voiceParents", schema);
