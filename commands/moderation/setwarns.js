const Discord = require("discord.js");

module.exports = {
  name: "setwarns",
  aliases: ["setwanrs"],
  description: "set type of sunction",

  category: ["moderation"],
  enabled: true,
  memberPermissions: ["ManageGuild", "SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    
    try{
    
    const data = await Guild.findOne({ guildID: message.guild.id });
    if (!data.plugins.warnsSanctions) {
      await Guild.updateOne(
        { guildID: message.guild.id },
        {
          $set: {
            "plugins.warnsSanctions.kick": false,
            "plugins.warnsSanctions.ban": false,
          },
        }
      );
      return;
    }
    const sanction = args[1];
    if (!sanction || (sanction !== "kick" && sanction !== "ban")) {
      return message.channel.send({
        content: `You are missing type of warn must be [ban,kick]`,
      });
    }

    const number = args[2];

    if (number === "reset") {
      if (sanction === "kick") {
        data.plugins.warnsSanctions.kick = false;
        data.markModified("plugins.warnsSanctions");
        data.save();
        return message.channel.send({
          content: `**Members can no longer be automatically kicked!**`,
        });
      }
      if (sanction === "ban") {
        data.plugins.warnsSanctions.ban = false;
        data.markModified("plugins.warnsSanctions");
        data.save();
        return message.channel.send({
          content: `**Members can no longer be automatically banned!**`,
        });
      }
    }

    if (!number || isNaN(number)) {
      return message.channel.send({ content: `INVALID NUMBER` });
    }
    if (number < 1 || number > 10) {
      return message.channel.send({
        content: `Number range must between 1 to 10 `,
      });
    }

    if (sanction === "kick") {
      data.plugins.warnsSanctions.kick = number;
      data.markModified("plugins.warnsSanctions");
      data.save();
      return message.channel.send({
        content: `${number} warnings will result in an expulsion!`,
      });
    }

    if (sanction === "ban") {
      data.guild.plugins.warnsSanctions.ban = number;
      data.guild.markModified("plugins.warnsSanctions");
      data.guild.save();
      return message.channel.send({
        content: `${number} warnings will result in a ban`,
      });
    }}catch(err){
      return message.channel.send({ content:` Something wrong please check it `})}
  },
};
