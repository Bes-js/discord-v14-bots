const { Schema, model } = require("mongoose");
const schema = Schema({ guildId: String, userId: String, dailyStat: { type: Number, default: 0 }, weeklyStat: { type: Number, default: 0 }, topStat: { type: Number, default: 0 },cameraStat: { type: Number, default: 0 },streamStat: { type: Number, default: 0 } });
module.exports = model("voices", schema);