const {AuditLogEvent,Discord,EmbedBuilder} = require("discord.js");
const roleUpdate = require(`${process.cwd()}/util/antirole/antiroleUpdate.js`);
module.exports = class {
  async run(newRole, oldRole) {
    const { guild } = newRole;
  
    

    try {



if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;


      


      
      let data = await Guild.findOne({ guildID: newRole.guild.id });

      if (!data && !data.plugins.logs.roleUpdate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.roleUpdate.enabled": false,
              "plugins.logs.roleUpdate.channel": null,
              "plugins.logs.roleUpdate.color": null,
            },
          }
        );
      }

      const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
 roleUpdate(oldRole,newRole)
      if (data.plugins.logs) {
        if (data.plugins.logs.roleUpdate.enabled) {
          const logChannel = newRole.guild.channels.cache.get(
            data.plugins.logs.roleUpdate.channel
          );
          if (!logChannel) return;

          const allLogs = await newRole.guild.fetchAuditLogs({
            type: AuditLogEvent.RoleUpdate,
          });
          const fetchModerator = await allLogs.entries.first();
          if (oldRole.color !== newRole.color) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({
                name: newRole.guild.name,
                iconURL: newRole.guild.iconURL({ dynamic: true }),
              })
              .setDescription(` **\`${newRole.name}\` has been updated.**`)
              .setColor(data.plugins.logs.roleUpdate.color)
              .setFooter({
                text: fetchModerator.executor.tag,
                iconURL: fetchModerator.executor.displayAvatarURL({
                  dynamic: true,
                }),
              })
              .setTimestamp()
              .addFields(
                {
                  name: "Old Color:",
                  value: `${oldRole.hexColor}`,
                },
                {
                  name: "New Color:",
                  value: `${newRole.hexColor}`,
                },
                {
                  name: "Responsible Moderator:",
                  value: `<@${fetchModerator.executor.id}>`,
                }
              );
            return logChannel.send({ embeds: [embed] });
          }
          if (oldRole.name !== newRole.name) {
            const embed = new Discord.EmbedBuilder()
              .setAuthor({
                name: newRole.guild.name,
                iconURL: newRole.guild.iconURL({ dynamic: true }),
              })
              .setDescription(` **\`${newRole.name}\` has been updated.**`)
              .setColor(data.plugins.logs.roleUpdate.color)
              .setFooter({
                text: fetchModerator.executor.tag,
                iconURL: fetchModerator.executor.displayAvatarURL({
                  dynamic: true,
                }),
              })
              .setTimestamp()
              .addFields(
                {
                  name: "Old name:",
                  value: `${oldRole.name}`,
                },
                {
                  name: "New name:",
                  value: `${newRole.name}`,
                },
                {
                  name: "Responsible Moderator:",
                  value: `<@${fetchModerator.executor.id}>`,
                }
              );
            return logChannel.send({ embeds: [embed] });
          }
        }
      }
    } catch (err) {
      return console.log(err)
    }
  }
};
