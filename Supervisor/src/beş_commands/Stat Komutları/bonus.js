const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder, StringSelectMenuBuilder, ComponentType, codeBlock, Embed } = require("discord.js");
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
    name: "bonus",
    usage: "bonus [+/-] [@Beş / ID] <Adet>",
    category: "stat",
    aliases: ["davetbonus", "bonusekle", "bonuss", "ekstra", "davetekle"],
    execute: async (client, message, args, beş_embed) => {
    if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({embeds:[beş_embed.setDescription(`> **Yeterli Yetki Bulunmamakta!**`)]}).sil(5);

    let cmd = args[0];
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let value = Number(args[2]);
    if (cmd == '+') {
    if (!member) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Kullanıcı Belirtin!**`)] })
    if (!value) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Değer Belirtin!**`)] })

    let data = await invite.findOne({ guildId: message.guild.id, userId: member.id })
    if (!data) {
        await new invite({ guildId: message.guild.id, userId: member.id, Regular: 0, Fake: 0, Left: 0, leftedMembers: [], Bonus: value }).save();
        await message.reply({ embeds: [beş_embed.setDescription(`> **${member} Kullanıcısına ${value} Adet Bonus Davet Eklendi!**`)] })
    } else {
        data.Bonus += value
        await data.save();
        await message.reply({ embeds: [beş_embed.setDescription(`> **${member} Kullanıcısına ${value} Adet Bonus Davet Eklendi!**`)] })

    }
} else if (cmd == '-') {
    if (!member) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Kullanıcı Belirtin!**`)] })
    if (!value) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Değer Belirtin!**`)] })
    let data = await invite.findOne({ guildId: message.guild.id, userId: member.id });
    if (!data) return message.reply({ embeds: [beş_embed.setDescription(`> **Kullanıcının Davet Verisi Bulunmamakta!**`)] })
    data.Bonus -= value;
    await data.save();
    await message.reply({ embeds: [beş_embed.setDescription(`> **${member} Kullanıcısının ${value} Adet Bonus Daveti Silindi!**`)] })
} else {
    message.reply({ embeds: [beş_embed.setDescription(`> **Örnek Kullanım; \`${beş_config.prefix}bonus [+ / -] [@Beş / ID] [5]\`**`)] })
}



    }
}
