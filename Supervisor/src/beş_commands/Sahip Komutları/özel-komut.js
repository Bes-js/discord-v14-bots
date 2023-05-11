const { PermissionFlagsBits,ActionRowBuilder, StringSelectMenuBuilder,codeBlock } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const moment = require("moment");
require("moment-duration-format");
const db = client.db;
module.exports = {
    name: "özel-komut",
    category:"sahip",
    usage: "özel-komut [ekle/çıkar/liste]",
    aliases: ["ökomut", "özelkomut"],
    execute: async (client, message, args, beş_embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.reply({ embeds: [beş_embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
       
        if(!["ekle","çıkar","liste"].some(x=> args[0] == x))return message.reply({ embeds: [beş_embed.setDescription(`> **Bir Argüman Belirtin!**\n\n> \`${beş_config.prefix}özel-komut ekle <komut adı> [verilecek RolID] [verebilecek RolID]\`\n> \`${beş_config.prefix}özel-komut çıkar\`\n> \`${beş_config.prefix}özel-komut liste\``)] }).sil(5);
        if(message.mentions.roles.first())return message.reply({ embeds: [beş_embed.setDescription(`> **Rolleri Etiket İle Değil, ID İle Belirtiniz!**`)] }).sil(5);
        if(args[0] == "ekle"){
        const komutisim = args[1];
        const permRolID = args[2];
        const yetkiRolID = args[3]
        if(!komutisim || !permRolID || !yetkiRolID) return message.reply({ embeds: [beş_embed.setDescription(`> **Eksiksiz Girdiğinize Emin Olunuz!**\n\n> \`${beş_config.prefix}özel-komut ekle <komut adı> [verilecek RolID] [verebilecek RolID]\``)] }).sil(5);
        const permsData = db.get(`ozelkomutlar`) || [];  //approval,luhux <3
        if(permsData.some(veri=> veri.permName == komutisim)) return message.reply({ embeds: [beş_embed.setDescription(`> **Bu Komut Zaten Daha Önceden Eklenmiş!**`)] }).sil(5);
        if(permsData.length >= 15) return message.reply({ embeds: [beş_embed.setDescription(`> **\`15\`'den Fazla Özel Komut Ekliyemezsin!**`)] }).sil(5);
        db.push(`ozelkomutlar`,{permID:permRolID,permName:komutisim,staffRoleID:yetkiRolID})
        message.reply({embeds:[beş_embed.setDescription(`${codeBlock("md",`# Komut Eklendi!\n< Kullanım: ${beş_config.prefix}${komutisim} <@Luppux/ID>\n> ${komutisim}\n> ${message.guild.roles.cache.get(permRolID).name}\n> ${message.guild.roles.cache.get(yetkiRolID).name} `)}`)]})
        }
        if(args[0] == "çıkar"){
            const permsData = db.get(`ozelkomutlar`) || [];  //approval,luhux <3
            var liste = [{label:"İşlemi İptal Et!",description:"Menüyü Kapatır.",value:`iptal`}];
            for (let i = 0; i < permsData.length; i++) {
                const veri = permsData[i];
                liste.push({label:`Komut: ${veri.permName}`,description:`Rol: ${message.guild.roles.cache.get(veri.permID) ? message.guild.roles.cache.get(veri.permID).name : "Rol Silinmiş."}`,value:`${veri.permName}`})
            }
        const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("permler")
            .setOptions(liste)
            .setPlaceholder("Silmek İstediğiniz Komutu Seçin!")
        )
        message.channel.send({components:[menu],embeds:[beş_embed.setDescription(`> **Listeden Silmek İstediğiniz Komutu Seçin!**`)]}).then(async msg =>{
            var filter = (button) => button.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 60000,max:3})
            collector.on("collect",async(i)=>{
            await i.deferUpdate();
            for (let index = 0; index < liste.length; index++) {
            if(i.values[0] == `${liste[index].value}`){
            db.pull("ozelkomutlar", (eleman, sıra, array) => eleman.permName == liste[index].value, true)
            message.reply({ embeds: [beş_embed.setDescription(`> **\`${liste[index].value}\` Adlı Komut Başarıyla Silindi!**`)]})
            }
            }   
            if(i.values[0] == "iptal") {
                if(msg) await msg.delete();
                if(message) await message.delete();
                } 
            })
        })
        }
        if(args[0] == "liste"){
            const permsData = db.get(`ozelkomutlar`) || [];  //approval,luhux <3
            message.channel.send({embeds:[beş_embed.setDescription(`> **${permsData.length == 0 ? "Eklenmiş Özel Komut Bulunmamakta!":`Toplam \`${permsData.length}\` Adet Özel Komut Aşağıda Listelenmiştir!`}**\n\n ${permsData.length == 0 ? " " : `${codeBlock("md",
            `${permsData.map(x=> `# ${x.permName.toUpperCase()} \n> Kullanım: .${x.permName} @Luppux/ID\n< Rol: ${message.guild.roles.cache.get(x.permID) ? message.guild.roles.cache.get(x.permID).name : "Rol Silinmiş."}\n< Y. Rolü: ${message.guild.roles.cache.get(x.staffRoleID) ? message.guild.roles.cache.get(x.staffRoleID).name : "Rol Silinmiş."}`).join("\n")}`
            )}`}`)]})
        }


    }
}
