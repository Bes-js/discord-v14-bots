const { Events,Collection } = require("discord.js");
const beş_config = require("../../beş_config");
const client = global.client;
module.exports = async () => {
var guild = client.guilds.cache.get(beş_config.guildID)
if(!guild)return;
const invites = new Collection();
guild.invites.fetch().then((bes) => {
bes.map((x) => {invites.set(x.code, {uses: x.uses, inviter: x.inviter, code: x.code });
});
client.invites.set(guild.id, invites);
});
}
module.exports.conf = {name: Events.ClientReady}