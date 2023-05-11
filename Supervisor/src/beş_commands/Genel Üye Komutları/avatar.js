const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const canvafy = require('canvafy');
const db = client.db;
module.exports = {
    name: "avatar",
    usage: "avatar [@Beş / ID]",
    category:"genel",
    aliases: ["pp", "av"],
    execute: async (client, message, args, beş_embed) => {
        let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) : message.author;
        if (!user) 
        try {user = await client.users.fetch(args[0])}
        catch (err) { user = message.author; }
        client.true(message)
        message.reply({content:`> **${user.tag}**`,files:[{attachment:`${user.avatarURL({dynamic:true,size:2048})}`}]})
        
    }
}
