const { PermissionFlagsBits, Events, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = global.db;
const client = global.mainShield;
const {codeBlock} = require('@discordjs/formatters');
let conf = require('../../beş_config');
const { log } = console;
module.exports = {
    name: "guard-panel",
    aliases: ["backups", "yedekle", "yedek", "backup", "yt-kapat", "izinler"],
    execute: async (client, message, args, beş_embed) => {
        conf.botOwners.push(message.guild.ownerId)
        if(!conf.botOwners.some(bes => message.author.id == bes))return message.reply({content:`> **Komudu Kullanmak İçin Yetkin Yetersiz!**`})

        message.react(`✅`)
        const beş_buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("channelBackup")
                    .setLabel("Kanalları Yedekle")
                    .setEmoji("<:bes_channels:1101481345508720640>")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("roleBackup")
                    .setLabel("Rolleri Yedekle")
                    .setEmoji("<:bes_roles:1101481389599236217>")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("allBackup")
                    .setLabel("Herşeyi Yedekle")
                    .setEmoji("<:bes_alls:1101481450768978010>")
                    .setStyle(ButtonStyle.Success),
            );

        const beş_buttons2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("ytLock")
                    .setLabel("Yönetici Kapat")
                    .setEmoji("<:bes_lock:1101481556264104017>")
                    .setDisabled(db.has(`ytPerms_${message.guild.id}`) ? true : false)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("ytUnlock")
                    .setLabel("Yönetici Aç")
                    .setEmoji("<:bes_unlock:1101481688351133696>")
                    .setDisabled(db.has(`ytPerms_${message.guild.id}`) ? false : true)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("exit")
                    .setEmoji("<:bes_trash:1101482664084639754>")
                    .setLabel("İptal")
                    .setStyle(ButtonStyle.Danger),
            )

        message.reply(
            { embeds: [beş_embed.setDescription(`> **Aşşağıdaki Butonlardan Bir İşlem Stili Seçiniz!**\n${codeBlock("diff",`${conf.urlSystem == true ? "+":"-"} URL Koruma; ${conf.urlSystem == true ? "Aktif":"Deaktif"}`)}\n${codeBlock("diff",`${db.has(`ytPerms_${message.guild.id}`) == true ? "-":"+"} Yönetici Durumu; ${db.has(`ytPerms_${message.guild.id}`) == true ? "Yönetici Yetkileri Kapalı":"Yönetici Yetkileri Açık"}`)}`).setThumbnail(message.guild.iconURL({dynamic:true}))], components: [beş_buttons, beş_buttons2] }
        )


    }
}


client.on(Events.InteractionCreate, async (beş) => {
    if (!beş.isButton()) return;
    let value = beş.customId;
    if (value == "channelBackup") {
        if (!beş.member.permissions.has(PermissionFlagsBits.Administrator)) return beş.reply({ content: `> **Komudu Kullanmak İçin Yetkin Yetersiz!**`, ephemeral: true })
        channelBackUp(beş.guild, beş.guild.id)
        beş.message.edit({ content: `> **İşlem Başarılı!** *Kanalların Yedekleri Alınıyor..*`, embeds: [], components: [], ephemeral: true })
        beş.reply({ content: `> **Kanalların Yedekleri Alınıyor!**`, ephemeral: true })
    } else if (value == "roleBackup") {
        if (!beş.member.permissions.has(PermissionFlagsBits.Administrator)) return beş.reply({ content: `> **Komudu Kullanmak İçin Yetkin Yetersiz!**`, ephemeral: true })
        roleBackUp(beş.guild, beş.guild.id)
        beş.message.edit({ content: `> **İşlem Başarılı!** *Rollerin Yedekleri Alınıyor..*`, embeds: [], components: [], ephemeral: true })
        beş.reply({ content: `> **Rollerin Yedekleri Alınıyor!**`, ephemeral: true })
    } else if (value == "allBackup") {
        if (!beş.member.permissions.has(PermissionFlagsBits.Administrator)) return beş.reply({ content: `> **Komudu Kullanmak İçin Yetkin Yetersiz!**`, ephemeral: true })
        channelBackUp(beş.guild, beş.guild.id)
        roleBackUp(beş.guild, beş.guild.id)
        beş.message.edit({ content: `> **İşlem Başarılı!** *Kanalların Ve Rollerin Yedekleri Alınıyor..*`, embeds: [], components: [], ephemeral: true })
        beş.reply({ content: `> **Rol Ve Kanalların Yedekleri Alınıyor!**`, ephemeral: true })
    } else if (value == "ytLock") {
        if (!beş.member.permissions.has(PermissionFlagsBits.Administrator)) return beş.reply({ content: `> **Komudu Kullanmak İçin Yetkin Yetersiz!**`, ephemeral: true })
        beş.guild.roles.cache.filter(role => role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed).forEach(role => {
            db.push(`ytPerms_${beş.guild.id}`, role.id)
        })
        beş.message.edit({ content: `> **İşlem Başarılı!** *Yetkiler Veritabanına Kaydedildi Ve İzinleri Kapatılıyor..*`, embeds: [], components: [], ephemeral: true })
        beş.reply({ content: `> **Yönetici Yetkisine Sahip ${beş.guild.roles.cache.filter(role => role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed).map((bes) => `<@&${bes.id}>`).join(",")} Rollerin İzinleri Kapatılıyor!**`, ephemeral: true })
        beş.guild.roles.cache.filter(rol => rol.editable).filter(rol => rol.permissions.has(PermissionFlagsBits.Administrator)).forEach(async (rol) => rol.setPermissions(0n));
    } else if (value == "ytUnlock") {
        if (!beş.member.permissions.has(PermissionFlagsBits.Administrator)) return beş.reply({ content: `> **Komudu Kullanmak İçin Yetkin Yetersiz!**`, ephemeral: true })
        let data = await db.get(`ytPerms_${beş.guild.id}`) || []
        if (data.length <= 0) return beş.reply({ content: `> **Veri Tabanında Kayıtlı Yetkili Permleri Bulunmamakta!**`, ephemeral: true })
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                let bes = data[i];
                beş.guild.roles.cache.get(bes).setPermissions(8n).catch(err => { });
            }
            beş.message.edit({ content: `> **İşlem Başarılı!** *Veritabanındaki Yetkilerin İzinleri Açılıyor..*`, embeds: [], components: [], ephemeral: true })
            beş.reply({ content: `> **Önceden Yönetici Yetkisine Sahip ${data.length} Adet ${data.map((bes) => `<@&${bes}>`).join(",")} Rollerinin İzinleri Geri Açılıyor!**`, ephemeral: true })
            db.delete(`ytPerms_${beş.guild.id}`)
        }
    } else if (value == "exit") {
        if (!beş.member.permissions.has(PermissionFlagsBits.Administrator)) return beş.reply({ content: `> **Komudu Kullanmak İçin Yetkin Yetersiz!**`, ephemeral: true })
        beş.message.delete()
        beş.reply({ content: `> **İşlem Başarıyla İptal Edildi!**`, ephemeral: true })
    }

})





