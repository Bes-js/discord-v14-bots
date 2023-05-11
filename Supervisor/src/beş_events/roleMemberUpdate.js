const client = global.client;
const db = client.db;
const { EmbedBuilder, Events, AuditLogEvent,codeBlock } = require("discord.js");
const beş_config = require("../../beş_config");
const ms = require('ms');
module.exports = async (oldMember,newMember) => {
if(newMember.guild.id == beş_config.guildID){
newMember.guild.fetchAuditLogs({type:AuditLogEvent.MemberRoleUpdate}).then(async (audit) => {
            let ent = audit.entries.first()
            let user = ent.target;
            let maker = ent.executor;
            if (maker.bot || user.bot || !ent) return
            newMember.roles.cache.forEach(async role => {
                if (!oldMember.roles.cache.has(role.id)) {
                    db.push(`rollog-${user.id}`,`\`[+]\` ${maker} (\`${maker.id}\`)\n*Tarih;* **<t:${Math.floor(Date.now()/1000)}> (<t:${Math.floor(Date.now()/1000)}:R>)**\n*Rol;* ${role} (\`${role.id}\`)`)
                    if (client.kanalbul("rol-log")) client.kanalbul("rol-log").send({
                        embeds: [new EmbedBuilder().setDescription(`> **${user} Kullanıcısına ${role} Rolü Verildi!**`).addFields(
                            { name: `Veren Kişi`, value: `${codeBlock("diff", maker.tag + " / " + maker.id)}`, inline: false },
                            { name: `Verilen Kişi`, value: `${codeBlock("diff", user.tag + " / " + user.id)}`, inline: false },
                            { name: `Verilen Rol`, value: `${role} (\`${role.id}\`)`, inline: false }
                        ).setColor("#00ff00")]})
                       }})
                   
            oldMember.roles.cache.forEach(async role => {
                if (!newMember.roles.cache.has(role.id)) {
                    db.push(`rollog-${user.id}`,`\`[-]\` ${maker} (\`${maker.id}\`)\n*Tarih;* **<t:${Math.floor(Date.now()/1000)}> (<t:${Math.floor(Date.now()/1000)}:R>)**\n*Rol;* ${role} (\`${role.id}\`)`)
                    if (client.kanalbul("rol-log")) client.kanalbul("rol-log").send({
                        embeds: [new EmbedBuilder().setDescription(`> **${user} Kullanıcısından ${role} Rolü Alındı!**`).addFields(
                            { name: `Alan Kişi`, value: `${codeBlock("diff", maker.tag + " / " + maker.id)}`, inline: false },
                            { name: `Alınan Kişi`, value: `${codeBlock("diff", user.tag + " / " + user.id)}`, inline: false },
                            { name: `Alınan Rol`, value: `${role} (\`${role.id}\`)`, inline: false }
                        ).setColor("#ff0000")]})
           }})

 })   
} 

}
module.exports.conf = { name: Events.GuildMemberUpdate }