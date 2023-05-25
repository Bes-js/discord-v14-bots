const client = global.client;
const { EmbedBuilder, Events,codeBlock } = require("discord.js");
const beş_config = require("../../beş_config");
const ms = require('ms');
const db = client.db;
module.exports = async (message) => {
    let chatChannel = await db.get("five-channel-chat");
    let unregisterRoles = await db.get("five-unregister-roles") || [];
    let jailRoles = await db.get("five-jail-roles") || [];
    if (beş_config.prefix && !message.content.startsWith(beş_config.prefix))return;
    if(unregisterRoles.length > 0 && jailRoles.length > 0 && unregisterRoles.some(bes => message.member.roles.cache.has(bes)) && jailRoles.some(bes => message.member.roles.cache.has(bes)))return client.false(message);
    const args = message.content.slice(1).trim().split(/ +/g);
    const commands = args.shift().toLowerCase();
    const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
    if(chatChannel && message.channel.id == chatChannel && !["snipe","tag","afk"].some(bes => cmd.name == bes)) return client.false(message);
    const beş_embed = new EmbedBuilder()
    .setColor(`#2b2d31`)
    .setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }) })
    .setFooter({ text: beş_config.footer ? beş_config.footer : `Beş Was Here`, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }) })

    if (cmd) {
        cmd.execute(client, message, args, beş_embed);
        if(client.kanalbul("command-log")){
            client.kanalbul("command-log").send({
                embeds: [new EmbedBuilder().setColor(`#2b2d31`).setDescription(`> **${message.member} Kullanıcısı <t:${Math.floor(Date.now()/1000)}:R> Önce ${message.channel} Kanalında \`${cmd.name}\` Komudunu Kullandı!**`).addFields(
                    { name: `Kullanılan Komut`, value: `${codeBlock("fix",beş_config.prefix+cmd.name)}`, inline: false },
                    { name: `Kullanan Kişi`, value: `${codeBlock("fix", message.author.tag + " / " + message.author.id)}`, inline: false },
                    { name: `Tarih / Zaman`, value: `**<t:${Math.floor(Date.now()/1000)}> (<t:${Math.floor(Date.now()/1000)}:R>)**`, inline: false }
                )]
            })
        }
    }
}
module.exports.conf = { name: Events.MessageCreate }
