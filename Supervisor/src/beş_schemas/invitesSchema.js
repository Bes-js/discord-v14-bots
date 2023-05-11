const { Schema, model } = require("mongoose");
const schema = Schema({guildId: String,userId: String,Regular: { type: Number, default: 0 },Fake: { type: Number, default: 0 },Left: { type: Number, default: 0 },Bonus: { type: Number, default: 0 },inviter: String
});
module.exports = model("invites", schema);
