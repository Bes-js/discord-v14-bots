const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder, StringSelectMenuBuilder, ComponentType, codeBlock } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr");
const messageUserChannel = require("../../beş_schemas/messageChannelsSchema");
const voiceUserChannel = require("../../beş_schemas/voiceChannelsSchema");
const messageUser = require("../../beş_schemas/messagesSchema");
const voiceUser = require("../../beş_schemas/voicesSchema");
const voiceUserParent = require("../../beş_schemas/voiceParentsSchema");
const invite = require("../../beş_schemas/invitesSchema");
module.exports = {
    name: "stat",
    usage: "stat [@Beş / ID]",
    category: "stat",
    aliases: ["stats", "me", "istatistik", "verilerim"],
    execute: async (client, message, args, beş_embed) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let erkek = await db.get(`erkek-${member.id}`) || 0;
       let kadın = await db.get(`kadın-${member.id}`) || 0;

        const category = async (parentsArray) => {
            const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.user.id });
            const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
            let voiceStat = 0;
            for (var i = 0; i <= voiceUserParentData.length; i++) { voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0; }
            return moment.duration(voiceStat).format("H [Saat], m [Dakika], s [Saniye]");
        };

        const Active1 = await messageUserChannel.find({ guildId: message.guild.id, userId: member.user.id }).sort({ channelData: -1 });
        const Active2 = await voiceUserChannel.find({ guildId: message.guild.id, userId: member.user.id }).sort({ channelData: -1 });
        const voiceLength = Active2 ? Active2.length : 0;
        const chatLength = Active1 ? Active1.length : 0;
        let voiceTop;
        let messageTop;
        Active1.length > 0 ? (messageTop = Active1.splice(0, 5).map((x) => `<#${x.channelId}>: \`${Number(x.channelData).toLocaleString()} Mesaj\``).join("\n")) : (messageTop = "*Veri Bulunmamakta*");
        Active2.length > 0 ? (voiceTop = Active2.splice(0, 5).map((x) => `<#${x.channelId}>: \`${moment.duration(x.channelData).format("H [Saat], m [Dakika], s [Saniye]")}\``).join("\n")) : (voiceTop = "*Veri Bulunmamakta*");
        const messageData = await messageUser.findOne({ guildId: message.guild.id, userId: member.user.id });
        const voiceData = await voiceUser.findOne({ guildId: message.guild.id, userId: member.user.id });
        const messageDaily = messageData ? messageData.dailyStat : 0;
        const messageWeekly = messageData ? messageData.weeklyStat : 0;
        const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [Saat], m [Dakika], s [Saniye]");
        const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [Saat], m [Dakika], s [Saniye]");
        const cameraData = moment.duration(voiceData ? voiceData.cameraStat : 0).format("H [Saat], m [Dakika], s [Saniye]");
        const streamData = moment.duration(voiceData ? voiceData.streamStat : 0).format("H [Saat], m [Dakika], s [Saniye]");
        const invites = await invite.findOne({ guildId: message.guild.id, userId: member.user.id });

        const beş_dropdown = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`me`)
                    .setPlaceholder("Filtrelenmiş Veriler İçin Tıkla!")
                    .addOptions([
                        { label: `Anasayfa`, description: `Anasayfaya Dönmek İçin Tıkla!`, value: `anasayfa5`, emoji: `${client.emoji("emote_web") !== null ? client.emoji("emote_web"):"1105493458933792819"}` },
                        { label: `Günlük Veriler`, description: `Günlük Verileri Görmek İçin Tıkla!`, value: `gun`, emoji: `${client.emoji("emote_time") !== null ? client.emoji("emote_time"):"1105494402136285376"}` },
                        { label: `Haftalık Veriler`, description: `Haftalık Verileri Görmek İçin Tıkla!`, value: `hafta`, emoji: `${client.emoji("emote_time") !== null ? client.emoji("emote_time"):"1105494402136285376"}` },
                        { label: `Toplam Veriler`, description: `Toplam Verileri Görmek İçin Tıkla!`, value: `toplam`, emoji: `${client.emoji("emote_time") !== null ? client.emoji("emote_time"):"1105494402136285376"}` },
                        { label: `Kategori Verileri`, description: `Kategori Verilerini Görmek İçin Tıkla!`, value: `kategori`, emoji: `${client.emoji("emote_others") !== null ? client.emoji("emote_others"):"1102624779950895134"}` },
                        { label: `Kamera Verileri`, description: `Kamera Verilerini Görmek İçin Tıkla!`, value: `kamera`, emoji: `${client.emoji("emote_camera") !== null ? client.emoji("emote_camera"):"1105493457453187162"}` },
                        { label: `Yayın Verileri`, description: `Yayın Verilerini Görmek İçin Tıkla!`, value: `yayın`, emoji: `${client.emoji("emote_computer") !== null ? client.emoji("emote_computer"):"1102621545022627850"}` },
                        { label: `Kayıt Verileri`, description: `Kayıt Verilerini Görmek İçin Tıkla!`, value: `kayıt`, emoji: `${client.emoji("emote_others") !== null ? client.emoji("emote_others"):"1102624779950895134"}` }]))

    beş_embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
    beş_embed.setDescription(`> **${member.user.toString()} Kullanıcısının <t:${Math.floor(Date.now()/1000)}:R>ki Verileri;**\n⠀\n`)
    beş_embed.addFields([{name: `${client.emoji("emote_chat") !== null ? client.emoji("emote_chat"):"💭"} • **Toplam Mesaj**`, value: codeBlock("fix",`${messageData ? messageData.topStat : 0} Mesaj`)},
    {name: `${client.emoji("emote_voice") !== null ? client.emoji("emote_voice"):"🔉"} • **Toplam Ses**`, value: codeBlock("fix",`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [Saat], m [Dakika], s [Saniye]")}`)},
    {name: `${client.emoji("emote_invite") !== null ? client.emoji("emote_invite"):"📩"} • **Toplam Davet**`, value: codeBlock("js",`Gerçek: ${invites ? invites.Regular : 0}, Sahte: ${invites ? invites.Fake : 0}, Ayrılan: ${invites ? invites.Left : 0}, Bonus: ${invites ? invites.Bonus : 0}`)}])
    beş_embed.addFields([{name:"⠀", value:`⠀`}]);
    beş_embed.addFields([{name:`${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • **Sohbet Ettiğin Chat Kanalları:**\n> **(\`Toplam ${chatLength} Kanal\`)**`,value: `${messageTop}`}]);
    beş_embed.addFields([{name:`${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • **Vakit Geçirdiğin Voice Kanalları:**\n> **(\`Toplam ${voiceLength} Kanal\`)**`,value:`${voiceTop}`}]);
    beş_embed.setFooter({text:`Menü Üzerinden Verilerinize Filtre Uygulayabilirsiniz`,iconURL:member.user.avatarURL({ dynamic: true, size: 2048 })})

    message.reply({ embeds: [beş_embed], components: [beş_dropdown] }).then(b2 => {
        
            const filter = i => i.user.id === message.member.id;
            const collector = b2.createMessageComponentCollector({componentType:ComponentType.StringSelect, filter: filter, time: 60000 });

            collector.on('end', async b => {
            beş_dropdown.components[0].setDisabled(true);
            b2.edit({ content: `> **Menü Zaman Aşımına Uğradı..**`, components: [beş_dropdown] })
            })
            collector.on('collect', async b => {
                if (!b.isStringSelectMenu()) return;
                const value = b.values[0]
                const daily_bes = new EmbedBuilder()
                .setDescription(`> **${member.user.toString()} Kullanıcısının Günlük Ses Ve Mesaj Verileri;**`)
                .addFields([{name:`${client.emoji("emote_chat") !== null ? client.emoji("emote_chat"):"💭"} • **Günlük Mesaj**`,value:codeBlock("fix",`${Number(messageDaily).toLocaleString()} Mesaj`)}])
                .addFields([{name:`${client.emoji("emote_voice") !== null ? client.emoji("emote_voice"):"🔉"} • **Günlük Ses**`,value:codeBlock("fix",`${voiceDaily}`)}]).setColor(`#2f3136`).setTitle(`Günlük Veriler`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))


                const weekly_bes = new EmbedBuilder()
                .setDescription(`> **${member.user.toString()} Kullanıcısının Haftalık Ses Ve Mesaj Verileri;**`)
                .addFields([{name:`${client.emoji("emote_chat") !== null ? client.emoji("emote_chat"):"💭"} • **Haftalık Mesaj**`,value:codeBlock("fix",`${Number(messageWeekly).toLocaleString()} Mesaj`)}])
                .addFields([{name:`${client.emoji("emote_voice") !== null ? client.emoji("emote_voice"):"🔉"} • **Haftalık Ses**`,value:codeBlock("fix",`${voiceWeekly}`)}]).setColor(`#2f3136`).setTitle(`Haftalık Veriler`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

                const total_bes = new EmbedBuilder()
                .setDescription(`> **${member.user.toString()} Kullanıcısının Haftalık Ses Ve Mesaj Verileri;**`)
                .addFields([{name:`${client.emoji("emote_chat") !== null ? client.emoji("emote_chat"):"💭"} • **Toplam Mesaj**`,value:codeBlock("fix",`${messageData ? messageData.topStat : 0} Mesaj`)}])
                .addFields([{name:`${client.emoji("emote_voice") !== null ? client.emoji("emote_voice"):"🔉"} • **Toplam Ses**`,value:codeBlock("fix",`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [Saat], m [Dakika], s [Saniye]")}`)}]).setColor(`#2f3136`).setTitle(`Toplam Veriler`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))


        const cat_bes = new EmbedBuilder()
        .setDescription(`> **${member.user.toString()} Kullanıcısının Kategori Verileri;**`)
        .addFields([{name:`**${client.emoji("emote_others") !== null ? client.emoji("emote_others"):"❓"} • Kategori Bilgileri:**`,value:`
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [Saat], m [Dakika], s [Saniye]")}\`**
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Public & Sohbet: \`${await category(beş_config.parents.publicParents)}\`**
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Kayıt & Welcome: \`${await category(beş_config.parents.registerParents)}\`**
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Sorun Çözme & Terapi: \`${await category(beş_config.parents.solvingParents)}\`**
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Private & Alone: \`${await category(beş_config.parents.privateParents)}\`**
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Oyun & Stream: \`${await category(beş_config.parents.aloneParents)}\`**
        **${client.emoji("emote_value") !== null ? client.emoji("emote_value"):"🔹"} • Konser & Eğlence: \`${await category(beş_config.parents.funParents)}\`**`}]
        ).setColor(`#2f3136`).setTitle(`Kategori Verileri`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

        const camera_bes = new EmbedBuilder()
                .setDescription(`> **${member.user.toString()} Kullanıcısının Kamera Verileri;**`)
                .addFields([{name:`${client.emoji("emote_camera") !== null ? client.emoji("emote_camera"):"📸"} • **Kamera Verisi**`,value:codeBlock("fix",`${cameraData}`)}]).setColor(`#2f3136`).setTitle(`Kamera Verileri`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

                const stream_bes = new EmbedBuilder()
                .setDescription(`> **${member.user.toString()} Kullanıcısının Yayın Verileri;**`)
                .addFields([{name:`${client.emoji("emote_computer") !== null ? client.emoji("emote_computer"):"🖥️"} • **Yayın Verisi**`,value:codeBlock("fix",`${streamData}`)}]).setColor(`#2f3136`).setTitle(`Yayın Verileri`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

                const kayıt_bes = new EmbedBuilder()
                .setDescription(`> **${member.user.toString()} Kullanıcısının Kayıt Verileri;**`)
                .addFields([{name:`${client.emoji("emote_others") !== null ? client.emoji("emote_others"):"🖋️"} • **Kayıt Verisi**`,value:codeBlock("fix",`Erkek; ${erkek}, Kız; ${kadın}, Toplam; ${(erkek+kadın)}`)}]).setColor(`#2f3136`).setTitle(`Kayıt Verileri`).setURL(`https://linktr.ee/beykant`).setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))

                if (value === `anasayfa5`) {
                    await b.update({ embeds: [beş_embed] })
                }

                if (value === `gun`) {
                    await b.update({ embeds: [daily_bes] })
                }

                if (value === `hafta`) {
                    await b.update({ embeds: [weekly_bes] })
                }

                if (value === `toplam`) {
                    await b.update({ embeds: [total_bes] })
                }

                if (value === `kategori`) {
                    await b.update({ embeds: [cat_bes] })
                }

                if (value === `kamera`) {
                    await b.update({ embeds: [camera_bes] })
                }

                if (value === `yayın`) {
                    await b.update({ embeds: [stream_bes] })
                }

                if (value === `kayıt`) {
                    await b.update({ embeds: [kayıt_bes] })
                }

            })
        })

    }
}
