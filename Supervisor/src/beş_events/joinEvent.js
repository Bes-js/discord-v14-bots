const beş_config = require("../../beş_config");
const { Events } = require('discord.js');
const client = global.client;
const db = client.db;
const canvafy = require("canvafy");
module.exports = async (member) => {
if(member.guild.id !== beş_config.guildID || member.user.bot)return;
let staffData = await db.get("five-register-staff") || [];
let unregisterRoles = await db.get("five-unregister-roles") || [];
let fiveImage = await db.get("five-welcome-image");
let fiveMentions = await db.get("five-welcome-mentions");
let tagData = await db.get("five-tags") || [];
let welcomeChannel = await db.get("five-channel-welcome");
let jailRoles = await db.get("five-jail-roles") || [];
let forcedata = await db.get(`forcebans`) || [];
let aktifPunish =  await db.get(`aktifceza-${member.id}`)
if(!staffData.length > 0)return console.error("Kayıt Yetkilisi Ayarlı Değil!");
if(!unregisterRoles.length > 0)return console.error("Kayıtsız Rolleri Ayarlı Değil!");
if(!jailRoles.length > 0)return console.error("Jail Rolleri Ayarlı Değil!");
if(!welcomeChannel)return console.error("Welcome / Hoşgeldin Kanalı Ayarlı Değil!");

if(!member.guild.channels.cache.get(welcomeChannel)){
console.log(`[ 🚨 ] Welcome / Hoşgeldin Kanalı Bulunamadı,Kanalın Varlığını Kontrol Edin; ${member.user.tag} Kullanıcısı Sunucuya Katıldı`)
return;
}
var kurulus = (Date.now() - member.user.createdTimestamp);

let beşWelcomeMessage = `**${client.emoji("emote_hi") !== null ? client.emoji("emote_hi"):"🎉"} Merhabalar ${member}, Seninle Beraber Sunucumuz ${client.sayıEmoji(member.guild.memberCount)} Üye Sayısına Ulaştı!**\n\n **Hesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Önce Oluşturulmuş,Sunucumuza <t:${Math.floor(Date.now() / 1000)}:R> Giriş Yaptın!**\n\n **Kayıt Olduktan Sonra Kurallar Kanalını Okuduğunuzu Kabul Edeceğiz Ve İçeride Yapılacak Cezalandırma İşlemlerini Bunu Göz Önünde Bulundurarak Yapacağız.**\n\n **${tagData.length > 0 ? `Tagımız: \`\`${tagData ? tagData.map((five) => `${five}`).join(",") : "Beş_Error"}\`\`'ı Alarak Bize Destek Olabilirsin, ` : ""}İyi Sohbetler Dileriz.**${fiveMentions ? `\n${staffData.length > 0 ? `||${staffData.map((five) => `<@&${five}>`).join(",")}||`:""}`:""}`;

if(forcedata.includes(member.id)){
    member.guild.members.ban(member.id,{reason:`FORCEBAN Cezası Almış, Geri Banlandı!`});
   return member.guild.channels.cache.get(welcomeChannel).send({content:`> **${client.emoji("emote_warn") !== null ? client.emoji("emote_warn") : "⚠️"} ${member} Kullanıcısının Forceban Cezası Olmasına Rağmen Sunucuya Girdi, Üye Tekrardan Sunucudan Banlandı!**`})
}else if(aktifPunish && aktifPunish == "JAIL"){
    if(jailRoles.length > 0)member.roles.set([...jailRoles]);
    member.setNickname("[JAILED]");
    return member.guild.channels.cache.get(welcomeChannel).send({content:`> **${client.emoji("emote_warn") !== null ? client.emoji("emote_warn") : "⚠️"} ${member} Kullanıcısının Jail Cezası Olmasına Rağmen Sunucuya Girdi, Üye Tekrardan Jail'e Atıldı!**`})
}else if(aktifPunish && aktifPunish == "CMUTE" || aktifPunish == "VMUTE"){
    member.timeout(1200000,'Aktif Mute Cezasından Kaçma!')
    return member.guild.channels.cache.get(welcomeChannel).send({content:`> **${client.emoji("emote_warn") !== null ? client.emoji("emote_warn") : "⚠️"} ${member} Kullanıcısının Mute Cezası Olmasına Rağmen Sunucuya Girdi, Üyeye Bir Süreliğine Timeout Uygulandı!**`})
}

if (kurulus > 604800000) {
if(!member.user.bot && unregisterRoles.length > 0)member.roles.set([...unregisterRoles])

member.setNickname(beş_config.kayitsizHesapIsim);
if(fiveImage){
const welcome = await new canvafy.WelcomeLeave()
.setAvatar(member.user.avatarURL({forceStatic:true,extension:"png"}))
.setBackground("image", beş_config.welcomeResimURL)
.setTitle(`${member.user.username}`)
.setDescription("Sunucumuza Hoşgeldin!")
.setBorder(beş_config.welcomeResimRenk)
.setAvatarBorder(beş_config.welcomeResimRenk)
.setOverlayOpacity(0.65)
.build();
member.guild.channels.cache.get(welcomeChannel).send({files:[{attachment: welcome,name: `bes_welcome_${member.id}.png`}],content:beşWelcomeMessage});
}else{
member.guild.channels.cache.get(welcomeChannel).send({content:beşWelcomeMessage});
}
} else {
if(jailRoles.length > 0)member.roles.set([...jailRoles]);
member.setNickname(beş_config.supheliHesapIsim);
member.guild.channels.cache.get(welcomeChannel).send({ content: `**⚠ ${member}, Kullanıcısı Sunucuya Katıldı Hesabı <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Önce Açıldığı İçin Şüpheli Rolü Verildi.**\n**Sunucumuza <t:${Math.floor(Date.now() / 1000)}:R> Zamanında Giriş Yaptı!**`})}
}
module.exports.conf = { name: Events.GuildMemberAdd }
