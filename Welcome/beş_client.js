const { Client,  VoiceChannel, GuildMember, PermissionFlagsBits, GatewayIntentBits, Partials,ActivityType,Events } = require('discord.js');
const conf = require('./beş_config.js');
const {createAudioPlayer,createAudioResource,NoSubscriberBehavior,AudioPlayerStatus} = require('@discordjs/voice');
const play = require('play-dl');

class BEŞ extends Client {
    constructor(options) {
        super({
            options,
            intents: Object.keys(GatewayIntentBits),
            partials: Object.keys(Partials),
            presence: {
                activities: [{
                  name: conf && conf.presence.length > 0 ? conf.presence : "Beş Was Here",
                  type: ActivityType.Streaming,
                  url:"https://www.twitch.tv/bes_exe"
                }],
                status: 'dnd'
              }
        })

        this.player = createAudioPlayer({inlineVolume : true,behaviors: {noSubscriber: NoSubscriberBehavior.Play,},});
        this.url = conf.youtubeURL;
        this.stream;
        this.message;
        this.channelId;
        this.playing;
        this.voiceConnection;
        this.staffJoined = false;
        
         process.on("uncaughtException", (err) => { });
         process.on("unhandledRejection", (err) => { console.log(err) });
         process.on("warning", (warn) => { console.log(warn) });
         process.on("beforeExit", () => { console.log("Sistem Kapanıyor!")});
         this.on("rateLimit", (rate) => { console.log("Client Rate Limit'e Uğradı; "+rate)})
         this.on(Events.Error,(err) => { console.log("Beklenmedik Bir Hata Gerçekleşti; "+err)});
         this.on(Events.Warn,(warn) => { })
        
    }
    async start(channelId, a) {
        let guild = this.guilds.cache.get(conf.guildID);
        if(!guild) return;
        let channel = guild.channels.cache.get(channelId);
        if(!channel) return;
        this.channelId = channelId;
        let connection = this.voiceConnection 
        let stream;
        let resource;
        if(conf.mp3) {
        resource = this.stream = createAudioResource(conf.file); 
        } else {
        stream = await play.stream(this.url);
        resource = this.stream = createAudioResource(stream.stream, {inputType: stream.type,}); 
        }//slm acr
        let player = this.player
        player.on(AudioPlayerStatus.Playing, () => {});
        player.on(AudioPlayerStatus.Paused, () => {});
        player.on('idle', async () => {
        if(this.staffJoined == true) return;
        if(conf.mp3) {resource = this.stream = createAudioResource(conf.file); 
        } else {stream = await play.stream(this.url);
        resource = this.stream = createAudioResource(stream.stream, {inputType: stream.type,}); 
        }
        this.player.play(resource);
        });
        if(this.staffJoined == true) return;
        player.play(resource)
        connection.subscribe(player);
    }
}
module.exports = { BEŞ };
VoiceChannel.prototype.hasStaff = function(checkMember = false) {
if(this.members.some(m => (checkMember !== false ? m.user.id !== checkMember.id : true) && !m.user.bot && m.roles.highest.position >= m.guild.roles.cache.get(conf.staffRole).position)) return true;
return false;
}
VoiceChannel.prototype.getStaffs = function(checkMember = false) {
return this.members.filter(m => (checkMember !== false ? m.user.id !== checkMember.id : true) && !m.user.bot && m.roles.highest.position >= m.guild.roles.cache.get(conf.staffRole).position).size
}
GuildMember.prototype.isStaff = function() {
if(!this.user.bot && (this.permissions.has(PermissionFlagsBits.Administrator) || this.roles.highest.position >= this.guild.roles.cache.get(conf.staffRole).position)) return true;
return false;
}