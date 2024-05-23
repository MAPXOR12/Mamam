const Discord = require("discord.js");
const resolve = require("../../helpers/resolvers");
const ms = require("ms");
module.exports = {
  name: "tempmute",
  aliases: ["tempmute", "mute"],
  description: "mute user",
  usage: ["mute <user>"],
  category: ["moderation"],
  enabled: true,
  memberPermissions: ["SendMessages", "MuteMembers"],
  botPermissions: ["SendMessages", "EmbedLinks", "MuteMembers"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
    
    try{
    
    const user =
      (await message.mentions.users.first()) ||
      message.guild.members.cache.get(args[1]);
    const member = await message.guild.members.fetch(user.id);
    if (!member) {
      return message.channel.send({ content: ` user not found` });
    }

    if (member.id === message.author.id) {
      return message.channel.send({ content: `you cant mue yourself` });
    }

    const memberPosition = member.roles.highest.position;
    const moderationPosition = message.member.roles.highest.position;
    if (
      message.member.ownerId !== message.author.id &&
      !(moderationPosition > memberPosition)
    ) {
      return message.channel.send({ content: `You cant mute ` });
    }
    const memberData = await Mute.findOneAndUpdate({
      id: member.id,
      guildID: message.guild.id,
    });
    //if(!memberData) new Member({id:member.id, guildID: message.guild.id});

    const time = args[2] || "10m";
    if (!time || isNaN(ms(time))) {
      return message.channel.send({
        content: `time must include (10s,10m,10h,1mon`,
      });
    }

    let reason = args.slice(3).join(" ");

    let mute = message.guild.roles.cache.find((role) => role.name === "Muted");
    if (!mute)
      mute = await message.guild.roles.create({
        name: "Muted",
        color: "#0000",
        permissions: [],
      });

    message.guild.channels.cache.forEach(async (channel) => {
      await channel.permissionOverwrites.create(mute, {
        SendMessages: false,
        AddReactions: false,
       Connect: false,
      });
    }); /**/
    setTimeout(() => {
      message.guild.members.cache.get(member.id).roles.add(mute);
    }, 2000);
    member
      .send(
        `Sir **${member.username}**
			You are muted in **${message.guild.name}** with voice and text
			by **${message.author.tag}**
			for **${time}**
			with reason **${reason || "no specify"}
		`
      )
      .catch(() => {});

    message.channel
      .send({
        content: `muted **${member.tag}** in **${message.guild.name}** by **${
          message.author.tag
        }** for **${time}** ${reason || "no specify"}
		`,
      })
      .catch(() => {});
    if (time) {
      data.guild.casesCount++;

      const caseInfo = {
        channel: message.channel.id,
        moderator: message.author.id,
        date: Date.now(),
        type: "mute",
        case: data.guild.casesCount,
        reason,
        time,
      };

      memberData.mute.muted = true;
      memberData.mute.endDate = Date.now() + ms(time);
      memberData.mute.case = data.guild.casesCount;
      memberData.sanctions.push(caseInfo);

      memberData.markModified("sanctions");
      memberData.markModified("mute");
      await memberData.save();

      await data.guild.save();

      bot.databaseCache.mutedUsers.set(
        `${member.id}${message.guild.id}`,
        memberData
      );
    }
  } catch (err){
    return message.channel.send({content:` I can't mute this user`});
    
    
  }
  },
};
