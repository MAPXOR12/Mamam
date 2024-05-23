const Discord = require("discord.js");

const SlayBotDB = require("../../data/news.js");


module.exports = {
  name: "setnews",
  aliases: ["setnews"],
  enabled: true,
  category:["owner"],
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: true,
  cooldown: 5000,
  run: async (bot, message, args) => {
    /*const [name, ...args] = message.content.slice(prefix.length)
      .split(/ +/)
      .filter(Boolean);*/

    let news = args.slice(1).join(" ");
    if (!SlayBotDB.news)
      return await SlayBotDB.create({
          news: news,
          tag: "768944616724103170",
          time: new Date(),
        })
      /*  (await SlayBotDB.updateOne({
          news: news,
          tag: "768944616724103170",
          time: new Date(),
        })) +
        message.channel.send({content:" Updated News!"})
      );*/
    if(SlayBotDB.news){
    await SlayBotDB.updateOne({
      news: news,
      tag: "768944616724103170",
      time: new Date(),
    });
    message.channel.send({ content: " Updated News!" });
  }}
};
