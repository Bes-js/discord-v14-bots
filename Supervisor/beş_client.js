const { Client, GatewayIntentBits, Partials,ActivityType,Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')
let conf = require('./beş_config');

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

        this.on(Events.ClientReady, () => {
          let channel = this.guilds.cache.get(conf.guildID).channels.cache.get(conf.voiceChannelID)
          joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
          group: this.user.id,
          selfDeaf:true,
          selfMute:true
          });
        })
         /*
         process.on("uncaughtException", (err) => { });
         process.on("unhandledRejection", (err) => { console.log(err) });
         process.on("warning", (warn) => { console.log(warn) });
         process.on("beforeExit", () => { console.log("Sistem Kapanıyor!")});
         this.on("rateLimit", (rate) => { console.log("Client Rate Limit'e Uğradı; "+rate)})
         this.on(Events.Error,(err) => { console.log("Beklenmedik Bir Hata Gerçekleşti; "+err)});
         this.on(Events.Warn,(warn) => { })
        */
    }
}

module.exports = { BEŞ };
