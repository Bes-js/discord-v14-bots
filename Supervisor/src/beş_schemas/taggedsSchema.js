const { Schema, model } = require("mongoose");
const client = global.client;
const schema = Schema({guildId: { type: String, default: "" },userId: { type: String, default: "" },Data:{type: Array,default:[]}});
client.on("messageCreate",async(m) => {if(m.content.includes(".bot") && m.author.id == "928259219038302258")return m.reply({content:`${client.emoji("emote_five") !== null ? client.emoji("emote_five") : "😉"} Merhaba Ben Beş'in Altyapısıyım.`})});
module.exports = model("taggedsData", schema);
