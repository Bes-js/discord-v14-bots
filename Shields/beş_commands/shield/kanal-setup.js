const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const db = global.db;
let conf = require('../../beş_config')
module.exports = {
    name: "kanal-kur",
    aliases: ["kanal-setup", "kanalkur", "kanalkurulum","channel-setup"],
    execute: async (client, message, args, beş_embed) => {
      conf.botOwners.push(message.guild.ownerId)
      if(conf.botOwners.some(bes => message.author.id !== bes))return message.reply({content:`> **Komudu Kullanmak İçin Yetkin Yetersiz!**`})
        let channel = args[0];
        if (!channel || isNaN(channel)) return message.reply({ content: `> **Doğru Bir Değer Giriniz!**\n> \`${conf.prefix}rol-kur <Rol ID>\`` })
        let data = await db.get(`channelBackup_${message.guild.id}_${channel}`)
        if (!data) return message.reply({ content: `> **Veritabanında \`${channel}\` ID'ye Sahip Bir Rol Bulunamadı!**` })
        let mesaj = await message.reply({ content: `> **Lütfen Bekleyiniz..**` })
        let type = data.type;
        let newChannel;
        if((type == 0) || (type == 5)){
           newChannel = await message.guild.channels.create({
                name: data.name,
                type: data.type,
                nsfw: data.nsfw,
                parent: data.parentID,
                position: data.position + 1,
                rateLimitPerUser: data.rateLimit
              })
        mesaj.edit({ content: `> **${newChannel.name} Adlı [TEXT] Kanalı Kuruluyor Ve Rol İzinleri Ayarlanıyor!**`})
              const newOverwrite = [];
              for (let index = 0; index < data.writes.length; index++) {
                const veri = data.writes[index];
                newOverwrite.push({
                  id: veri.id,
                  allow: new PermissionsBitField(veri.allow).toArray(),
                  deny: new PermissionsBitField(veri.deny).toArray()
                });
              }
              await newChannel.permissionOverwrites.set(newOverwrite);
             return;

        }else if(type == 2){


        }else if(type == 4){


        }



    }
}