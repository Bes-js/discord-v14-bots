const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,TextInputStyle,ModalBuilder,PermissionFlagsBits,ChannelType,permissionOverwrites} = require("discord.js");
const bes_config = require("../../beş_config.json")
module.exports = async button => {
 let value = button.customId;
 if(button.isButton()){

if(value == "oda-oluştur"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(data)return button.reply({content:`> **Zaten Bir Özel Odan Bulunmakta!**`,ephemeral:true})

    const besModal = new ModalBuilder()
    .setCustomId('oda-create')
    .setTitle("Özel Oda Oluştur")

     let odaisim = new TextInputBuilder()
    .setCustomId('oda-adı')
    .setPlaceholder(`örn; Beş'in Haremi`)
    .setLabel("Oda Adı Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setMaxLength(10)
    .setRequired(true)
     let odalimit = new TextInputBuilder()
    .setCustomId('oda-limit')
    .setPlaceholder('0-99 | 0 = Sınırsız')
    .setLabel("Oda Limit'i Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(2)
    .setRequired(true)
     
    const name = new ActionRowBuilder().addComponents(odaisim);
	const limit = new ActionRowBuilder().addComponents(odalimit);
    besModal.addComponents(name,limit);

await button.showModal(besModal);

}else if(value == "user-ekle"){
let data = client.db.get(`özeloda_${button.member.id}`)
if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})

const besModal = new ModalBuilder()
    .setCustomId('user-add')
    .setTitle("Özel Oda Sistemi")

     let kisi = new TextInputBuilder()
    .setCustomId('kisi')
    .setPlaceholder(`örn; User ID`)
    .setLabel("Bir Kullanıcı ID'si Belirtin")
    .setStyle(TextInputStyle.Short)
    .setMinLength(5)
    .setMaxLength(25)
    .setRequired(true)
     
    const kisirow = new ActionRowBuilder().addComponents(kisi);
    besModal.addComponents(kisirow);

await button.showModal(besModal);

}else if(value == "user-cıkar"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
    
    const besModal = new ModalBuilder()
        .setCustomId('user-substr')
        .setTitle("Özel Oda Sistemi")
    
         let kisi = new TextInputBuilder()
        .setCustomId('kisi')
        .setPlaceholder(`örn; User ID`)
        .setLabel("Bir Kullanıcı ID'si Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(25)
        .setRequired(true)
         
        const kisirow = new ActionRowBuilder().addComponents(kisi);
        besModal.addComponents(kisirow);
    
    await button.showModal(besModal);
    
    }else if(value == "oda-bilgi"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
        
        let channel = button.guild.channels.cache.get(data)
        let users = client.db.get(`members_${data}`)
           
button.reply({content:
`\`\`\`fix
Oda Sahibi; ${button.member.user.tag}
Oda Adı; ${channel.name}
Oda Limiti; ${channel.userLimit == 0 ? "Sınırsız" : channel.userLimit} Kişilik
Odaya Giriş İzni Olan Kullanıcılar; ${users ? users.map((bes,n) => `${n+1}).${button.guild.members.cache.get(bes).user.tag}`).join(", ") : "Bulunamadı"}
\`\`\``,ephemeral:true})
        }else if(value == "oda-isim"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
        
        const besModal = new ModalBuilder()
        .setCustomId('oda-name')
        .setTitle("Özel Oda Sistemi")
    
         let odaisim = new TextInputBuilder()
        .setCustomId('oda-adı')
        .setPlaceholder(`örn; Beş'in Haremi`)
        .setLabel("Oda Adı Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(2)
        .setMaxLength(10)
        .setRequired(true)

        const name = new ActionRowBuilder().addComponents(odaisim);
        besModal.addComponents(name);
        await button.showModal(besModal);

    }else if(value == "oda-sil"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
        let channel = button.guild.channels.cache.get(data);
        channel.delete({reason:`Oda Sahibi Tarafından Silindi`})
        client.db.delete(`members_${data}`)
        client.db.delete(`${data}`)
        client.db.delete(`özeloda_${button.member.id}`)
       button.reply({content:`> **Özel Odan Başarıyla Silindi!**`,ephemeral:true})
    }else if(value == "sesten-at"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})

        const besModal = new ModalBuilder()
        .setCustomId('user-dis')
        .setTitle("Özel Oda Sistemi")
    
         let kisi = new TextInputBuilder()
        .setCustomId('kisi')
        .setPlaceholder(`örn; User ID`)
        .setLabel("Bir Kullanıcı ID'si Belirtin")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(25)
        .setRequired(true)
         
        const kisirow = new ActionRowBuilder().addComponents(kisi);
        besModal.addComponents(kisirow);
        await button.showModal(besModal);
    }else if(value == "oda-kilit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
            let channel = button.guild.channels.cache.get(data);
            channel.permissionOverwrites.edit(button.guild.roles.everyone,{
                Connect:false,
                ViewChannel:false,
                Stream:false,
                Speak:false
            });
            button.reply({content:`> **Özel Odan Başarıyla Herkese Kilitlendi!**`,ephemeral:true})
        }else if(value == "oda-herkes"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})
            let channel = button.guild.channels.cache.get(data);
            channel.permissionOverwrites.edit(button.guild.roles.everyone,{
                Connect:true,
                ViewChannel:true,
                Stream:true,
                Speak:true
            });
            button.reply({content:`> **Özel Odan Başarıyla Herkese Açıldı!**`,ephemeral:true})
        }else if(value == "oda-bit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})

            const besModal = new ModalBuilder()
            .setCustomId('bit-hız')
            .setTitle("Özel Oda Sistemi")
        
             let kisi = new TextInputBuilder()
            .setCustomId('bit')
            .setPlaceholder(`örn; 96`)
            .setLabel("Bir Bit Hızı Belirtin")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(3)
            .setRequired(true)
             
            const kisirow = new ActionRowBuilder().addComponents(kisi);
            besModal.addComponents(kisirow);
            await button.showModal(besModal);
        }else if(value == "oda-limit"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            if(!data)return button.reply({content:`> **Bir Özel Odan Bulunmamakta!**`,ephemeral:true})

            const besModal = new ModalBuilder()
            .setCustomId('oda-sayı')
            .setTitle("Özel Oda Sistemi")
        
             let kisi = new TextInputBuilder()
            .setCustomId('limit')
            .setPlaceholder(`örn; 90`)
            .setLabel("Bir Oda Limiti Belirtin")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(2)
            .setRequired(true)
             
            const kisirow = new ActionRowBuilder().addComponents(kisi);
            besModal.addComponents(kisirow);
            await button.showModal(besModal);
        }

}



