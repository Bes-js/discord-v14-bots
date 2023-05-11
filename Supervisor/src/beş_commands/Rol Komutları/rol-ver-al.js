const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder,codeBlock } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "rol",
    usage: "rol ver / al [@Beş / ID] [@Rol / ID]",
    category:"rol",
    aliases: ["rol-işlem", "r"],
    execute: async (client, message, args, beş_embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers) && !message.member.permissions.has(PermissionFlagsBits.ManageRoles)) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        if (!args[0]) return message.reply({ embeds: [beş_embed.setDescription(`> **Eksik Argüman Girildi!**\n> \`${beş_config.prefix}rol ver / al @User @Role\``)] }).sil(5);
        if (args[0] != "al") {
            if (args[0] != "ver") {
                return message.reply({ embeds: [beş_embed.setDescription(`> **Eksik Argüman Girildi!**\n> \`${beş_config.prefix}rol ver / al @User @Role\``)] }).sil(5);
            }
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!user) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)] }).sil(5);
        if (user.user.bot) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Bot'a İşlem Uygulayamazsın!**`)]}).sil(5);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if (!role) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir Rol Belirt!**`)] }).sil(5);
        if (message.member.roles.highest.rawPosition <= role.rawPosition) return message.reply("> **Rol Kendi Rolünden Üst/Eşit Durumda İşlem Geçersiz.**")
        if (!role.editable) return message.reply({ embeds: [beş_embed.setDescription(`> **Belirtilen Role İşlem Yapmaya Yetkim Yetmiyor!**`)] }).sil(5);
        if (args[0] == "al") {
            if (user.roles.cache.has(role.id)) {
                user.roles.remove(role.id)
                client.true(message)
                db.push(`rollog-${user.id}`,`\`[-]\` ${message.author} (\`${message.author.id}\`)\n*Tarih;* **<t:${Math.floor(Date.now()/1000)}> (<t:${Math.floor(Date.now()/1000)}:R>)**\n*Rol;* ${role} (\`${role.id}\`)`)
                if (client.kanalbul("rol-log")) client.kanalbul("rol-log").send({
                    embeds: [beş_embed.setDescription(`> **${user} Kullanıcısından ${role} Rolü Alındı!**`).addFields(
                        { name: `Alan Kişi`, value: `${codeBlock("diff", message.author.tag + " / " + message.author.id)}`, inline: false },
                        { name: `Alınan Kişi`, value: `${codeBlock("diff", user.user.tag + " / " + user.id)}`, inline: false },
                        { name: `Alınan Rol`, value: `${role} (\`${role.id}\`)`, inline: false }
                    ).setColor("#ff0000")]
                })
            } else {
                client.false(message)
                return message.reply({ embeds: [beş_embed.setDescription(`> **${user} Kullanıcısında ${role} Rolü Mevcut Değil!**`)] }).sil(5);
            }
        }
        if (args[0] == "ver") {
            if (!user.roles.cache.has(role.id)) {
                user.roles.add(role.id)
                client.true(message)
                db.push(`rollog-${user.id}`,`\`[+]\` ${message.author} (\`${message.author.id}\`)\n*Tarih;* **<t:${Math.floor(Date.now()/1000)}> (<t:${Math.floor(Date.now()/1000)}:R>)**\n*Rol;* ${role} (\`${role.id}\`)`)
                if (client.kanalbul("rol-log")) client.kanalbul("rol-log").send({
                    embeds: [beş_embed.setDescription(`> **${user} Kullanıcısına ${role} Rolü Verildi!**`).addFields(
                        { name: `Veren Kişi`, value: `${codeBlock("diff", message.author.tag + " / " + message.author.id)}`, inline: false },
                        { name: `Verilen Kişi`, value: `${codeBlock("diff", user.user.tag + " / " + user.id)}`, inline: false },
                        { name: `Verilen Rol`, value: `${role} (\`${role.id}\`)`, inline: false }
                    ).setColor("#00ff00")]
                })
            } else {
                client.false(message)
                return message.reply({ embeds: [beş_embed.setDescription(`> **${user} Kullanıcısında ${role} Rolü Zaten Mevcut!**`)] }).sil(5);
            }
        }
    }
}
