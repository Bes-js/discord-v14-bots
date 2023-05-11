const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true,intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],ws: {version: "10"}});
const beş_config = require("./beş_config.json")
const { readdir } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
const {JsonDatabase} = require("wio.db");
const db = client.db = new JsonDatabase({databasePath:"./bes_database.json"});
readdir("./src/beş_commands/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/beş_commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let beş_prop = require(`./src/beş_commands/${f}/` + file);
console.log(`🧮 [BEŞ - COMMANDS] ${beş_prop.name} Yüklendi!`);
commands.set(beş_prop.name, beş_prop);
beş_prop.aliases.forEach(alias => {aliases.set(alias, beş_prop.name);});});});});});
readdir("./src/beş_events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let beş_prop = require(`./src/beş_events/${file}`);
if (!beş_prop.conf) return;
client.on(beş_prop.conf.name, beş_prop);
console.log(`📚 [BEŞ _ EVENTS] ${beş_prop.conf.name} Yüklendi!`);});});
const commands2 = client.commands2 = (global.commands2 = []);
readdir("./komutlar_user/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./komutlar_user/${file}`);
      client.commands2.push({name: props.name,type: props.type})
      console.log(`👌 [MENU] Menü Komut Yüklendi: ${props.name}`);
  });
});
client.on("ready", async () => {
    const rest = new REST({ version: "9" }).setToken(beş_config.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {body: client.commands2,});
  } catch (error) {
    console.error(error);
  }
});
client.on('interactionCreate', (button) => {
  if (button.isUserContextMenuCommand()){
      try {
        readdir("./komutlar_user/", (err, files) => {
          if (err) throw err;
          files.forEach(async (f) => {
            const command = require(`./komutlar_user/${f}`);
            if (
              button.commandName.toLowerCase() === command.name.toLowerCase()
            ) {
              return command.run(button);
            }
          });
        });
      } catch (err) {
        console.error(err);
      }}});
Collection.prototype.array = function() {return [...this.values()]}
client.login(beş_config.token).then(() => console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)).catch((beş_err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${beş_err}`));