if(button.isModalSubmit()){

if(value == "oda-create"){
var name = button.fields.getTextInputValue('oda-adı');
var limit = button.fields.getTextInputValue('oda-limit');

if(isNaN(limit)) limit = 1;
if(limit < 0) limit = 0;
if(limit > 99) limit = 99;

button.guild.channels.create({
        name: `#${name}`,
        type: ChannelType.GuildVoice,
        parent: bes_config.kategoriID,
        userLimit: limit,
        permissionOverwrites: [{id: button.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }, 
        {
        id: button.guild.id,
        deny: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async (bes) => {
        let invite = await bes.createInvite({maxUses: 1});
        await button.reply({content:`> **Özel Odan Başarıyla Açıldı!**\n> **Oda Adı; \`${name}\`**\n> **Oda Limit; \`${limit == 0 ? "Sınırsız":limit}\`**\n> **Oda Link'i;** https://discord.gg/${invite.code}`,ephemeral:true})
        await client.db.set(`özeloda_${button.member.id}`,`${bes.id}`)
        await client.db.set(`${bes.id}`,`${button.member.id}`)
        await client.db.push(`members_${bes.id}`,button.member.id)
        })

}else if(value == "user-add"){
    var userID = button.fields.getTextInputValue('kisi');
    let member = button.guild.members.cache.get(userID)
    if(!member)return button.reply({content:`> **Sunucuda Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})
    let data = await client.db.get(`özeloda_${button.member.id}`)
    let channel = button.guild.channels.cache.get(data);
    channel.permissionOverwrites.edit(member,{
        Connect:true,
        ViewChannel:true,
        Stream:true,
        Speak:true
    });
    let invite = channel.createInvite({maxUses: 1});
    member.user.send({content:`> **${button.user.username} Kullanıcısı Seni Özel Odasına Ekledi!**\n> **Odaya Katıl;** ${invite.code}`}).catch(e => { });
    client.db.push(`members_${data}`,member.id)
    button.reply({content:`> **${member} Kullanıcısı Kanala Başarıyla Eklendi!**`,ephemeral:true})

}else if(value == "user-substr"){
    var userID = button.fields.getTextInputValue('kisi');
    let member = button.guild.members.cache.get(userID)
    if(!member)return button.reply({content:`> **Sunucuda Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})
    let data = await client.db.get(`özeloda_${button.member.id}`)
    let channel = button.guild.channels.cache.get(data);
    channel.permissionOverwrites.edit(member,{
        Connect:false,
        ViewChannel:false,
        Stream:false,
        Speak:false
    });
    client.db.pull(`members_${data}`,(element, index, array) => element == member.id, true)
    button.reply({content:`> **${member} Kullanıcısı Kanaldan Başarıyla Çıkartıldı!**`,ephemeral:true})
}else if(value == "oda-name"){
    var isim = button.fields.getTextInputValue('oda-adı');
    let data = await client.db.get(`özeloda_${button.member.id}`)
    button.guild.channels.edit(data,{name:`#${isim}`});
    button.reply({content:`> **Oda Adı Başarıyla \`${isim}\` Olarak Değiştirildi!**`,ephemeral:true})
}else if(value == "user-dis"){
    let data = client.db.get(`özeloda_${button.member.id}`)
    var kisi = button.fields.getTextInputValue('kisi');
    let channel = button.guild.channels.cache.get(data);
    button.guild.members.fetch(kisi).then(bes => {
    if (bes.voice.channel.id !== channel.id) return button.reply({content:`> **Belirtilen Üye Özel Oda Kanalında Bulunmamakta!**`, ephemeral:true })
    button.reply({content:`> **${bes} Ses Kanalından Başarıyla Atıldı!**`, ephemeral: true })
    bes.voice.disconnect()
    }, err => { button.reply({content:`> **Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})})
    }else if(value == "bit-hız"){
        let data = client.db.get(`özeloda_${button.member.id}`)
        var bit = button.fields.getTextInputValue('bit');
        if(isNaN(bit))bit = 96;
        if(bit > 96) bit = 96;
        if(bit < 8) bit = 8;
        let channel = button.guild.channels.cache.get(data);
        channel.setBitrate(bit + `_000`)
        button.reply({content:`> **Özel Odanın Bit Hızı Başarıyla \`${bit}\` Olarak Ayarlandı!**`,ephemeral:true})
        }else if(value == "oda-sayı"){
            let data = client.db.get(`özeloda_${button.member.id}`)
            var sayı = button.fields.getTextInputValue('limit');
            if(isNaN(sayı))sayı = 99;
            if(sayı > 99) sayı = 99;
            if(sayı < 0) sayı = 0;
            let channel = button.guild.channels.cache.get(data);
            channel.setUserLimit(sayı)
            button.reply({content:`> **Özel Odanın Kişi Sayısı Başarıyla \`${sayı == 0 ? "Sınırsız": sayı}\` Olarak Ayarlandı!**`,ephemeral:true})
            }



}

}

module.exports.conf = {
name: "interactionCreate"
}
