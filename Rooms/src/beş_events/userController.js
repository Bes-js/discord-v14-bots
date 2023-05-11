const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const bes_config = require("../../beş_config.json")
module.exports = async (oldFive,newFive) => {
if(!newFive.channel)return;

let channel = client.guilds.cache.get(bes_config.sunucuID).channels.cache.get(newFive.channelId);
if(channel.parentId == bes_config.kategoriID){
let data = client.db.get(`members_${newFive.channel.id}`)
if(!data)return;
if(data.some(bes => bes.includes(newFive.member.id)))return;
newFive.member.voice.disconnect();
}else return

}
module.exports.conf = {
name: "voiceStateUpdate"
}
