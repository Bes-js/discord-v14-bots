const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder, StringSelectMenuBuilder, ComponentType, codeBlock, Embed } = require("discord.js");
const beş_config = require("../../../beş_config")
const client = global.client;
const db = client.db;
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr");
const canvafy = require("canvafy");
const messageGuild = require("../../beş_schemas/messageGuildSchema");
const messageGuildChannel = require("../../beş_schemas/messageGuildChannelsSchema");
const voiceGuild = require("../../beş_schemas/voiceGuildSchema");
const voiceGuildChannel = require("../../beş_schemas/voiceGuildChannelsSchema");
const messageUser = require("../../beş_schemas/messagesSchema");
const voiceUser = require("../../beş_schemas/voicesSchema");
const point = require("../../beş_schemas/staffsSchema");
const invite = require("../../beş_schemas/invitesSchema");
module.exports = {
    name: "top",
    usage: "top [Kategori]",
    category: "stat",
    aliases: ["sıralama", "sırala", "veriler", "tops", "top10", "ilk10"],
    execute: async (client, message, args, beş_embed) => {
        let mesaj = await message.reply({ content: `> **Veriler Çekiliyor Lütfen Bekleyiniz...**` })
        client.true(message)
        const messageChannelData = await messageGuildChannel.find({ guildId: message.guild.id }).sort({ channelData: -1 });
        const voiceChannelData = await voiceGuildChannel.find({ guildId: message.guild.id }).sort({ channelData: -1 });
        const messageUsersData = await messageUser.find({ guildId: message.guild.id }).sort({ topStat: -1 });
        const voiceUsersData = await voiceUser.find({ guildId: message.guild.id }).sort({ topStat: -1 });
        const messageGuildData = await messageGuild.findOne({ guildId: message.guild.id });
        const voiceGuildData = await voiceGuild.findOne({ guildId: message.guild.id });

        const messageUsersDataDaily = await messageUser.find({ guildId: message.guild.id }).sort({ dailyStat: -1 });
        const messageUsersDataWeekly = await messageUser.find({ guildId: message.guild.id }).sort({ weeklyStat: -1 });

        const voiceUsersDataDaily = await voiceUser.find({ guildId: message.guild.id }).sort({ dailyStat: -1 });
        const voiceUsersDataWeekly = await voiceUser.find({ guildId: message.guild.id }).sort({ weeklyStat: -1 });

        const cameraData = await voiceUser.find({ guildId: message.guild.id }).sort({ cameraStat: -1 });
        const streamData = await voiceUser.find({ guildId: message.guild.id }).sort({ streamStat: -1 });

        const invites = await invite.find({ guildId: message.guild.id }).sort({ Regular: -1 });



        let messageTop = [];
        let voiceTop = [];
        let streamTop = [];
        let cameraTop = [];
        let messageDailyTop = [];
        let messageWeeklyTop = [];
        let voiceDailyTop = [];
        let voiceWeeklyTop = [];
        let inviteTop = [];
        let messageChannelTop = [];
        let voiceChannelTop = [];
        let registerTop = [];


        messageChannelData.splice(0, 10).map((x, index) => messageChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/emojis/1105808296599896235.png?size=128&quality=lossless", tag: message.guild.channels.cache.get(x.channelId) ? message.guild.channels.cache.get(x.channelId).name : "Silinmiş Kanal", score: `${Number(x.channelData).toLocaleString()}` }))

        voiceChannelData.splice(0, 10).map(async (x, index) => voiceChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/emojis/1105808299691094067.png?size=128&quality=lossless", tag: message.guild.channels.cache.get(x.channelId) ? message.guild.channels.cache.get(x.channelId).name : "Silinmiş Kanal", score: `${moment.duration(x.channelData).format("D [Gün], H [sa], m [dk], s [sn]")}` }))


        messageUsersData.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => { messageTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${Number(x.topStat).toLocaleString()}` }) })


        voiceUsersData.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => voiceTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${moment.duration(x.topStat).format("D [Gün], H [sa], m [dk], s [sn]")}` }))

        messageUsersDataDaily.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => messageDailyTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${Number(x.dailyStat).toLocaleString()}` }))

        messageUsersDataWeekly.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => messageWeeklyTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${Number(x.weeklyStat).toLocaleString()}` }))

        voiceUsersDataDaily.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => voiceDailyTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${moment.duration(x.dailyStat).format("D [Gün], H [sa], m [dk], s [sn]")}` }))

        voiceUsersDataWeekly.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => voiceWeeklyTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${moment.duration(x.weeklyStat).format("D [Gün], H [sa], m [dk], s [sn]")}` }))

        streamData.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => streamTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${moment.duration(x.streamStat).format("D [Gün], H [sa], m [dk], s [sn]")}` }))

        cameraData.filter(bes => message.guild.members.cache.get(bes.userId)).splice(0, 10).map(async (x, index) => cameraTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${moment.duration(x.cameraStat).format("D [Gün], H [sa], m [dk], s [sn]")}` }))

        invites.filter(bes => message.guild.members.cache.get(bes.userId)).slice(0, 10).map(async (x, index) => inviteTop.push({ top: index + 1, avatar: message.guild.members.cache.get(x.userId).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: message.guild.members.cache.get(x.userId).user.tag, score: `${x.Regular}` }))
