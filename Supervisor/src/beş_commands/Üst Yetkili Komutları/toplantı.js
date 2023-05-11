const { PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "toplantı",
    usage: "toplantı",
    category:"üstyt",
    aliases: ["meeting", "meetings"],
    execute: async (client, message, args, beş_embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);

        let katıldı = client.rolinc("katıldı");
        if (!katıldı) return message.reply({ embeds: [beş_embed.setDescription(`> **Sunucuda \`katıldı\` Adında Rol Bulunamadı!**`)] }).sil(5);
        let uyarı = client.rolinc("uyarı");
        if (!uyarı) return message.reply({ embeds: [beş_embed.setDescription(`> **Sunucuda \`uyarı\` Adında Rol Bulunamadı!**`)] }).sil(5);
        let mazeretli = client.rolinc("mazeret");
        if (!mazeretli) return message.reply({ embeds: [beş_embed.setDescription(`> **Sunucuda \`mazeretli\` Adında Rol Bulunamadı!**`)] }).sil(5);
        let altytrol = await db.get("five-register-staff") || [];
        if (!altytrol.length > 0) return message.reply({ embeds: [beş_embed.setDescription(`> **Kayıt Yetkisi Olmadığı İçin İşlem Gerçekleştirilemedi!** *Lütfen Setup Panelden Kayıt Yetkisini Ayarlayınız.*`)] }).sil(5);
        let altyt = message.guild.roles.cache.get(altytrol[0]);

        let buttons = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setPlaceholder("Toplantı İşlemini Şeçiniz!")
                .setCustomId("meetingmenu")
                .setOptions([
                    { label: `Toplantı Başlat`, description: `Toplantıyı Bulunduğunuz Ses Kanalında Başlatır Ve Rol Dağıtır!`, value: `meetingstart`, emoji: `🟢` },
                    { label: `Toplantı Duyuru`, description: `Yetkilileri DM Üzerinden Toplantıya Çağırır!`, value: `meetingcall`, emoji: `📣` }
                ])
        )

        let mesaj = await message.reply({ components: [buttons], embeds: [beş_embed.setDescription(`> **Menuden Bir \`Toplantı\` İşlemi Belirtiniz!**`)] })
        const collector = mesaj.createMessageComponentCollector({ filter: i => i.user.id === message.member.id, time: 30000, max: 1 });
        collector.on('end', async (beş) => {
            if (beş.size == 0) mesaj.delete();
        })
        collector.on('collect', async (beş) => {
            if (!beş.isStringSelectMenu()) return;
            let value = beş.values[0];
            switch (value) {
                case "meetingstart":
                    let voiceuser = message.guild.members.cache.filter(member => member.roles.highest.position >= altyt.position && member.voice.channel && !member.user.bot)
                    let nvoiceuser = message.guild.members.cache.filter(member => member.roles.highest.position >= altyt.position && !member.voice.channel && !member.user.bot)
                    let mazeret = message.guild.roles.cache.get(mazeretli.id).members.size;
                    beş.reply({ content: `${beş.member}`, embeds: [beş_embed.setDescription(`> **Katıldı Rolü Verilecek Sayısı ${client.sayıEmoji(voiceuser.size)}**\n> **Katıldı Rolü Alınacak Sayısı ${client.sayıEmoji(nvoiceuser.size)}**\n> **Mazeretli Kişi Sayısı ${client.sayıEmoji(mazeret)}**\n\n> **Toplantıda Olmayan ${client.sayıEmoji(nvoiceuser.size)} Kişiye ${uyarı} Rolü Veriliyor..**\n> **Toplantıda Olan ${client.sayıEmoji(voiceuser.size)} Kişiye ${katıldı} Rolü Veriliyor..**`)] })
                    beş.message.delete();
                    voiceuser.array().forEach((bes, index) => {
                        setTimeout(async () => {
                            bes.roles.add(katıldı)
                        }, index * 1000)
                    })
                    nvoiceuser.array().forEach((bes, index) => {
                        setTimeout(async () => {
                            bes.roles.add(uyarı)
                        }, index * 1000)
                    })
        
            break;
                case "meetingcall":
                    let nnvoiceuser = beş.guild.members.cache.filter(member => member.roles.highest.position >= altyt.position && !member.voice.channel && !member.user.bot)
                 if(nnvoiceuser.length == 0)return beş.reply({ embeds: [beş_embed.setDescription(`> **Sunucudaki Tüm Yetkililer Seste Bulunuyor!**`)] }).sil(15);
                 let mesaj = await beş.reply({ embeds: [beş_embed.setDescription(`> **Seste Olmayan ${client.sayıEmoji(nnvoiceuser.size)} Kişiye DM Üzerinden Duyuru Geçiliyor!** *Lütfen Biraz Bekleyiniz.*`)] });
                 beş.message.delete();
                 nnvoiceuser.forEach((bes, index) => {
                    setTimeout(() => {
                    bes.send(`> **Yetkili Olduğun \`${beş.guild.name}\` Sunucusunda Toplantı Başlıyor! Toplantıda Bulunmadığın İçin Sana Bu Mesajı Gönderiyorum, Eğer Toplantıya Katılmazsan Uyarı Alıcaksın!**`).then(five => mesaj.edit(`> **${bes} Kişisine DM Üzerinden Duyuru Yapıldı!**`).catch((err) => { beş.channel.send(`> **${yetkili} Yetkili Olduğun \`${beş.guild.name}\` Sunucusunda Toplantı Başlıyor, Toplantıda Bulunmadığın İçin Sana Bu Mesajı Gönderiyorum, Eğer Toplantıya Katılmazsan Uyarı Alıcaksın!**`).then(x => mesaj.edit({embeds:[beş_embed.setDescription(`> **${yetkili} Kişisinin DM'i Kapalı Olduğundan Kanalda Duyuru Yapıldı!**`)]}))}));
                    }, index*5000);
                    })
    break;
}

        })




    }
}