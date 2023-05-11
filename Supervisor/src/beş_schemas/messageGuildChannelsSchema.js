const { Schema, model } = require("mongoose");
const schema = Schema({guildId: String,channelId: String,channelData: { type: Number, default: 0 }});
module.exports = model("messageGuildChannels", schema);
