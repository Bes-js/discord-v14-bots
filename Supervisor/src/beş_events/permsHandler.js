const client = global.client;
const { EmbedBuilder, Events, PermissionFlagsBits } = require("discord.js");
const beş_config = require("../../beş_config");
const db = client.db;
module.exports = async (message) => {
    const permsData = db.get(`ozelkomutlar`) || [];  //approval,luhux <3
    if(permsData.length == 0 || !permsData)return;
    if (beş_config.prefix && !message.content.startsWith(beş_config.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    let talentPerm = permsData.find((approvalluhux) => approvalluhux.permName == args[0]);
    if (talentPerm) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
       if (!message.member.roles.cache.has(talentPerm.staffRoleID) && !message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply({ embeds: [new EmbedBuilder().setColor("#2b2d31").setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        if (!member) message.reply({ embeds: [new EmbedBuilder().setColor("#2b2d31").setDescription(`> **Geçerli Bir User Belirtmelisin!**`)] }).sil(5);
        if (member.roles.cache.has(talentPerm.permID)) {
          member.roles.remove(talentPerm.permID)
          client.true(message)
          message.reply({ embeds: [new EmbedBuilder().setColor("#2b2d31").setDescription(`> **${member} Kullanıcısından <@&${talentPerm.permID}> Rolü Alındı!**`)] });
        } else {
          member.roles.add(talentPerm.permID)
          client.true(message)
          message.reply({ embeds: [new EmbedBuilder().setColor("#2b2d31").setDescription(`> **${member} Kullanıcısına <@&${talentPerm.permID}> Rolü Verildi!**`)] });
        }
      }

}
module.exports.conf = { name: Events.MessageCreate }