const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "afk",
    usage: "afk <Sebep>",
    category:"genel",
    aliases: ["afık", "afeka"],
    execute: async (client, message, args, beş_embed) => {
        if (message.member.displayName.startsWith("[AFK]") || db.has(`afk-${message.author.id}`)) return client.false(message);
        let reason = args.slice(0).join(' ') || "Sebep Belirtilmedi";
        db.set(`afk-${message.author.id}`, { reason: reason, time: Date.now(), nick: message.member.displayName })
        message.member.setNickname(`[AFK] ` + message.member.displayName).catch(err => { })
        return message.channel.send({ embeds: [beş_embed.setDescription(`> **${message.member} "${["www", ".com", "discord.gg", ".gg", "discord"].some(bes => reason.includes(bes)) ? `(Reklam)` : reason}" Sebebiyle AFK Moduna Giriş Yaptın!**`)] }).sil(5);
    }
}

client.on(Events.MessageCreate, async (message) => {
    if(message.content.startsWith(".afk"))return;
    if (message.mentions.users.first()) {
        let data = db.get(`afk-${message.mentions.users.first().id}`)
        if (!data) return;
        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`> **${message.mentions.users.first()} "${["www", ".com", "discord.gg", ".gg", "discord"].some(bes => data.reason.includes(bes)) ? `(Reklam)` : data.reason}" Sebebiyle <t:${Math.floor(data.time / 1000)}:R> AFK Moduna Geçiş Yaptı!**`).setColor("Random")] }).sil(8);
    }else 
    if (db.has(`afk-${message.author.id}`)) {
        let data = db.get(`afk-${message.author.id}`)
        message.member.setNickname(data.nick).catch(err => { })
        db.delete(`afk-${message.author.id}`)
        return message.reply({ embeds: [new EmbedBuilder().setDescription(`> **${message.member} Başarıyla AFK Modundan Çıkış Yaptın!**`).setColor("Random")] }).sil(6);
    }
})