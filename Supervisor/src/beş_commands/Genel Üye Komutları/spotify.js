const {PermissionFlagsBits, ActivityType} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const canvafy = require('canvafy');
const db = client.db;
module.exports = {
    name: "spotify",
    usage:"spotify [@Beş / ID]",
    category:"genel",
    aliases: ["spoti","şarkı","dinlediğim","müzik","spotfy"],
    execute: async (client, message, args, beş_embed) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (member && member.presence && member.presence.activities && member.presence.activities.some(five => five.name == "Spotify" && five.type == ActivityType.Listening)) {
          let durum = await member.presence.activities.find(five => five.type == ActivityType.Listening);
          const spotify = await new canvafy.Spotify()
          .setAuthor(durum.state)
          .setAlbum(durum.assets.largeText)
          .setBackground("image", `${message.guild.bannerURL({extension:"png",size:2048}) !== null ? message.guild.bannerURL({extension:"png",size:2048}) : beş_config.shipArkaplan}`)
          .setImage(`https://i.scdn.co/image/${durum.assets.largeImage.slice(8)}`)
          .setTimestamp(new Date(Date.now()).getTime() - new Date(durum.timestamps.start).getTime(), new Date(durum.timestamps.end).getTime() - new Date(durum.timestamps.start).getTime())
          .setTitle(durum.details)
          .build();
        
          return message.reply({files:[{name:"canvafy.png",attachment:spotify}],embeds: [beş_embed.setImage('attachment://canvafy.png')] });
        }else{ return message.reply({embeds: [beş_embed.setDescription(`> **Kullanıcı Spotify Üzerinde Şarkı Dinlemiyor!**`)] });}

    }
}
