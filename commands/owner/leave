const fs = require("fs");

const Discord = require("discord.js");
const ownerid = "768944616724103170";

module.exports = {
  name: "leave",
  enabled: true,
  memberPermissions: [ "SEND_MESSAGES" ],
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  ownerOnly: false,
  category:["owner"],
  cooldown: 0,
  run: async (bot, message, args) => {
    if (message.author.id == ownerid) {
let args = message.content.split(" ")[1];
if (!args) message.channel.send({content:`Please type server id`})
let Guild = bot.guilds.cache.get(args);
if (!Guild) return message.channel.send({content:`Invalid server id`});
Guild.leave();
message.channel.send({content:`Done Leave **${Guild.name}**`})

  }
}
}
