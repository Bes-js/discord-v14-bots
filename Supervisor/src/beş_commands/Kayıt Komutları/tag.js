const {PermissionFlagsBits} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "tag",
    usage:"tag",
    category:"kayıt",
    aliases: ["tags","taglar"],
    execute: async (client, message, args, beş_embed) => {
    let tagData = await db.get("five-tags") || [];
    if(!tagData.length > 0) return message.reply({ embeds:[beş_embed.setDescription(`> **Bu Sunucuda Tag Bulunmamakta!**`)]}).sil(5);
    return message.reply({content:`> ${tagData.map((bes) => `**${bes}**`).join(",")}`});
    }
}