/*
        let data = db.all().filter(i => i.ID.includes("toplamreg") && message.guild.members.cache.get(i.ID.split("-")[1])).sort((a, b) => b.data - a.data);
        if (data.length > 0) {
            data.length = 10
            for (let i in data) {
                console.log(data);
              let id = data[i].ID.split('-')[1];
                let user = message.guild.members.cache.get(id);
                let name = user.user.tag
                let avatar = user.user.displayAvatarURL({ extension: "png", forceStatic: true });
                let rank = data.indexOf(data[i]) + 1;
                let e = db.get(`erkek-${id}`) || 0;
                let k = db.get(`kadın-${id}`) || 0;
                let total = e + k;
                registerTop.push({ top: rank, avatar: avatar, tag: name, score: `Erkek:  ${e}   Kız:  ${k}   Toplam:  ${total}` })
            };
        }
*/
        const dayvoice = new EmbedBuilder()
            .setImage("attachment://day-voice.png").setColor(`#2f3136`).setTitle(`Günlük Ses Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const daychat = new EmbedBuilder()
            .setImage("attachment://day-chat.png").setColor(`#2f3136`).setTitle(`Günlük Ses Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const weekvoice = new EmbedBuilder()
            .setImage("attachment://week-voice.png").setColor(`#2f3136`).setTitle(`Haftalık Ses Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const weekchat = new EmbedBuilder()
            .setImage("attachment://week-chat.png").setColor(`#2f3136`).setTitle(`Haftalık Ses Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const returnvoice = new EmbedBuilder()
            .setImage("attachment://return-voice.png").setColor(`#2f3136`).setTitle(`Toplam Ses Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const returnmessage = new EmbedBuilder()
            .setImage("attachment://return-message.png").setColor(`#2f3136`).setTitle(`Toplam Mesaj Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const returndavet = new EmbedBuilder()
            .setImage("attachment://return-invite.png").setColor(`#2f3136`).setTitle(`Toplam Davet Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const returnkamera = new EmbedBuilder()
            .setImage("attachment://return-camera.png").setColor(`#2f3136`).setTitle(`Toplam Kamera Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const returnyayın = new EmbedBuilder()
            .setImage("attachment://return-stream.png").setColor(`#2f3136`).setTitle(`Toplam Yayın Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const chanmessage = new EmbedBuilder()
            .setImage("attachment://chan-message.png").setColor(`#2f3136`).setTitle(`Mesaj Kanallarının Sıralaması`).setURL(`https://linktr.ee/beykant`)

        const chanvoice = new EmbedBuilder()
            .setImage("attachment://chan-voice.png").setColor(`#2f3136`).setTitle(`Ses Kanallarının Sıralaması`).setURL(`https://linktr.ee/beykant`)

        //const returnregister = new EmbedBuilder()
          //  .setImage("attachment://return-register.png").setColor(`#2f3136`).setTitle(`Kayıt Sıralaması`).setURL(`https://linktr.ee/beykant`)


        if (messageDailyTop.length > 0) {
            var messageDailyTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Mesaj:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(messageDailyTop)
                .build();
        }

        if (voiceDailyTop.length > 0) {
            var voiceDailyTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Süre:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(voiceDailyTop)
                .build();
        }

        if (messageWeeklyTop.length > 0) {
            var messageWeeklyTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Mesaj:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(messageWeeklyTop)
                .build();
        }

        if (voiceWeeklyTop.length > 0) {
            var voiceWeeklyTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Süre:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(voiceWeeklyTop)
                .build();
        }

        if (messageTop.length > 0) {
            var messageTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Mesaj:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(messageTop.length > 0 ? messageTop : [{ top: 1, avatar: "https://cdn.discordapp.com/avatars/928259219038302258/cb1bcc0c5616d3fb1527b4ea03c9ae17.png", tag: "Silinmiş Hesap", score: `G:` }])
                .build();
        }

        if (voiceTop.length > 0) {
            var voiceTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Süre:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(voiceTop)
                .build();
        }

        if (inviteTop.length > 0) {
            var inviteTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Davet:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(inviteTop)
                .build();
        }

        if (cameraTop.length > 0) {
            var cameraTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Süre:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(cameraTop)
                .build();
        }

        if (streamTop.length > 0) {
            var streamTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Süre:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(streamTop)
                .build();
        }

        if (messageChannelTop.length > 0) {
            var messageChannelTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Mesaj:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(messageChannelTop)
                .build();
        }

        if (voiceChannelTop.length > 0) {
            var voiceChannelTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(`Süre:`)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(voiceChannelTop)
                .build();
        }

        /*
        if (registerTop.length > 0) {
            var registerTopCanvas = await new canvafy.Top()
                .setOpacity(0.7)
                .setScoreMessage(` `)
                .setabbreviateNumber(false)
                .setBackground("image", beş_config.topArkaplan)
                .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
                .setUsersData(registerTop)
                .build();
        }*/

        if (inviteTop.length > 0 && args[0] && args[0] === "davet" || args[0] === "invite" || args[0] === "inv") return mesaj.edit({ content:``,embeds: [returndavet], files: [{ attachment: inviteTopCanvas, name: "return-invite.png" }] })
        if (voiceTop.length > 0 && args[0] && args[0] === "ses" || args[0] === "voice" || args[0] === "vc" || args[0] === "s" || args[0] === "v") return mesaj.edit({content:``, embeds: [returnvoice], files: [{ attachment: voiceTopCanvas, name: "return-voice.png" }] })
        if (messageTop.length > 0 && args[0] && args[0] === "mesaj" || args[0] === "message" || args[0] === "msg" || args[0] === "m" || args[0] === "chat") return mesaj.edit({content:``, embeds: [returnmessage], files: [{ attachment: messageTopCanvas, name: "return-message.png" }] })
        if (cameraTop.length > 0 && args[0] && args[0] === "camera" || args[0] === "kamera" || args[0] === "cam" || args[0] === "webcam" || args[0] === "cmr") return mesaj.edit({content:``, embeds: [returnkamera], files: [{ attachment: cameraTopCanvas, name: "return-camera.png" }] })
        if (streamTop.length > 0 && args[0] && args[0] === "yayın" || args[0] === "stream" || args[0] === "streamer" || args[0] === "strm" || args[0] === "yayınlar") return mesaj.edit({ content:``,embeds: [returnyayın], files: [{ attachment: streamTopCanvas, name: "return-stream.png" }] })
       // if (registerTop.length > 0 && args[0] && args[0] === "kayıt" || args[0] === "reg" || args[0] === "register" || args[0] === "welcome" || args[0] === "kayıtlar") return mesaj.edit({ content:``,embeds: [returnregister], files: [{ attachment: registerTopCanvas.toBuffer(), name: "return-register.png" }] })


        const beş_dropdown = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`top`)
                    .setPlaceholder("Filtrelenmiş Veriler İçin Tıkla!")
                    .addOptions([
                        { label: `Anasayfa`, description: `Anasayfaya Dönmek İçin Tıkla!`, value: `anasayfa5`, emoji: `${client.emoji("emote_web") !== null ? client.emoji("emote_web") : "1105493458933792819"}` },
                        { label: `Günlük Ses Verileri`, description: `Günlük Verileri Görmek İçin Tıkla!`, value: `gunses`, emoji: `${client.emoji("emote_voice") !== null ? client.emoji("emote_voice") : "1105494402136285376"}` },
                        { label: `Günlük Mesaj Verileri`, description: `Günlük Verileri Görmek İçin Tıkla!`, value: `gunchat`, emoji: `${client.emoji("emote_chat") !== null ? client.emoji("emote_chat") : "1105494402136285376"}` },
                        { label: `Haftalık Ses Verileri`, description: `Haftalık Verileri Görmek İçin Tıkla!`, value: `haftases`, emoji: `${client.emoji("emote_voice") !== null ? client.emoji("emote_voice") : "1105494402136285376"}` },
                        { label: `Haftalık Mesaj Verileri`, description: `Haftalık Verileri Görmek İçin Tıkla!`, value: `haftachat`, emoji: `${client.emoji("emote_chat") !== null ? client.emoji("emote_chat") : "1105494402136285376"}` },
                        { label: `Toplam Ses Verileri`, description: `Toplam Verileri Görmek İçin Tıkla!`, value: `toplamses`, emoji: `${client.emoji("emote_voice") !== null ? client.emoji("emote_voice") : "1105494402136285376"}` },
                        { label: `Toplam Mesaj Verileri`, description: `Toplam Mesaj Verileri Görmek İçin Tıkla!`, value: `toplamchat`, emoji: `${client.emoji("emote_chat") !== null ? client.emoji("emote_chat") : "1105494402136285376"}` },
                        { label: `Davet Verileri`, description: `Davet Verilerini Görmek İçin Tıkla!`, value: `davet`, emoji: `${client.emoji("emote_invite") !== null ? client.emoji("emote_invite") : "1103848392460861501"}` },
                        { label: `Kamera Verileri`, description: `Kamera Verilerini Görmek İçin Tıkla!`, value: `kamera`, emoji: `${client.emoji("emote_camera") !== null ? client.emoji("emote_camera") : "1105493457453187162"}` },
                        //{ label: `Kayıt Verileri`, description: `Kayıt Verilerini Görmek İçin Tıkla!`, value: `kayıt`, emoji: `${client.emoji("emote_others") !== null ? client.emoji("emote_others") : "1102624779950895134"}` },
                        { label: `Yayın Verileri`, description: `Yayın Verilerini Görmek İçin Tıkla!`, value: `yayın`, emoji: `${client.emoji("emote_computer") !== null ? client.emoji("emote_computer") : "1102621545022627850"}` },
                        { label: `Ses Kanalların Verileri`, description: `Ses Kanalların Verilerini Görmek İçin Tıkla!`, value: `seskanal`, emoji: `${client.emoji("emote_voice") !== null ? client.emoji("emote_voice") : "1103848389000560760"}` },
                        { label: `Mesaj Kanalların Verileri`, description: `Mesaj Kanalların Verilerini Görmek İçin Tıkla!`, value: `mesajkanal`, emoji: `${client.emoji("emote_chat") !== null ? client.emoji("emote_chat") : "1103848389000560760"}` }]))

        mesaj.edit({ content: ``, components: [beş_dropdown], embeds: [beş_embed.setDescription(`> **${client.emoji("emote_hi") !== null ? client.emoji("emote_hi") : ""} Aşşağıdaki Menü Üzerinden Sıralama Verilerini Görebilirsiniz!**\n\n> ${client.emoji("emote_warn") !== null ? client.emoji("emote_warn") : "❓"} *Veya \`.top mesaj,ses,davet,yayın,kamera\` vb. Şekilde Belirtebilirsiniz!*`).setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))] })

        const filter = i => i.user.id === message.member.id;
        const collector = mesaj.createMessageComponentCollector({ componentType: ComponentType.StringSelect, filter: filter, time: 60000 });

        collector.on('end', async b => {
            beş_dropdown.components[0].setDisabled(true);
            mesaj.edit({ content: `> **Menü Zaman Aşımına Uğradı..**`, components: [beş_dropdown] })
        })

        collector.on('collect', async b => {
            if (!b.isStringSelectMenu()) return;
            const value = b.values[0];

            if (value == "anasayfa5") {
                b.update({ embeds: [beş_embed], files: [] })
            }

            if (value == "gunses") {
                if (voiceDailyTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [dayvoice], files: [{ attachment: voiceDailyTopCanvas, name: "day-voice.png" }] })
            }

            if (value == "gunchat") {
                if (messageDailyTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [daychat], files: [{ attachment: messageDailyTopCanvas, name: "day-chat.png" }] })
            }
            if (value == "haftases") {
                if (voiceWeeklyTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [weekvoice], files: [{ attachment: voiceWeeklyTopCanvas, name: "week-voice.png" }] })
            }

            if (value == "haftachat") {
                if (messageWeeklyTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [weekchat], files: [{ attachment: messageWeeklyTopCanvas, name: "week-chat.png" }] })
            }

            if (value == "toplamses") {
                if (voiceTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [returnvoice], files: [{ attachment: voiceTopCanvas, name: "return-voice.png" }] })
            }
            if (value == "toplamchat") {
                if (messageTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [returnmessage], files: [{ attachment: messageTopCanvas, name: "return-message.png" }] })
            }

            if (value == "davet") {
                if (inviteTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [returndavet], files: [{ attachment: inviteTopCanvas, name: "return-invite.png" }] })
            }

            if (value == "kamera") {
                if (cameraTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [returnkamera], files: [{ attachment: cameraTopCanvas, name: "return-camera.png" }] })
            }

            if (value == "yayın") {
                if (streamTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [returnyayın], files: [{ attachment: streamTopCanvas, name: "return-stream.png" }] })
            }

            if (value == "seskanal") {
                if (voiceChannelTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [chanvoice], files: [{ attachment: voiceChannelTopCanvas, name: "chan-voice.png" }] })
            }

            if (value == "mesajkanal") {
                if (messageChannelTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [chanmessage], files: [{ attachment: messageChannelTopCanvas, name: "chan-message.png" }] })
            }

            if (value == "kayıt") {
                if (registerTop.length == 0) return b.update({ embeds: [new EmbedBuilder().setDescription(`> **Hiç Veri Bulunmamakta Sıralamayı Gösteremiyorum!**`).setColor("#ff0000")], files: [] })
                b.update({ embeds: [returnregister], files: [{ attachment: registerTopCanvas, name: "return-register.png" }] })
            }
        })


    }
}


