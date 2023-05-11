const joinedAt = require("../beş_schemas/voicesJoinSchema");
const voiceUser = require("../beş_schemas/voicesSchema");
const voiceGuild = require("../beş_schemas/voiceGuildSchema");
const guildChannel = require("../beş_schemas/voiceGuildChannelsSchema");
const userChannel = require("../beş_schemas/voiceChannelsSchema");
const userParent = require("../beş_schemas/voiceParentsSchema");
const point = require("../beş_schemas/staffsSchema");
const client = global.client;
const beş_config = require("../../beş_config");
const { Events } = require("discord.js");

module.exports = async (oldState, newState) => {
 if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;

let bes = oldState ? oldState : newState;
const voiceData = await voiceUser.findOne({ guildId: bes.guild.id, userId: bes.member.user.id });
let datas = voiceData ? voiceData.topStat : 0;
if(client.rolinc("voice bronze") && datas >= 3600000){
if(bes.member.roles.cache.has(client.rolinc("voice bronze").id))return;
bes.member.roles.add(client.rolinc("voice bronze").id).catch(err => { })
}else if(client.rolinc("voice silver") && datas >= 18000000){
if(bes.member.roles.cache.has(client.rolinc("voice silver").id))return;
bes.member.roles.add(client.rolinc("voice silver").id).catch(err => { })
}else if(client.rolinc("voice gold") && datas >= 72000000){
if(bes.member.roles.cache.has(client.rolinc("voice gold").id))return;
bes.member.roles.add(client.rolinc("voice gold").id).catch(err => { })
}else if(client.rolinc("voice diamond") && datas >= 216000000){
if(bes.member.roles.cache.has(client.rolinc("voice diamond").id))return;
bes.member.roles.add(client.rolinc("voice diamond").id).catch(err => { })
}
  if (!oldState.channel  && newState.channel) await joinedAt.findOneAndUpdate({ userId: newState.id }, { $set: { Data: Date.now() } }, { upsert: true });
  let joinedAtData = await joinedAt.findOne({ userId: oldState.id });
  if (!joinedAtData) await joinedAt.findOneAndUpdate({ userId: oldState.id }, { $set: { Data: Date.now() } }, { upsert: true });
  joinedAtData = await joinedAt.findOne({ userId: oldState.id });
  const data = Date.now() - joinedAtData.Data;
  if (oldState.channel  && !newState.channel) {
    await saveData(oldState, oldState.channel, data);
    await joinedAt.deleteOne({ userId: oldState.id });
  } else if (oldState.channel && newState.channel) {
    await saveData(oldState ? oldState : newState, oldState.channel, data);
    await joinedAt.findOneAndUpdate({ userId: newState.id }, { $set: { Data: Date.now() } }, { upsert: true });
  }
};

async function saveData(user, channel, data) {
if (beş_config.taskSystem && beş_config.staffs.some((bes) => user.member.roles.cache.has(bes))) {
		if (channel.parent && beş_config.parents.publicParents.includes(channel.parentId)){
		await point.updateOne({ guildId: user.guild.id, userId: user.id },{$inc: {point: (data / 1000 / 60 / 1) * 8}},{ upsert: true });
        }else{
        await point.updateOne({ guildId: user.guild.id, userId: user.id },{$inc: {point: (data / 1000 / 60 / 1) * 2}},{ upsert: true });
        }
		const pointData = await point.findOne({guildId: user.guild.id,userId: user.id});
		if (pointData && client.ranks.some((bes) => bes.point >= pointData.point)) {
		const newRank = client.ranks.filter((bes) => pointData.point >= bes.point).last();
		if ((newRank && Array.isArray(newRank.role) && !newRank.role.some((x) => user.member.roles.cache.has(x))) ||(newRank && !Array.isArray(newRank.role) && !user.member.roles.cache.has(newRank.role))) {
		user.member.roles.add(newRank.role);
		const oldRoles = client.ranks.filter((bes) => pointData.point < bes.point && user.member.hasRole(bes.role));
		oldRoles.forEach((bes) => bes.role.forEach((five) => user.member.roles.remove(five)));
			}
		}
	}
	user.member.updateTask(user.guild.id, "ses", data, channel);	
    await voiceUser.updateOne({ guildId: user.guild.id, userId: user.id },{$inc: {topStat: data,dailyStat: data,weeklyStat: data}},{ upsert: true });
	await voiceGuild.updateOne({ guildId: user.guild.id },{$inc: {topStat: data,dailyStat: data,weeklyStat: data}},{ upsert: true });
	await guildChannel.updateOne({ guildId: user.guild.id, channelId: channel.id }, { $inc: { channelData: data } }, { upsert: true });
	await userChannel.updateOne({ guildId: user.guild.id, userId: user.id, channelId: channel.id }, { $inc: { channelData: data } }, { upsert: true });
	if(channel.parent)await userParent.updateOne({guildId: user.guild.id,userId: user.id,parentId: channel.parentId},{ $inc: { parentData: data } },{upsert: true });
}
module.exports.conf = {name:Events.VoiceStateUpdate};
