const beş_config = require('./beş_config');
const {Events} = require("discord.js")
let { BEŞ } = require('./beş_client');
const {joinVoiceChannel,} = require('@discordjs/voice');
for (let index = 0; index < beş_config.tokens.length; index++) {
    let token = beş_config.tokens[index]
    let channel = beş_config.channels.length < 1 ? beş_config.channels[0] : beş_config.channels[index]
    if(channel) {
        let client = new BEŞ();
        client.login(token).catch(err => {console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${err}`)})
        client.on(Events.VoiceStateUpdate, async (oldState, newState) => { 
            if(oldState.member.id == client.user.id && oldState.channelId && !newState.channelId) {
            let guild = client.guilds.cache.get(beş_config.guildID);
            if(!guild) return;
            let Channel = global.Voice = guild.channels.cache.get(channel);
            if(!Channel) return console.error("🔴 Kanal Bulunamadı!");
            client.voiceConnection = await joinVoiceChannel({channelId: Channel.id,guildId: Channel.guild.id,adapterCreator: Channel.guild.voiceAdapterCreator,group: client.user.id})}})
        client.on(Events.ClientReady, async () => {
            console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)
            let guild = client.guilds.cache.get(beş_config.guildID);
            if(!guild) return;
            let Channel = global.Voice = guild.channels.cache.get(channel);
            if(!Channel) return console.error("🔴 Kanal Bulunamadı!");
            client.voiceConnection = await joinVoiceChannel({channelId: Channel.id,guildId: Channel.guild.id,adapterCreator: Channel.guild.voiceAdapterCreator,group: client.user.id});
            if(!Channel.hasStaff()) await client.start(channel)
            else client.staffJoined = true, client.playing = false, await client.start(channel)})
        client.on(Events.VoiceStateUpdate, async (oldState, newState) => { 
            if(newState.channelId && (oldState.channelId !== newState.channelId) &&newState.member.isStaff() &&newState.channelId === channel &&!newState.channel.hasStaff(newState.member)) {client.staffJoined = true; client.player.stop() 
            return;}
            if(oldState.channelId && (oldState.channelId !== newState.channelId) && newState.member.isStaff() && oldState.channelId === channel &&!oldState.channel.hasStaff()) {client.staffJoined = false; client.start(channel, true)
            return }})}}

