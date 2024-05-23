const { ChannelType, AuditLogEvent, Discord } = require("discord.js");
module.exports = class {
  async run(ban) {
    
    try {
      if (
      !ban.guild.members.me.permissions.has(["ManageGuild", "ManageChannels","ViewAuditLog"])
    )
      return;
    const allLogs = await ban.guild.fetchAuditLogs({
      type: AuditLogEvent.GuildBanRemove,
    });
    const data =
      (await Guild.findOne({ guildID: ban.guild.id })) ||
      (await Guild.create({ guildID: ban.guild.id }));
      const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

      if (maintenance && maintenance.toggle == "true") return;

      if (!data.plugins.logs.banRemove) {
        await Guild.updateOne(
          { guildID: ban.guild.id },
          {
            $set: {
              "plugins.logs.banRemove.enabled": false,
              "plugins.logs.banRemove.channel": null,
              "plugins.logs.banRemove.color": null,
            },
          }
        );
      }
      if (data.plugins.logs) {
        if (data.plugins.logs.banRemove.enabled) {
          let channel = await ban.guild.channels.cache.get(
            data.plugins.logs.banRemove.channel
          );
          if (!channel) return;
          const fetchModerator = await allLogs.entries.first();
          const embed = new Discord.EmbedBuilder()
            .setAuthor({
              name: ban.guild.name,
              iconURL: ban.guild.iconURL({ dynamic: true }),
            })
            .setDescription(`**🔨 <@${ban.user.id}> unbanned**`)
            .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(data.plugins.logs.banRemove.color)
            .setFooter({
              text: ban.guild.name,
              iconURL: ban.guild.iconURL({ dynamic: true }),
            })
            .addFields(
              {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`,
                inline: true,
              },
              {
                name: "Unban Reason:",
                value: fetchModerator.reason || "No reason",
                inline: true,
              }
            );
          await channel.send({embeds:[embed]})
        }
      
      }
      
    } catch (err) {
      return console.log(err)
    }
  }
};
