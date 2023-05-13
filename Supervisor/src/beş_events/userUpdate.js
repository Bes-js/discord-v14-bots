const client = global.client;
const db = client.db;
const { EmbedBuilder, Events } = require("discord.js");
const beş_config = require("../../beş_config");
const ms = require('ms');
module.exports = async (oldUser,newUser) => {
    let familyRoles = await db.get("five-family-roles") || [];
    let tagData = await db.get("five-tags") || [];
    let chatChannel = await db.get("five-channel-chat");
    if (!tagData.length > 0 || !familyRoles.length > 0 || !chatChannel) return;
    if (oldUser.tag == newUser.tag || oldUser.bot || newUser.bot) return;

    let log = client.kanalbul("family-log")
    let chat = client.channels.cache.get(chatChannel)

    let Guild = client.guilds.cache.get(beş_config.guildID)
    let Member = Guild.members.cache.get(oldUser.id)
    if (tagData && tagData.some(tag => oldUser.tag.includes(tag)) && !tagData.some(tag => newUser.tag.includes(tag))) {
        if(log)log.send({ embeds: [new EmbedBuilder().setDescription(`> **${newUser} İsminden \`Tagımızı\` Çıkarttı Ailemizden Ayrıldı!**\n\n> **Önceki Kullanıcı Adı: \`${oldUser.tag}\`**\n> **Sonraki Kullanıcı Adı: \`${newUser.tag}\`**`).setColor(`#ff0000`)] })
       if(Member.displayName.includes(beş_config.tagSymbol) && Member.manageable) await Member.setNickname(Member.displayName.replace(beş_config.tagSymbol,beş_config.normalSymbol)) 
        let role = Guild.roles.cache.get(familyRoles[0]);
        let roles = Member.roles.cache.clone().filter(e => e.managed || e.position < role.position);
        await Member.roles.set(roles).catch();
    }
    if (tagData && !tagData.some(tag => oldUser.tag.includes(tag)) && tagData.some(tag => newUser.tag.includes(tag))) {
        Member.roles.add(familyRoles[0])
        if(Member.displayName.includes(beş_config.normalSymbol) && Member.manageable) await Member.setNickname(Member.displayName.replace(beş_config.normalSymbol,beş_config.tagSymbol)) 
        if(log)log.send({ embeds: [new EmbedBuilder().setDescription(`> **${newUser} İsmine \`Tagımızı\` Alarak Ailemize Katıldı!**\n\n> **Önceki Kullanıcı Adı: \`${oldUser.tag}\`**\n> **Sonraki Kullanıcı Adı: \`${newUser.tag}\`**`).setColor(`#00ff00`)] })
        if(chat)chat.send(`> **🎉 Tebrikler, ${newUser} Tag Alarak Ailemize Katıldı! Hoşgeldin.**`)
    }
    

}
module.exports.conf = { name: Events.UserUpdate }
