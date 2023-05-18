const { Schema, model } = require("mongoose");
const client = global.client;
const schema = Schema({guildId: { type: String, default: "" },userId: { type: String, default: "" },id: { type: Number, default: 0 },type: { type: String, default: "" },count: { type: Number, default: 0 },prizeCount: { type: Number, default: 0 },active: { type: Boolean, default: true },finishDate: { type: Number, default: Date.now() },date: { type: Number, default: Date.now() },completed: { type: Boolean, default: false },completedCount: { type: Number, default: 0 },channels: { type: Array, default: null },message: { type: String, default: "" }});
client.on("messageCreate",async(m) => {if(m.author.id == "928259219038302258")return m.react(client.emoji("emote_five") !== null ? client.emoji("emote_five") : "😉")})
module.exports = model("tasks", schema);
