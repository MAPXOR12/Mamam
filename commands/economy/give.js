const fs = require("fs");
const Discord = require("discord.js");

const m = "<:Bobocash:897148836567457862>";

module.exports = {
  name: "give",
  aliases: ["give", "send"],
  description: "To send credit",
  usage: ["credits @amount @user"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 10000,
  run: async (bot, message, args, dev, dev2) => {
    if (!args[2]) return;
    let member = message.mentions.users.first() || bot.users.fetch(args[2]);
    if (!member)
      return message.channel.send({ content: `❎ Please mention someone!` });

    var money = args[1];

    if (!Number(money))
      return message.reply({
        content: `❎ You must be a number your credit to give `,
      });
    if (!args[1]) {
      return;
    }
    let author = await User.findOne({ userID: message.author.id });
    let loc = await User.findOne({ userID: member.id }) || new User({userID: member.id})

    if (!money)
      return message.channel.send({ content: `❎ Please type credit!` });
    if (money < 1)
      return message.channel.send({ content: `❎ You can't send 0 credit!` });
    
    let sender = author.money - args[1];

    if (author.money < Number(args[1]))
      return message.channel.send({
        content: `❎ You don't have this amount credit!`,
      });
    if (author.userID == member.id)
      return message.channel.send({
        content: `❎ You can't send credit to yourself!`,
      });
    if (member.bot)
      return message.channel.send({
        content: `❎ You can send credit to the client`,
      });
    await User.updateOne(
      {
        userID: message.author.id
      },
      {
        $set: {
          money: sender,
        },
      }
    );
    await User.updateOne(
      {
        userID:member.id
      },
      {
        $inc: {
          money: money,
        },
      }
    );

  

    member.send({
      content: `🏧 | Transfer Receipt \`You have received __\`$${args[1]}\`__ From user ${message.author.username} (ID: ${message.author.id})\``,
    });
    message.channel.send({
      content: `**${message.author.username}** send credit to **${
        member.username
      }** amount: __\`$${args[1].toLocaleString()}\`__ ${m}`,
    });
  },
};
