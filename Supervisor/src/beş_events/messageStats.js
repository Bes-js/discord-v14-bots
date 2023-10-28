const beş_config = require("../../beş_config");
const messageUser = require("../beş_schemas/messagesSchema");
const messageGuild = require("../beş_schemas/messageGuildSchema");
const guildChannel = require("../beş_schemas/messageGuildChannelsSchema");
const userChannel = require("../beş_schemas/messageChannelsSchema");
const { Events } = require("discord.js");
const point = require("../beş_schemas/staffsSchema");
const client = global.client;
const nums = new Map();
module.exports = async (message) => {
const prefix = message.content.toLowerCase().startsWith(beş_config.prefix);
if (message.author.bot || !message.guild || prefix || message.content == null) return;

	if (beş_config.taskSystem && beş_config.staffs.some((x) => message.member.roles.cache.has(x))) {
		const num = nums.get(message.author.id);
		if (num && num % 2 === 0) {
			nums.set(message.author.id, num + 1);
			await point.updateOne({ guildId: message.guild.id, userId: message.author.id }, { $inc: { point: 0.3 } }, { upsert: true });
			const pointData = await point.findOne({
				guildId: message.guild.id,
				userId: message.author.id
			});
			if (pointData && client.ranks.some((x) => pointData.point >= x.point)) {
				const newRank = client.ranks.filter((x) => pointData.point >= x.point).last();
				message.member.roles.add(newRank.role);
				const oldRoles = client.ranks.filter((x) => pointData.point < x.point && message.member.hasRole(x.role));
				oldRoles.forEach((x) => x.role.forEach((r) => message.member.roles.remove(r)));
			}
		} else nums.set(message.author.id, num ? num + 1 : 1);
		message.member.updateTask(message.guild.id, "mesaj", 1, message.channel);
	}
	await messageUser.updateOne({ guildId: message.guild.id, userId: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1 } }, { upsert: true });
	await messageGuild.updateOne({ guildId: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1 } }, { upsert: true });
	await guildChannel.updateOne({ guildId: message.guild.id, channelId: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
	await userChannel.updateOne({guildId: message.guild.id,userId: message.author.id,channelId: message.channel.id},{ $inc: { channelData: 1 } },{ upsert: true }
	);
};
module.exports.conf = {name: Events.MessageCreate };
