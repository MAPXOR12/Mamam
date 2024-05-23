const {ChannelType,AuditLogEvent ,Discord} = require("discord.js");
const banadd = require(`${process.cwd()}/util/antibankick/antiban.js`)
module.exports = class {
  async run(ban, bot) {

    
           try{   
             if (!ban.guild.members.me.permissions.has(["ManageGuild","ViewAuditLog"])) return;
      

             await banadd(ban,bot)
             let data = await Guild.findOne({guildID:ban.guild.id})
      if (!data) return;
      const entry1 = await ban.guild
        .fetchAuditLogs({
          type:AuditLogEvent.GuildBanAdd,
        })
        .then((audit) => audit.entries.first());
      const user2 = entry1.executor;
      if (!data.plugins.banAdd) {
        await Guild.updateOne(
          { guildID: ban.guild.id },
          {
            $set: {
              "plugins.logs.banAdd.enabled": false,
              "plugins.logs.banAdd.channel": null,
              "plugins.logs.banAdd.color": null,
            },
          }
        );
      }
      if(data.plugins.logs){
      if(data.plugins.logs.banAdd.enabled){
      const channelEmbed = await ban.guild.channels.cache.get(
        data.plugins.logs.banAdd.channel
      );

      if (!channelEmbed) return;
      const embed = new Discord.EmbedBuilder()
        .setDescription(`:pencil: **Ban Action**`)
        .addFields({name:"Moderator Name",value: user2.tag,inline: true})
        .addFields({name:"User Banned", value :entry1.target.tag,inline: true})
        .addFields({name:"reason", value:entry1.reason || "not have reason",inline: true})
        .setFooter({ text: ban.guild.name })
        .setThumbnail(ban.guild.iconURL())
        .setTimestamp()
        .setColor(data.plugins.logs.banAdd.color);

      if (
        channelEmbed &&
        channelEmbed.viewable &&
        channelEmbed
          .permissionsFor(ban.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channelEmbed.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }
      }}
    } catch (err) {
      return console.log(err)
    }
  }
};
