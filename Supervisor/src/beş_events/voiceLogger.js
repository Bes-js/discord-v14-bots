const client = global.client;
const { EmbedBuilder, Events } = require("discord.js");
const beş_config = require("../../beş_config");
const db = client.db;
module.exports = async (oldState, newState) => {
    const log = client.kanalbul("voice-log");
    if (!log) return;
    if (!oldState.channel && newState.channel) return sender(`> **${newState.member.displayName} , ${newState.channel} Adlı Kanala Katıldı!**`,"#00ff00",log)
    if (oldState.channel && !newState.channel) return sender(`> **${newState.member.displayName} , ${oldState.channel} Adlı Kanaldan Ayrıldı!**`,"#ff0000",log)
    if (oldState.channel.id && newState.channel.id && oldState.channel.id != newState.channel.id) return sender(`> **${newState.member.displayName} Kanalını Değiştirdi ${oldState.channel} -> ${newState.channel}**`,"#fdbf1f",log)
    if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Kendi Susturmasını Kaldırdı!**`,"#00ff00",log)
    if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Kendini Susturdu!**`,"#ff0000",log)
    if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return sender(`> **${newState.member.displayName} ${newState.channel} -Adlı Kanalda Kendi Sağırlaştırmasını Kaldırdı!**`,"#00ff00",log)
    if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Kendini Sağırlaştırdı!**`,"#ff0000",log)
    if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Yayın Açtı!**`,"#00ff00",log)
    if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Yayını Kapattı!**`,"#ff0000",log)
    if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Kamerasını Açtı!**`,"#00ff00",log)
    if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return sender(`> **${newState.member.displayName} ${newState.channel} Adlı Kanalda Kamerasını Kapattı!**`,"#ff0000",log)

}
module.exports.conf = { name: Events.VoiceStateUpdate }

function sender(message, color, log) {
    let embed = new EmbedBuilder()
        .setDescription(message)
        .setColor(color !== null ? color : "Random")
        .addFields([{ name: "Zaman / Tarih", value: `**<t:${Math.floor(Date.now() / 1000)}> (<t:${Math.floor(Date.now() / 1000)}:R>)**` }])
    log.send({ embeds: [embed] })
}