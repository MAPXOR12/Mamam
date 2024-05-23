const { Discord, MessageEmbed } = require("discord.js");

const { WebhookClient } = require("discord.js");

const data = {
  id: config.webhook.id,
  token: config.webhook.token,
};

const webhookClient = new WebhookClient(data);

module.exports = {
  name: "blacklist",
  aliases: ["blacklist", "black"],
  enabled: true,
  category:["owner"],
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: true,
  cooldown: 5000,
  run: async (bot, message, args) => {
    const match = message.content.match(/\d{18}/);
    let member;
    try {
      member = match
        ? message.mentions.members.first() ||
          message.guild.members.fetch(args[2])
        : null;
    } catch {
      return message.channel.send({ content: `Provide me with a user` });
    }

    let guild = bot.guilds.cache.get(args[2]);
    let reason = args.slice(3).join(" ") || "Not Specified";
    
    if (args.length < 1)
      return message.channel.send({
        content: `Please provide me with a user or guild blacklist`,
      });
    if (args.length < 2)
      return message.channel.send({ content: `Provide me with a user` });

    if (!member)
      return message.channel.send({ content: `Provide me with a valid user` });

    if (args[1] === "user") {
      let user = await Black.findOne({
        userID: member.id,
      });
      if (!user) {
        const blacklist = new Black({
          userID: member.id,
          length: null,
          type: "user",
          isBlacklisted: true,
          reason: reason,
        });
        blacklist.save();
      } else {
        user.updateOne({
          type: "user",
          isBlacklisted: true,
          reason: reason,
          length: null,
        });
      }
      ////if(args[3] !== reason) return message.channel.send({content:`reason not specific`})
      message.channel.send({
        content: `User added to the blacklist! ${member.user.tag} - \`${reason}\``,
      });
      member.send({ content: `${reason} by **${message.author.username}**` });
      const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle(`Blacklist Report`)
        .addField("Status", "Added to the blacklist.")
        .addField("User", `${member.user.tag} (${member.id})`)
        .addField("Responsible", `${message.author} (${message.author.id})`)
        .addField("Reason", reason);

      return webhookClient.send({
        embeds: [embed],
      });
    }

    // guild blacklist
    if (args[1] === "guild") {
      let server = await Black.findOne({
        Guild: guild,
      });
      if (!server) {
        const blacklist = new Black({
          Guild: guild.id,
          length: null,
          type: "guild",
          isBlacklisted: true,
          reason,
        });
        blacklist.save();
      } else {
        server.updateOne({
          type: "guild",
          isBlacklisted: true,
          reason,
          length: null,
        });
      }

      message.channel.send({
        content: `Server added to the blacklist! - \`${reason}\``,
      });

      const owner = await guild.fetchOwner().then((owner) => {
        owner.send({
          content: ` Your server has been Blacklisted by **${message.author.username}** contact teams to reason `,
        });
      });
      const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle(`Blacklist Report`)
        .addField("Status", "Added to the blacklist.")
        .addField("server", `${guild.name} (${guild.id})`)
        .addField("Responsible", `${message.author} (${message.author.id})`)
        .addField("Reason", reason);

      return webhookClient.send({ embeds: [embed] });
    }
  },
};
