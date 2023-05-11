const {PermissionFlagsBits} = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "unforceban",
    usage:"unforceban [@Beş / ID]",
    category:"moderasyon",
    aliases: ["un-forceban", "unforceyasakla","unforceyasaklama","kalkmazbankaldır","kalkmaz-ban-kaldır"],
    execute: async (client, message, args, beş_embed) => {
        var member = await client.users.fetch(args[0]);
        let forcedata = await db.get(`forcebans`) || [];
        if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        if(!member) return message.reply({ embeds: [beş_embed.setDescription(`> **Geçerli Bir User Belirt!**`)] }).sil(5);
        if(member.id == message.author.id) return message.reply({ embeds: [beş_embed.setDescription(`> **Kendine İşlem Uygulayamazsın!**`)]}).sil(5);
        if(member.bot) return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Bot'a İşlem Uygulayamazsın!**`)]}).sil(5);
        if(!forcedata.includes(member.id)) return message.reply({ embeds: [beş_embed.setDescription(`> **Belirtilen Üyenin Bir Kalıcı Yasaklaması Bulunmamakta!**`)]}).sil(5);
        const fetchBans = message.guild.bans.fetch()
        fetchBans.then(async (bans) => {
        let ban = await bans.find(bes => bes.user.id === member.id)
        if (!ban) {
            db.pull(`forcebans`,(eleman, sıra, array) => eleman == member.id) 
            await client.ceza(member.id,message,"UNFORCEBAN",null,Date.now())
        }else{ 
            db.pull(`forcebans`,(eleman, sıra, array) => eleman == member.id) 
            message.guild.members.unban(member.id);
            await client.ceza(member.id,message,"UNFORCEBAN",null,Date.now())
        }
    })

    }
}