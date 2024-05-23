const Discord = require("discord.js");
const { AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "rank",
  aliases: ["rank"],
  enabled: false,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: false,
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
    let user =
      message.mentions.users.first() ||
      bot.users.cache.get(args[1]) ||
      message.author;
    let data = await User.findOne({ userID: user.id });
    let level = data.levels || 0
    let exp = data.xp || 0
    let neededXP = Math.floor(Math.pow(level / 0.1, 2));


    const color = data.attch.color || "#FF0F00";

    // v5 rank car
    let imgr =
      data.attch.background || "https://i.imgur.com/hl7VJ0I.png";
    const card = new canvacord.Rank()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setProgressBar("#FFFFFF", "COLOR")
      .setLevel(level)
      .setBackground("IMAGE", imgr)
      .setRankColor(color, "COLOR")
      .setLevelColor(color, "COLOR")
      .setCurrentXP(exp)
      .setRequiredXP(neededXP)
      .setStatus("online", true, 5)
      .renderEmojis(true)
      .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

    const img = await card.build();

    const a = new AttachmentBuilder(img, {name:"rank.png"});

    return message.channel.send({ files: [a] });
  }
};
