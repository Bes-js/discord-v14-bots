const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder,Util, Utils } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const moment = require("moment");
require("moment-duration-format");
const db = client.db;
module.exports = {
    name: "emoji-ekle",
    usage: "emoji-ekle [emoji]",
    category:"sahip",
    aliases: ["emojiekle", "eekle","emote-ekle","emoteekle","emoji-yükle"],
    execute: async (client, message, args, beş_embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
       if(!args.length) return message.reply({ embeds: [beş_embed.setDescription(`> **Yetersiz Argüman Girildi!**`)] }).sil(5);
       if(args.length > 5) return message.reply({ embeds: [beş_embed.setDescription(`> **Tek Seferde \`5\` Adet Emoji Ekliyebilirsin!**`)] }).sil(5);
       for(let raw of args){
       let parsed = parseEmoji(raw);
       if(parsed.id){
        let ext = parsed.animated ? ".gif" : ".png";
        let url = `https://cdn.discordapp.com/emojis/${parsed.id}${ext}`;
        let emoji = await message.guild.emojis.create({name:parsed.name,attachment:url}).catch(err => {return message.reply({content:`> **Bir Hata Oluştu!** ${err}`})})
        message.reply({ embeds: [beş_embed.setThumbnail(emoji.url).setColor("#00ff00").setDescription(`> **\`${emoji.name}\` Adlı Emoji Sunucuya Eklendi!**`)] })
       }
       }
       client.true(message)
     
    }
}
function parseEmoji(text) {
    if (text.includes('%')) text = decodeURIComponent(text);
    if (!text.includes(':')) return { animated: false, name: text, id: undefined };
    const match = text.match(/<?(?:(a):)?(\w{1,32}):(\d{17,19})?>?/);
    return match && { animated: Boolean(match[1]), name: match[2], id: match[3] };
  }