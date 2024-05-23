
const Discord = require("discord.js");


module.exports = {
  name: "uptime",
  aliases: ["uptime"],
  description: "how many <second> and <minutes> and<hours> and <days> bot online",
  usage: ["uptime"],
  category: ["bot"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {


let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;
    const up = new Discord.EmbedBuilder()
      .setColor(config.embed.Color)
      .setThumbnail(bot.user.avatarURL())
      .setTitle("**__Uptime :__**")
    
      .setAuthor(bot.user.username)
      .addField("**-**", `**${seconds}**` + " **seconds**")
      .addField("**-**", `**${minutes}**` + " **minutes**")
      .addField("**-**", `**${hours}**` + " **hours**")
      .addField("**-**", `**${days}**` + " **days**");
  message.channel.send({embeds:[up]});
  }
}