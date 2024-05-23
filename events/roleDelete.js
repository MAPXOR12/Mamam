
const { AuditLogEvent,discord} = require("discord.js");
const moment = require("moment");
const cooldown = new Set();
const roleDelete = require (`${process.cwd()}/util/antirole/antiroleDelete.js`)
module.exports = class {
  async run(role, message) {
    
    

try {
  const { guild } = role;
  if(!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;
    const entry1 = await guild
      .fetchAuditLogs({ type: AuditLogEvent.RoleDelete })
      .then((audit) => audit.entries.first());
    const user2 = entry1.executor;



      


  
    const data = await Guild.findOne({ guildID: guild.id });

  if(!data.plugins.logs.roleDelete){
    
    await Guild.updateOne({guildID: guild.id},
{ $set:{ "plugins.logs.roleDelete.enabled":false ,
"plugins.logs.roleDelete.channel":null ,
"plugins.logs.roleDelete.color":null ,}})
  }
    
  
  
  
  
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;

    if (cooldown.has(role.guild.id)) return;
await roleDelete(role);
   /// if (!guild.plugins.logs.roleDelete.enabled) return;

    if (data) {
      if (data.plugins.logs.roleDelete.enabled) {
        const channelEmbed = await role.guild.channels.cache.get(
          data.plugins.logs.roleDelete.channel
        );

        if (channelEmbed) {
          let color = config.embed.Color;

          const embed = new discord.EmbedBuilder()
            .setThumbnail(role.guild.iconURL())
            .setDescription(`:pencil: **Role Delete**`)
            .addFields(
              { name: "Role Name", value: role.name },
              { name: " Responsible Moderator", value: user2.tag }
            )
            .setTimestamp()
            .setFooter({ text: role.guild.name })
            .setColor(data.plugins.logs.roleDelete.color);

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
    }} catch (err) {
      return console.log(err);
    }
  }
};
