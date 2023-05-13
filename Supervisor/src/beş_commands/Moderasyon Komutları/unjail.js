const {PermissionFlagsBits} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "unjail",
    usage:"unjail [@Beş / ID] <sebep>",
    category:"moderasyon",
    aliases: ["unjails", "uncezalı","unceza","ceza-kaldır","cezakaldır"],
    execute: async (client, message, args, beş_embed) => {
        var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(' ');
        let staffData = await db.get("five-jail-staff") || [];
        let jailRoles = await db.get("five-jail-roles") || [];
        let unregisterRoles = await db.get("five-unregister-roles") || [];
        let limitData = await db.get(`jaillimit-${message.author.id}`) || 0;
        if(!staffData.length > 0)console.error("Jail Yetkilisi Ayarlı Değil!");
        if(!unregisterRoles.length > 0){
        console.error("Kayıtsız Rolleri Ayarlı Değil!");
        return client.false(message);
        }
        if(!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers))return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        if(!member) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)] }).sil(5);
        if(member.id == message.author.id) return message.reply({ embeds: [beş_embed.setDescription(`> **Kendine İşlem Uygulayamazsın!**`)]}).sil(5);
        if(member.user.bot) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Bot'a İşlem Uygulayamazsın!**`)]}).sil(5);
        if(member.roles.highest.position > message.member.roles.highest.position) return message.reply({ embeds: [beş_embed.setDescription(`> **Kendinden Üst/Aynı Pozisyondaki Birine İşlem Uygulayamazsın!**`)]}).sil(5);
        if (limitData >= beş_config.limit.jailLimit)return message.reply({ embeds: [beş_embed.setDescription(`> **Cezalıya Atma Limitin Dolmuş Durumda, Lütfen Sonra Tekrar Dene!**`)]}).sil(5);
        if (reason.length < 1)return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir Sebep Belirt!**`)]}).sil(5);
        if (!member.roles.cache.has(jailRoles[0]))return message.reply({ embeds: [beş_embed.setDescription(`> **Belirtilen User Zaten Cezalıda!**`)]}).sil(5);
        if(!member.manageable)return message.reply({ embeds: [beş_embed.setDescription(`> **Belirtilen User'a İşlem Yapmaya Yetkim Yetmiyor!**`)]}).sil(5);

        await message.guild.members.cache.get(member.id).setNickname(`${beş_config.kayitsizHesapIsim}`);
        await member.roles.cache.has(message.guild.roles.premiumSubscriberRole ? message.guild.roles.premiumSubscriberRole.id : "5") ? member.roles.set([message.guild.roles.premiumSubscriberRole.id,...unregisterRoles]) : member.roles.set([...unregisterRoles])
        await client.ceza(member.id,message,"UNJAIL",reason,Date.now())

    }
}
