
const {AuditLogEvent,discord} = require("discord.js");
const moment = require("moment");
const cooldown = new Set();
const roleCreate = require(`${process.cwd()}/util/antirole/antiroleCreate.js`)
module.exports = class {
  async run(role, message) {
    


    
    try {

const { guild } = role;
    
if (!guild.members.me.permissions.has(["ManageGuild", "ManageChannels","ViewAuditLog"])) return;


      const data = await Guild.findOne({ guildID: role.guild.id });

      if (!data.plugins.logs.roleCreate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.roleCreate.enabled": false,
              "plugins.logs.roleCreate.channel": null,
              "plugins.logs.roleCreate.color": null,
            },
          }
        );
      }
      const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

      if (maintenance && maintenance.toggle == "true") return;
      await roleCreate(role)

      if (cooldown.has(role.guild.id)) return;

      if (!data.plugins.logs.enabled) return;

      if (data) {
        if (data.plugins.logs.roleCreate.enabled) {
          const channelEmbed = await role.guild.channels.cache.get(
            data.plugins.logs.roleCreate.channel
          );

          if (channelEmbed) {
            let color = config.embed.Color;

            const embed = new discord.EmbedBuilder()
              .setThumbnail(role.guild.iconURL())
              .setDescription(`:pencil: **Role Created**`)
              .addFields(
                { name: "Role Name", value: role.name },
                { name: " Responsible Moderator", value: user2.tag }
              )
              .setTimestamp()
              .setFooter({ text: role.guild.name })
              .setColor(data.plugins.logs.roleCreate.color);

            if (
              channelEmbed &&
              channelEmbed.viewable &&
              channelEmbed
                .permissionsFor(role.guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelEmbed.send({ embeds: [embed] }).catch((err) => {
                console.log(err.name);
              });
              cooldown.add(role.guild.id);
              setTimeout(() => {
                cooldown.delete(role.guild.id);
              }, 3000);
            }
          }
        }
      }
    } catch (err) {
      return console.log(err)


    }
  }
};
