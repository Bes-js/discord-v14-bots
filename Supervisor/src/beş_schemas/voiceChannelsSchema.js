const { Schema, model } = require("mongoose");
const schema = Schema({guildId: String,userId: String,channelId: String,channelData: {type: Number,default: 0}});
module.exports = model("voiceChannels", schema);
