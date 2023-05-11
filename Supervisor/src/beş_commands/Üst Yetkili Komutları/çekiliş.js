const { PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, Events,TextInputStyle,TextInputBuilder,ModalBuilder } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
const messages = require('../../../util/messages');
const ms = require("ms");
module.exports = {
    name: "çekiliş",
    usage: "çekiliş",
    category:"üstyt",
    aliases: ["giveaway", "çeklş","giveaways"],
    execute: async (client, message, args, beş_embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);


        let buttons = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setPlaceholder("Çekiliş İşlemini Şeçiniz!")
                .setCustomId("giveawaymenu")
                .setOptions([
                    { label: `Çekiliş Başlat`, description: `Bir Çekiliş Başlatır!`, value: `gvstart`, emoji: `🎉` },
                    { label: `Çekiliş Bitir`, description: `Aktif Olan Bir Çekilişi Bitirir!`, value: `gvend`, emoji: `🛑` }
                ])
        )

        
        let mesaj = await message.reply({ components: [buttons], embeds: [beş_embed.setDescription(`> **Menuden Bir \`Çekiliş\` İşlemi Belirtiniz!**`)] })
        message.delete();
        const collector = mesaj.createMessageComponentCollector({ filter: i => i.user.id === message.member.id, time: 30000, max: 1 });
        collector.on('end', async (beş) => {
            if (beş.size == 0) mesaj.delete();
        })
        collector.on('collect', async (beş) => {
            if (!beş.isStringSelectMenu()) return;
            let value = beş.values[0];
            switch (value) {
                case "gvstart":
                    mesaj.delete();
                    const modal = new ModalBuilder()
                    .setCustomId('gvstartModal')
                    .setTitle('Çekiliş Başlat');
                const gv1 = new TextInputBuilder()
                    .setCustomId('gvkanalid')
                    .setLabel("Çekilişin Yapılacağı Kanal ID")
                    .setPlaceholder("Örn; 123456789")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                const gv2 = new TextInputBuilder()
                    .setCustomId('gvprize')
                    .setLabel("Çekilişin Ödülü")
                    .setMinLength(3)
                    .setMaxLength(15)
                    .setPlaceholder("Örn; Spotify")
                    .setStyle(TextInputStyle.Paragraph)   
                    .setRequired(true);
                    const gv3 = new TextInputBuilder()
                    .setCustomId('gvtime')
                    .setMinLength(2)
                    .setMaxLength(3)
                    .setLabel("Çekiliş Süresi")
                    .setPlaceholder("Örn; 10m = 10 Dakika")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                    const gv4 = new TextInputBuilder()
                    .setCustomId('gvwinners')
                    .setLabel("Çekiliş Kazanacak Sayısı")
                    .setMinLength(1)
                    .setMaxLength(2)
                    .setPlaceholder("Örn; 2 = 2 Kişi Kazanır")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                    let g1 = new ActionRowBuilder().addComponents(gv1);
                    let g2 = new ActionRowBuilder().addComponents(gv2);
                    let g3 = new ActionRowBuilder().addComponents(gv3);
                    let g4 = new ActionRowBuilder().addComponents(gv4);
                    modal.addComponents(g1, g2, g3, g4);

                    await beş.showModal(modal);
            break;
                case "gvend":
                    mesaj.delete();
                    const modal2 = new ModalBuilder()
                    .setCustomId('gvendModal')
                    .setTitle('Çekiliş Bitir');
                const gvend1 = new TextInputBuilder()
                    .setCustomId('gvendid')
                    .setLabel("Bitirilecek Çekilişin Ödül Adı")
                    .setPlaceholder("Örn; Spotify")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
        
                    let gend = new ActionRowBuilder().addComponents(gvend1);
                    modal2.addComponents(gend);

                    await beş.showModal(modal2);

                break;

}

        })




    }
}

client.on(Events.InteractionCreate,async(beş) => {
if(!beş.isModalSubmit())return;
if (beş.customId === 'gvstartModal') {
    let kanal = beş.fields.getTextInputValue('gvkanalid');
    if(!beş.guild.channels.cache.get(kanal))return beş.reply({content:`> **\`${kanal}\` ID'sine Sahip Bir kanal Bulunamadı!**`})
    let prize = beş.fields.getTextInputValue('gvprize');
    let time = beş.fields.getTextInputValue('gvtime');
    let winnders = beş.fields.getTextInputValue('gvwinners');

    client.giveawaysManager.start(beş.guild.channels.cache.get(kanal), {duration: ms(time),winnerCount:parseInt(winnders),prize:prize,messages})
    beş.reply({content:`> **🎉 \`${prize}\` Ödüllü ${winnders} Kişinin Kazanacağı ${time} Sürelik Çekiliş ${beş.guild.channels.cache.get(kanal)} Kanalında Başlatıldı!**`})
    
}else if(beş.customId === 'gvendModal'){
let id = beş.fields.getTextInputValue('gvendid');
let x = client.giveawaysManager.giveaways.find((g) => g.prize === id)
client.giveawaysManager.end(x.messageId);
beş.reply({content:`> **🎉 \`${x.prize}\` Ödüllü Çekiliş Bitirildi!**`})
}
})