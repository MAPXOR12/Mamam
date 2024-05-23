const profile = require(`${process.cwd()}/data/user`);
const market = require(`${process.cwd()}/shop/market.json`);
const text = require(`${process.cwd()}/util/string`);
const Discord = require("discord.js");

module.exports = {
  name: "use",
  aliases: ["use"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 5000,
  run: async (bot, message, args, dev, id) => {
    let doc = await profile.findOne({ userID: message.author.id });
    if (!doc) {
      doc = new profile({ userID: message.author.id });
    }

    const item = doc.inventory.find(x => x.id == args[1]);

    if (!item) {
      return message.channel.send({
        content: `❎ **${message.author.tag}**, you do not have this item in your inventory!`
      });
    }

    const metadata = market.find(x => x.id === item.id);

    if (!metadata) {
      return message.channel.send({
        content: `❎ **${message.author.tag}**, this item can no longer be used!`
      });
    }

    doc.attch[metadata.type] = metadata.assets.link;

    return doc
      .save()
      .then(() =>
        message.channel.send({
          content: `✅ **${message.author.tag}**, successfully used **${metadata.name}!**`
        })
      )
      .catch(() =>
        message.channel.send({
          content: `\`❎ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`
        })
      );
  }
};
