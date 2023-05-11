const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder, StringSelectMenuBuilder, ComponentType, codeBlock, Embed } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
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
const taggeds = require("../../beş_schemas/taggedsSchema")
module.exports = {
    name: "tag-aldır",
    usage: "tag-aldır [@Beş / ID",
    category: "stat",
    aliases: ["tagaldır","tagal"],
    execute: async (client, message, args, beş_embed) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!beş_config.staffs.some(bes => message.member.roles.cache.has(bes)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers))return message.reply({embeds:[beş_embed.setDescription(`> **Yeterli Yetki Bulunmamakta!**`)]}).sil(5);
        if(!member)return message.reply({embeds:[beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)]}).sil(5);
        let tagData = await db.get("five-tags") || [];
        if(!tagData.length > 0) return message.reply({ embeds:[beş_embed.setDescription(`> **Bu Sunucuda Tag Bulunmamakta!**`)]}).sil(5);
        if(tagData.some(tag => member.user.username.includes(tag))){
            const taggedData = await taggeds.findOne({ guildId: member.guild.id, userId: message.member.id });
            if (taggedData && taggedData.Data.includes(member.user.id)) return message.reply({ embeds: [beş_embed.setDescription("> **Bu Üyeye Zaten Daha Önceden Tag Aldırılmış!**")] });
            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("confirm").setLabel("Onay").setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId("deny").setLabel("Red").setStyle(ButtonStyle.Danger)
            );
            let mesaj = await message.reply({ content: member.toString(), components: [buttons], embeds: [beş_embed.setDescription(`> **${message.member} Üyesi Sana Tag Aldırmak İstiyor! Kabul Ediyor Musun?**`)] });
    
            const collector = await mesaj.createMessageComponentCollector({ filter: (i) => i.user.id === member.user.id, time: 60000 });
    
            collector.on("collect", async (i) => {
                if (i.customId === "confirm") {
            await point.updateOne({ guildId: message.guild.id, userId: message.member.id }, { $inc: { point: 15 } }, { upsert: true });
                    beş_embed.setColor("#00ff00").setDescription(`> **${member.toString()} Üyesi Tag Teklifini Kabul Etti!**`);
                    i.update({ embeds: [beş_embed], components: [] });
                    await taggeds.updateOne({ guildId: message.guild.id, userId: message.member.id }, { $push: { Data: member.user.id } }, { upsert: true });
                   message.member.updateTask(message.guild.id, "taglı", 1, message.channel);
                } else {
                    beş_embed.setColor("#ff0000").setDescription(`> **${member.toString()} Kullanıcısı Tag Teklifini Reddedti!**`);
                    i.update({ embeds: [beş_embed], components: [] });
                }
            });
        }else{
          return message.reply({ embeds: [beş_embed.setDescription("> **Üyenin Üzerinde Tag Bulunmamakta!**")] }).sil(5);
        }


    }
}
