const {PermissionFlagsBits, ActivityType} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const canvafy = require('canvafy');
const db = client.db;
module.exports = {
    name: "kullanıcı-bilgi",
    usage:"kullanıcı-bilgi [@Beş / ID]",
    category:"kayıt",
    aliases: ["kbilgi","kb","kullanıcıbilgi","info","inf"],
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
        
          return message.reply({files:[{name:"canvafy.png",attachment:spotify}],embeds: [beş_embed.setDescription(
            `**
            • Kullanıcı: (<@${member.id}> - \`${member.id}\`) (${member.roles.highest})
            • Sunucuya Katılım Sırası: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
            • Hesap Kuruluş: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
            • Sunucuya Katılım: <t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)
            • Rolleri: ${(member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Üzerinde Hiç Rol Bulunmamakta!')}
            • Avatar: [Tıkla](${member.user.displayAvatarURL({dynamic:true})})**
            `).setThumbnail(member.user.displayAvatarURL({dynamic:true})).setTitle(`${member.user.tag} Bilgileri`).setImage('attachment://canvafy.png').setURL(`https://linktr.ee/beykant`)] });
        }

       return message.reply({embeds: [beş_embed.setDescription(
      `**
      • Kullanıcı: (<@${member.id}> - \`${member.id}\`) (${member.roles.highest})
      • Sunucuya Katılım Sırası: ${(message.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}
      • Hesap Kuruluş: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
      • Sunucuya Katılım: <t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)
      • Rolleri: ${(member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Üzerinde Hiç Rol Bulunmamakta!')}
      • Avatar: [Tıkla](${member.user.displayAvatarURL({dynamic:true})})**
      `).setThumbnail(member.user.displayAvatarURL({dynamic:true})).setTitle(`${member.user.tag} Bilgileri`).setImage(message.guild.bannerURL({dynamic:true,size: 4096})).setURL(`https://linktr.ee/beykant`)] });
    }
}
