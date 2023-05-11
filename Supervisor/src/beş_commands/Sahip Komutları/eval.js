const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits, SelectMenuBuilder, ActivityType } = require("discord.js");
const moment = require("moment");
const ms = require("ms");
const beş_config = require("../../../beş_config")
module.exports = {
    name: "eval", 
    category:"sahip",
    usage:"eval",
    aliases: [], execute: async (client, message, args, beş_embed) => {
        if (!beş_config.botOwners.some(bes => message.author.id == bes)) return;
        if (!args[0]) return message.reply({ content: `> **Kod Nerede Canımın İçi!**` });
        let code = args.join(" ");
        if (code.includes(client.token)) return message.reply({ content: "> **Bu Token Beş Tarafından Koruma Altında ;)**" });
        try {
            var sonuç = eval_beş(await eval(code));
            if (sonuç.includes(client.token))
                return message.reply({ content: "> **Bu Token Beş Tarafından Koruma Altında ;)**" });
        } catch (err) { }
    },
}; function eval_beş(beş) { if (typeof text !== "string") beş = require("util").inspect(beş, { depth: 0 }); beş = beş.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)); return beş; }