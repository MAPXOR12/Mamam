const Discord = require("discord.js");
const resolve = require("../../helpers/resolvers.js");
module.exports = {
  name: "warn",
  aliases: ["warn"],
  description: "warn member",
  usage: ["[prefix] warn [member]"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["BanMembers","SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: false,
  cooldown: 10000,
  run: async (bot, message, args) => {
    try {
      const member = await message.guild.members.fetch(
        message.mentions.members.first()
      );

      if (!member) {
        return message.channel.send({ content: "i can't fetch this member" });
      }
      if (member.user.bot) {
        return message.channel.send({ content: ` this member is bot` });
      }
      const memberData =
        (await Member.findOne({
          userID: member.user.id,
          guildID: message.guild.id,
        })) ||
        new Member({
          userID: member.user.id,
          guildID: message.guild.id,
        }).save();

      const data = await Guild.findOne({ guildID: message.guild.id });
      if (member.user.id === message.author.id) {
        return message.channel.send({ content: "You can't warn yourself" });
      }

      const memberPosition = member.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (
        message.member.ownerId !== message.author.id &&
        !(moderationPosition > memberPosition)
      ) {
        return message.channel.send({
          content:
            "You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!",
        });
      }

      const reason = args.slice(2).join(" ");
      if (!reason) {
        return message.channel.send({ content: ` Iam missing Reason ` });
      }

      // Gets current member sanctions

      const sanctions = memberData.sanctions.filter(
        (s) => s.type === "warn"
      ).length;
      const banCount = data.plugins.warnsSanctions.ban;
      const kickCount = data.plugins.warnsSanctions.kick;

      data.casesCount++;
      data.save();

      const caseInfo = {
        channel: message.channel.id,
        moderator: message.author.id,
        date: Date.now(),
        type: "warn",
        case: data.casesCount,
        reason,
      };

      const embed = new Discord.EmbedBuilder()
        .addField({name:
          "Member",value:
          `\`${member.user.tag}\` (${member.user.toString()})`}
        )
        .addFields({name:
          "Moderator",valu:
          `\`${message.author.tag}\` (${message.author.toString()}`}
        )
        .addFields({name:"reason",value: `${reason}`});

      if (banCount) {
        if (sanctions >= banCount) {
          member.send({
            content: `Hello ${member.user.tag}\n You have just been banned from **${message.guild.name}** by **${message.author.tag}** because of **${reason}**`,
          });
        }
        caseInfo.type = "ban";
        embed.setAuthor(`Ban | Case ${data.casesCount}`).setColor("#e02316");
        message.guild.members.ban(member).catch(() => {});
        message.channel.send({
          content: `${member.tag} was automatically banned because they reach more than **${banCount}** warns!`,
        });
      } else if (kickCount) {
        if (sanctions >= kickCount) {
          member.send({
            content: `${member.user.tag} you have been kicked from **${message.guild.name}** by **${message.author.tag}** because of **${reason}**`,
          });
        }
        caseInfo.type = "kick";
        embed
          .setAuthor(`case: kick ${data.casesCount}`)

          .setColor("#e88709");
        message.guild.members.kick(member).catch(() => {});
        message.channel.send({
          content: `**${member.user.username}** was automatically kicked because they reach more than **${kickCount}** warns!`,
        });
      } else {
        member.send({
          content: `**${member.user.tag}**\n You have been warned from **${message.guild.name}** by **${message.author.tag}** for **${reason}`,
        });
        caseInfo.type = "warn";
        embed
          .setAuthor(`case: warn case ${data.casesCoutn}`)
          .setColor("#8c14e2");
        message.channel.send({
          content: `**${member.user.tag}** warned for **${reason}** `,
        });
      }

      memberData.sanctions.push(caseInfo);
      memberData.save();
    } catch (err) {
      return message.channel.send({ content: " Something Went wrong" });
    }
  },
};
