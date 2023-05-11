const { PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, Utils, codeBlock } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "ysay",
    usage: "ysay",
    category:"üstyt",
    aliases: ["yetkili-say", "yetkilisay","anons","yetkili-duyuru"],
    execute: async (client, message, args, beş_embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);

        let yt = await db.get("five-register-staff") || [];
        if(!yt.length > 0)return client.false(message); 

    let beş = message.guild.members.cache.filter(member => member.roles.cache.has(yt[0]) && !member.voice.channel && !member.user.bot).map(member => ("<@" + member.user.id + ">")).join(",");

let beş2 = message.guild.members.cache.filter(member =>member.roles.cache.has(yt[0]) && !member.voice.channel && (member.presence && member.presence.status != "offline") && !member.user.bot).map(member => ("<@" + member.user.id + ">")).join(",");

let ToplamYetkili = message.guild.roles.cache.get(yt[0]).members.size
let SesteOlanYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(yt[0]) && member.voice.channel && !member.user.bot).size;
let SesteOlanmayanYetkili = message.guild.members.cache.filter(member => member.roles.cache.has(yt[0]) && !member.voice.channel && !member.user.bot).size;
let OnStaff = message.guild.members.cache.filter(members => members.roles.cache.has(yt[0]) && !members.user.bot && (members.presence && members.presence.status != "offline")).size


message.reply({embeds:[beş_embed.addFields([
  {name:`Toplam Yetkili`,value:client.sayıEmoji(ToplamYetkili),inline:false},  
  {name:`Seste Olan Yetkili`,value:client.sayıEmoji(SesteOlanYetkili),inline:false},  
  {name:`Seste Olmayan Yetkili`,value:client.sayıEmoji(SesteOlanmayanYetkili),inline:false},  
  {name:`Aktif Yetkili`,value:client.sayıEmoji(OnStaff),inline:false},  
]).setTitle("Yetkili Anons").setURL(message.url).setThumbnail(message.guild.iconURL({dynamic:true,forceStatic:true}))]})


const chunk = client.splitMessage(beş, 1500)
const chunk2 = client.splitMessage(beş2, 1500)
message.channel.send({content:`> **Seste Olmayan Yetkililer;**`})
for (msg of chunk) {
   await message.channel.send({content:codeBlock("fix",msg)})
  }

message.channel.send({content:`> **Aktif Olup Seste Olmayan Yetkililer;**`})
for (msg of chunk2) {
    await message.channel.send({content:codeBlock("fix",msg)})
  }
       

    }
}

