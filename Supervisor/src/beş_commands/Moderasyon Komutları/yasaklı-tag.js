const {PermissionFlagsBits, EmbedBuilder} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "yasaklıtag",
    usage:"yasaklıtag [tag]",
    category:"moderasyon",
    aliases: ["yasaktag","yasaklı-tag","yasak-tag"],
    fives:async(client,guild)=>{
        let data = db.get(`bannedtags`) || [];
        let jailRoles = db.get("five-jail-roles") || [];
        if(jailRoles.length == 0 || data.length == 0)return;
        guild.members.cache.filter(user => data.some(zort => user.user.tag.includes(zort))).map(async(member) => {
        if (member.roles.cache.get(jailRoles[0]) || member.user.bot) return
        member.setNickname(`Yasaklı Tag`).catch(() => { });
        await member.roles.cache.has(guild.roles.premiumSubscriberRole ?guild.roles.premiumSubscriberRole.id : "5") ? member.roles.set([guild.roles.premiumSubscriberRole.id,...jailRoles]) : member.roles.set([...jailRoles]).catch(() => { })
        if(client.kanalbul("yasaklı-tag-log")){
        client.kanalbul("yasaklı-tag-log").send({ embeds: [new EmbedBuilder().setDescription(`> **${member} İsminde \` Yasaklı Tag \` Mevcut!**\n> **Üyeye <@&${jailRoles[0]}> Rolü Ayarlandı!**`).setColor(`#FF0000`)]}).catch();
        }})
    },
    execute: async (client, message, args, beş_embed) => {
        let tag = args[0];
        let data = db.get(`bannedtags`) || [];
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        if(!tag) return message.reply({ embeds: [beş_embed.setDescription(`> **${data.map((x,i) => `${i+1}). ${x}`).join("\n")}**`).setTitle("Yasaklı Tag Listesi").setURL(message.url)] })
        if(tag == beş_config.tagSymbol) return message.reply({ embeds: [beş_embed.setDescription(`> **Sunucunun Tagını Yasaklıya Ekliyemezsin!**`)]}).sil(5);

        if(data.includes(tag)){
        db.pull(`bannedtags`,(eleman, sıra, array) => eleman == tag)
        message.reply({ embeds: [beş_embed.setDescription(`> **${client.emoji("emote_true") !== null ? client.emoji("emote_true") : "✅"} Belirtilen ${tag} Tagı Yasaklı Taglardan Çıkartıldı!**`)]})
        }else{
        db.push(`bannedtags`,tag)
        message.reply({ embeds: [beş_embed.setDescription(`> **${client.emoji("emote_true") !== null ? client.emoji("emote_true") : "✅"} Belirtilen ${tag} Tagı Yasaklı Taglara Eklendi!**`)]})
        }

    }
} 