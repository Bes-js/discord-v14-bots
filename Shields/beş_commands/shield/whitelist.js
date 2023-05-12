const {PermissionFlagsBits } = require('discord.js');
const db = global.db;
let conf = require('../../beş_config')
module.exports = {
name: "whitelist",
aliases: ["wl","güvenli"],
execute:async (client, message, args, beş_embed) => {
conf.botOwners.push(message.guild.ownerId)
if(!conf.botOwners.some(bes => message.author.id == bes))return message.reply({content:`> **Komudu Kullanmak İçin Yetkin Yetersiz!**`})
let safe = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
let data = await db.get(`whitelist_${message.guild.id}`) || [];
if(!safe){
beş_embed.setDescription(`${data.length > 0 ? `> **Güvenli Listede \`${data.length}\` Adet Kişi / Rol Bulunmakta.**\n\n`+data.map((data,index) => `**${index+1}.) ${message.guild.members.cache.get(data) ? `<@!${data}> ${message.guild.members.cache.get(data).user.tag}` : `<@&${data}> ${message.guild.roles.cache.get(data).name}`} \`${data}\`**`).join("\n") :`**Güvenli Listede Kimse Bulunmamakta!**`}`).setThumbnail(message.guild.iconURL({dynamic:true})).setTitle("Güvenli Liste").setURL(`${message.url}`)
return message.reply({embeds:[beş_embed]})
}
if(data.includes(safe.id)){
db.pull(`whitelist_${message.guild.id}`,(eleman, sıra, array) => eleman == safe.id,true);
message.reply({embeds:[beş_embed.setDescription(`> **${safe} Başarıyla Güvenli Listeden Çıkartıldı!**`).setColor("#ff0000")]})
}else{
db.push(`whitelist_${message.guild.id}`,safe.id);
message.reply({embeds:[beş_embed.setDescription(`> **${safe} Başarıyla Güvenli Listeye Eklendi!**`).setColor("#00ff00")]})
}
}
}
