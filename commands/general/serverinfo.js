const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const moment = require("moment");

const filterLevels = {
  DISABLED: "Off",

  MEMBERS_WITHOUT_ROLES: "No Role",

  ALL_MEMBERS: "Everyone",
};

const verificationLevels = {
  NONE: "None",

  LOW: "Low",

  MEDIUM: "Medium",

  HIGH: "(╯°□°）╯︵ ┻━┻",

  VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};

const regions = {
  brazil: "Brazil",

  europe: "Europe",

  hongkong: "Hong Kong",

  india: "India",

  japan: "Japan",

  russia: "Russia",

  singapore: "Singapore",

  southafrica: "South Africa",

  sydeny: "Sydeny",

  "us-central": "US Central",

  "us-east": "US East",

  "us-west": "US West",

  "us-south": "US South",
};

module.exports = {
  name: "serverinfo",
  aliases: ["server"],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev) => {
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString());

    const members = message.guild.members.cache;

    let guild = await Guild.findOne({ guildID: message.guild.id });

    const channel = message.guild.channels.cache.size;

    const channels = message.guild.channels.cache;

    const emojis = message.guild.emojis.cache;

    const embed = new Discord.EmbedBuilder()
      .setTitle("Guild information")
      .setColor(config.embed.Color)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))

      .addFields({ name: "Name", value: `${message.guild.name}` })
      .addFields({ name: "ID", value: `${message.guild.id}` })
      .addFields({ name: "Owner", value: `<@${message.guild.ownerId}>` })
      .addFields({ name: "Region", value: `${regions[message.guild.region]}` })
      .addFields({
        name: "Explicit Filter",
        value: `${filterLevels[message.guild.explicitContentFilter]}`,
      })
      .addFields({
        name: "Verification Level",
        value: `${verificationLevels[message.guild.verificationLevel]}`,
      })
      .addFields({
        name: "Time Created",
        value: `${moment(message.guild.createdTimestamp).format("LT")} ${moment(
          message.guild.createdTimestamp
        ).format("LL")} ${moment(message.guild.createdTimestamp).fromNow()}`,
      })
      .addFields({ name: "Role Count", value: `${roles.length}` })
      .addFields({
        name: "Boost Count",
        value: `${message.guild.premiumSubscriptionCount || "0"}`,
      })
      .addFields({
        name: "Member Count",
        value: `${message.guild.memberCount}`,
      })
      .addFields({
        name: "Bots",
        value: `${members.filter((member) => member.user.bot).size}`,
      })
      .addFields({ name: `Channels`, value: `(${channel})` })
      .addFields({ name: "Emoji Count", value: `${emojis.size}` });

    message.channel.send({ embeds: [embed] });
  },
};
