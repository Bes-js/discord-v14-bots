const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');
const db = global.db;
let conf = require('../../beş_config')
module.exports = {
    name: "rol-kur",
    aliases: ["rol-setup", "rolkur", "rolkurulum","role-setup"],
    execute: async (client, message, args, beş_embed) => {
        conf.botOwners.push(message.guild.ownerId)
        if(conf.botOwners.some(bes => message.author.id !== bes))return message.reply({content:`> **Komudu Kullanmak İçin Yetkin Yetersiz!**`})
        let role = args[0];
        if (!role || isNaN(role)) return message.reply({ content: `> **Doğru Bir Değer Giriniz!**\n> \`${conf.prefix}rol-kur <Rol ID>\`` })
        let data = await db.get(`roleBackup_${message.guild.id}_${role}`)
        if (!data) return message.reply({ content: `> **Veritabanında \`${role}\` ID'ye Sahip Bir Rol Bulunamadı!**` })

        let mesaj = await message.reply({ content: `> **Lütfen Bekleyiniz..**` })

        const newRole = await message.guild.roles.create({
            name: data.name,
            color: data.color,
            hoist: data.hoist,
            position: data.position,
            permissions: data.permissions,
            mentionable: data.mentionable,
            reason: "Shield ~ Rol Kurtarma!"
        });

        setTimeout(() => {
            let channelWrites = data.writes;
            if (channelWrites) channelWrites.forEach((bes, index) => {
                let channel = message.guild.channels.cache.get(bes.id);
                if (!channel) return;
                setTimeout(() => {
                    let obj = {};
                    bes.allow.forEach(p => {
                        obj[p] = true;
                    });
                    bes.deny.forEach(p => {
                        obj[p] = false;
                    });
                    channel.permissionOverwrites.create(newRole, obj).catch(console.error);
                }, index * 5000);
            });
        }, 5000);


        let length = data.members.length;
        if (length <= 0) return console.log(`[${newRole.name}] Veritabanı Üzerinde Role Kayıtlı Kullanıcı Olmadığından Rol Dağıtımı İptal Edildi!`);
        mesaj.edit({ content: `> **Data Üzerinde \`${length}\` Rol'e Sahip Üye Bulundu, Rol Açıldı Ve Dağıtılmaya Başlanıyor!**` })
        let alls = data.members;
        if (alls.length <= 0) return;
        alls.every(async id => {
            let member = message.guild.members.cache.get(id);
            if (!member) { console.log(`[${newRole.name}] ${id}'li Üye Sunucuda Bulunamadı!`); return true; }
            await member.roles.add(newRole.id).then(e => {
                console.log(`[${newRole.name}] ${member.user.tag} Üyesine Rol Verildi!`);
            }).catch(e => {
                console.log(`[${newRole.id}] ${member.user.tag} Üyesine Rol Verilemedi!`);
            });
        });



    }
}