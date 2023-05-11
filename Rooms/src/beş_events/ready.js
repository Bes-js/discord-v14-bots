const beş_config = require("../../beş_config.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client;
module.exports = () => {

client.user.setPresence({activities:[{name:`Özel Oda Sistemi`,type: ActivityType.Streaming,url:"https://www.twitch.tv/bes_exe"}], status: "dnd" });
const beş_kanal = client.channels.cache.get(beş_config.voiceChannel);
if(!beş_kanal)return
joinVoiceChannel({channelId: beş_kanal.id,guildId: beş_kanal.guild.id,adapterCreator: beş_kanal.guild.voiceAdapterCreator,selfDeaf: true,selfMute:true});



const guild = client.guilds.cache.get(beş_config.sunucuID)
setInterval(function(){
guild.channels.cache.forEach(async channel => {
if (channel.name.startsWith('#')) {
    let channeldata = client.db.get(`${channel.id}`)
    if(!channeldata)return;
    let member = guild.members.cache.get(channeldata)
    let data = client.db.get(`özeloda_${channeldata}`)
    if(!data)return;
    if (channel.members.size == 0) {
    channel.delete()
    client.db.delete(`members_${channel.id}`)
    client.db.delete(`özeloda_${channeldata}`)
    client.db.delete(`${channel.id}`)
   //member.user.send({content:`> **Merhaba ${member.user.username}**\n> *Odada Olmadığın İçin Özel Odan Kapatıldı!*`}).catch((bes) => { })
    }
}
})
},beş_config.odaSure)


}
module.exports.conf = {
name: "ready"
}