async function roleBackUp(guild, guildID) {
    if (db.all().includes("roleBackup_")) {
        db.all().filter(data => data.ID.includes("roleBackup_")).forEach(data => {
            db.delete(data.ID)
        })
    }

    guild.roles.cache.forEach(async role => {
        let rolePerms = [];
        await guild.channels.cache.filter(beş =>
            beş.permissionOverwrites.cache.has(role.id)).forEach(bes => {
                let channelPerm = bes.permissionOverwrites.cache.get(role.id);
                rolePerms.push({ id: bes.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() });
            });

        db.set(`roleBackup_${guildID}_${role.id}`,
            {
                roleID: role.id,
                name: role.name,
                color: role.hexColor,
                hoist: role.hoist,
                position: role.position,
                permissions: role.permissions.bitfield,
                mentionable: role.mentionable,
                members: role.members.map(m => m.id),
                writes: rolePerms
            })
    });
    log("Rollerin Verileri Başarıyla Yedeklendi!")
};


async function channelBackUp(guild, guildID) {
    if (db.all().includes("channelBackup_")) {
        db.all().filter(data => data.ID.includes("channelBackup_")).forEach(data => {
            db.delete(data.ID)
        })
    }

    if (guild) {
        const channels = [...guild.channels.cache.values()];
        for (let index = 0; index < channels.length; index++) {
            const channel = channels[index];
            let chanPerms = [];
            channel.permissionOverwrites.cache.forEach(beş => {
                chanPerms.push({ id: beş.id, type: beş.type, allow: `${beş.allow.bitfield}`, deny: `${beş.deny.bitfield}` });
            });
            if (channel.type == 4) {
                db.set(`channelBackup_${guildID}_${channel.id}`,
                    {
                        type: channel.type,
                        channelID: channel.id,
                        name: channel.name,
                        position: channel.position,
                        writes: chanPerms
                    })
            }
            if ((channel.type == 0) || (channel.type == 5)) {
                db.set(`channelBackup_${guildID}_${channel.id}`,
                    {
                        type: channel.type,
                        channelID: channel.id,
                        name: channel.name,
                        nsfw: channel.nsfw,
                        parentID: channel.parentId,
                        position: channel.position,
                        rateLimit: channel.rateLimitPerUser,
                        writes: chanPerms
                    })
            }
            if (channel.type == 2) {
                db.set(`channelBackup_${guildID}_${channel.id}`,
                    {
                        type: channel.type,
                        channelID: channel.id,
                        name: channel.name,
                        bitrate: channel.bitrate,
                        userLimit: channel.userLimit,
                        parentID: channel.parentId,
                        position: channel.position,
                        writes: chanPerms
                    })
            }
        }

        log("Kanal Verileri Başarıyla Yedeklendi!");
    }
}
