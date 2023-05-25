const { MessageEmbed, Client, ContextMenuInteraction,MessageActionRow,MessageButton,Formatters } = require("discord.js");
const client = global.client;
module.exports = {
    name:"Ekle",
    type: 2,

    /**
 * @param {Client} client
 * @param {ContextMenuInteraction} interaction
 */

    run: async (interaction) => {

        const Guild = interaction.guild;
        let member = Guild.members.cache.get(interaction.targetId)
        if(!member)return interaction.reply({content:`> **Sunucuda Böyle Bir Kullanıcı Bulunmamakta!**`,ephemeral:true})
        let data = await client.db.get(`özeloda_${interaction.member.id}`)
        if(!data)return interaction.reply({content:`> **Özel Odan Bulunmamakta Bulunmamakta!**`,ephemeral:true})
        let channel = Guild.channels.cache.get(data);
        channel.permissionOverwrites.edit(member,{
            Connect:true,
            ViewChannel:true,
            Stream:true,
            Speak:true
        });
        client.db.push(`members_${data}`,member.id)
        interaction.reply({content:`> **${member} Kullanıcısı Kanala Başarıyla Eklendi!**`,ephemeral:true});

      
}
};
