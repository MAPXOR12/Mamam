const Discord = require("discord.js");

module.exports = {
  name: "ban",
  aliases: ["band", "ban"],
  description: "You can ban a member, or multiple members using this command",
  usage: ["ban [@User]"],
  category: "moderation",
  enabled: true,
  memberPermissions: ["BanMembers", "SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks", "BanMembers"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
  
try{
    let user =
      (await message.mentions.members.first()) ||
      (await message.guild.members.fetch(args[1]));

    let reason = args.slice(2).join(" ");
    const member = await message.guild.members.fetch(user.id).catch(() => {});
    if (member) {
      const memberPosition = member.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (
        message.member.ownerId !== message.author.id &&
        !(moderationPosition > memberPosition)
      ) {
        return message.channel.send({
          content: `You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `,
        });
      }
      if (!member.bannable) {
        return message.channel.send({
          content: `An error has occurred... Please check that I have the permission to ban this specific member and try again!`,
        });
      }

      await user
        .send(
          `**${message.author.tag}** banned you from ${
            message.guild.name
          }!\n**Reason**: ${reason || "Unspecified."}`
        )
        .catch(() => null);
      return user
        .ban({ reason: `${reason || "Unspecified"}` })
        .then((_member) =>
          message.channel.send({
            content: `Successfully banned **${_member.user.tag}**`,
          })
        )
        .catch((err) =>
          message.channel.send({ content: `Failed to ban **${user.user.tag}` })
        );
    }}catch(err){
      
      return message.channel.send({content:` I can't ban this member check my permission or something `})
    }
  }
};
