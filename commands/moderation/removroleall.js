const { ButtonStyle,Discord} = require("discord.js");

module.exports = {
  name: "removeroleall",
  aliases: ["removeroleall", "removeall"],
  usage: ["removeroleall <roles>"],
  description: "remove a role to all user of the current server",
  category: "moderation",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["MANAGE_ROLES", "SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
  run: async (client, message, args) => {
    
    try{
    
    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));
    if (!role) {
      return message.channel.send({ content: `please provide a valid role` });
    }
    if (message.guild.members.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send({
        content: `My role is not high enough than **${role.name}** role!`,
      });
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send({
        content: ` Your role must be higher than **${role.name}** role!`,
      });
    }

    if (!role) {
      return message.channel.send({ content: "Please provide a valid role" });
    }
    let type = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setLabel("Bots")
        .setCustomId("bot"),
      new Discord.MessageButton()
        .setStyle(ButtonStyle.Primary)
        .setLabel("Members")
        .setCustomId("member")
    );
    let embed = new Discord.EmbedBuilder().setDescription(
      "Choose, the Roles are remove to all types?"
    );
    let msg = await message.channel.send({
      embeds: [embed],
      components: [type],
    });
    let filter = (i) => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
      filter: filter,
      time: 30000,
      error: "time",
    });
    collector.on("collect", async (i) => {
      if (i.customId === "member") {
        (await message.guild.members.fetch())
          .filter((r) => !r.user.bot)
          .forEach((a) => a.roles.remove(role));
        msg.delete();
        return message.channel.send({
          content: `Successfullyremoved **${role.name}** to Members`,
        });
      }
      if (i.customId === "bot") {
        (await message.guild.members.fetch())
          .filter((r) => r.user.bot)
          .forEach((a) => a.roles.remove(role));
        msg.delete();
        return message.channel.send({
          content: ` Successfully removed **${role.name}** to Bots`,
        });
      }
    }); }catch(err){
      
      
      return message.channel.send({content:`I cant remove to all`})
    }
  },
};
