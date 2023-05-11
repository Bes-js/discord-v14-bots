const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, beş_embedBuilder, StringSelectMenuBuilder, ComponentType, codeBlock, beş_embed } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
const ms = require("ms")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr");
const canvafy = require("canvafy");
const messageGuild = require("../../beş_schemas/messageGuildSchema");
const messageGuildChannel = require("../../beş_schemas/messageGuildChannelsSchema");
const voiceGuild = require("../../beş_schemas/voiceGuildSchema");
const voiceGuildChannel = require("../../beş_schemas/voiceGuildChannelsSchema");
const messageUser = require("../../beş_schemas/messagesSchema");
const voiceUser = require("../../beş_schemas/voicesSchema");
const point = require("../../beş_schemas/staffsSchema");
const invite = require("../../beş_schemas/invitesSchema");
const task = require("../../beş_schemas/tasksSchema");
module.exports = {
    name: "puan",
    usage: "puan [+/-] [@Beş / ID] <Adet>",
    category: "stat",
    aliases: ["puans", "bonuspuan", "puanekle","puan-ekle"],
    execute: async (client, message, args, beş_embed) => {
    if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({embeds:[beş_embed.setDescription(`> **Yeterli Yetki Bulunmamakta!**`)]}).sil(5);

    const msgMember = message.member;

           if(!args[0])return message.reply({ embeds: [beş_embed.setDescription("> **Eksik Argüman Belirtmelisin!**\n> *ekle / sil / gönder*")] });
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if (!member) return message.reply({ embeds: [beş_embed.setDescription("> **Bir Kullanıcı Belirtmelisin!**")] });
            if (args[0] === "ekle") {
                 if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply({ embeds: [beş_embed.setDescription(`> ** Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
                const count = parseInt(args[2]);
                if (!count) return message.reply({ embeds: [beş_embed.setDescription("> **Eklemek İçin Bir Sayı Belirtmelisin!**")] });
                if (!count < 0) return message.reply({ embeds: [beş_embed.setDescription("> **Eklenecek Sayı 0'dan Küçük Olamaz!**")] });
    
                await point.updateOne({ guildId: member.guild.id, userId: member.user.id }, { $inc: { point: count } }, { upsert: true });
                const pointData = await point.findOne({ guildId: member.guild.id, userId: member.user.id });
                let addedRoles = "";
                if (pointData && client.ranks.some((x) => pointData.point >= x.point && !member.hasRole(x.role))) {
                    const roles = client.ranks.filter((x) => pointData.point >= x.point && !member.hasRole(x.role));
                    addedRoles = roles;
                    member.roles.add(roles[roles.length - 1].role);
                    beş_embed.setColor("#00ff00");
                    client.kanalbul("rank-log").send({
                        embeds: [
                            beş_embed.setDescription(
                                `> **${member.toString()} Üyesine ${msgMember.toString()} Tarafından ${count} Adet Puan Eklendi Ve Kişiye** ${roles
                                    .filter((x) => roles.indexOf(x) === roles.length - 1)
                                    .map((x) => (Array.isArray(x.role) ? x.role.listRoles() : `<@&${x.role}>`))
                                    .join("\n")} **Rolleri Verildi!**`
                            )
                        ]
                    });
                }
                message.reply({
                    embeds: [
                        beş_embed.setDescription(
                            `> **Başarıyla ${member.toString()} Kullanıcısına ${count} Adet Puan Eklendi! **\n\n${
                                addedRoles.length > 0
                                    ? `**Verilen Roller: **\n${addedRoles
                                            .filter((x) => addedRoles.indexOf(x) === addedRoles.length - 1)
                                            .map((x) => (Array.isArray(x.role) ? x.role.listRoles() : `<@&${x.role}>`))
                                            .join("\n")}`
                                    : ""
                            }`
                        )
                    ]
                });
            } else if (args[0] === "sil") {
                 if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [beş_embed.setDescription(`> **${config.emojis.no} Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
                const count = parseInt(args[2]);
                if (!count) return message.reply({ embeds: [beş_embed.setDescription("> **Çıkarılacak Bir Sayı Belirtmelisin!**")] });
                if (!count < 0) return message.reply({ embeds: [beş_embed.setDescription("> **Çıkarılacak Sayı 0'dan Küçük Olamaz!**")] });
                let pointData = await point.findOne({ guildId: member.guild.id, userId: member.user.id });
                if (!pointData || (pointData && count > pointData.point)) return message.reply({ embeds: [beş_embed.setDescription("> **Çıkarmak İstediğiniz Sayı Kişinin Mevcut Puanından Büyük Olamaz!**")] });
    
                await point.updateOne({ guildId: member.guild.id, userId: member.user.id }, { $inc: { point: -count } }, { upsert: true });
                pointData = await point.findOne({ guildId: member.guild.id, userId: member.user.id });
                let removedRoles = "";
                if (pointData && client.ranks.some((x) => pointData.point < x.point && member.hasRole(x.role))) {
                    const roles = client.ranks.filter((x) => pointData.point < x.point && member.hasRole(x.role));
                    removedRoles = roles;
                    roles.forEach((x) => {
                        member.roles.remove(x.role);
                    });
                    beş_embed.setColor("#ff0000");
                    client.kanalbul("rank-log").send({
                        embeds: [
                            beş_embed.setDescription(
                                `> **${member.toString()} Üyesinden ${msgMember.toString()} Tarafından ${count} Adet Puan Çıkarıldı Ve Kişiden** ${
                                    Array.isArray(roles) ? roles.listRoles() : `<@&${roles}}>`
                                } **Rolleri Alındı!**`
                            )
                        ]
                    });
                }
                message.reply({
                    embeds: [
                        beş_embed.setDescription(
                            `> **Başarıyla ${member.toString()} Kullanıcısından ${count} Adet Puan Çıkarıldı!**\n\n${
                                removedRoles.length > 0 ? `**Alınan Roller:** \n${removedRoles.listRoles()}` : ""
                            }`
                        )
                    ]
                });
            } else if (args[0] === "gönder") {
                const count = parseInt(args[2]);
                if (!count) return message.reply({ embeds: [beş_embed.setDescription("> **Puan Vermek İçin Bir Sayı Belirtmelisin!**")] });
                if (!count < 0) return message.reply({ embeds: [beş_embed.setDescription("> **Verilecek Sayı 0'dan Küçük Olamaz!**")] });
                let pointData = await point.findOne({ guildId: member.guild.id, userId: msgMember.user.id });
                if (!pointData || (pointData && count > pointData.point)) return message.reply({ embeds: [beş_embed.setDescription("> **Göndereceğin Puan Kendi Puanından Yüksek Olamaz!**")] });
    
                await point.updateOne({ guildId: member.guild.id, userId: member.user.id }, { $inc: { point: count } }, { upsert: true });
                await point.updateOne({ guildId: member.guild.id, userId: msgMember.user.id }, { $inc: { point: -count } }, { upsert: true });
                pointData = await point.findOne({ guildId: member.guild.id, userId: msgMember.user.id });
                if (pointData && client.ranks.some((x) => pointData.point < x.point && msgMember.hasRole(x.role))) {
                    const roles = client.ranks.filter((x) => pointData.point < x.point && msgMember.hasRole(x.role));
                    roles.forEach((x) => msgMember.roles.remove(x.role));
                }
                const pointData2 = await point.findOne({ guildId: member.guild.id, userId: member.user.id });
                if (pointData2 && client.ranks.some((x) => pointData2.point >= x.point && !member.hasRole(x.role))) {
                    const roles = client.ranks.filter((x) => pointData2.point >= x.point && !member.hasRole(x.role));
                    member.roles.add(roles[roles.length - 1].role);
                }
    
                message.reply({ embeds: [beş_embed.setDescription(`> **${member.toString()} Kişisine ${count} Puan Gönderildi!**`)] });
            }else{
    return message.reply({ embeds: [beş_embed.setDescription("> **Eksik Argüman Belirtmelisin!**\n> *ekle / sil / gönder*")] });
    
    }


    }
}
