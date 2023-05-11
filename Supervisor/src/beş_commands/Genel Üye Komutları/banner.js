const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const canvafy = require('canvafy');
const axios = require('axios');
const db = client.db;
module.exports = {
    name: "banner",
    usage: "banner [@Beş / ID]",
    category:"genel",
    aliases: ["bannr", "bayrak", "arkaplan"],
    execute: async (client, message, args, beş_embed) => {
        let user = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) : message.author;
        if (!user)
            try { user = await client.users.fetch(args[0]) }
            catch (err) { user = message.author; }
        client.true(message)
        async function bannerURL(user, client) {
            const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
            if (!response.data.banner) return `http://colorhexa.com/${response.data.banner_color.replace("#", "")}.png`
            if (response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
            else return (`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
        }
        let bannerurl = await bannerURL(user.id, client)
        message.reply({ content: `> **${user.tag}**`, files: [{ attachment: `${bannerurl}` }] })

    }
}
