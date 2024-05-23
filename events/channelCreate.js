
const discord = require("discord.js");
const moment = require("moment");
const { ChannelType} = require ("discord.js")
const antichannel = require (`${process.cwd()}/util/antichannel/antichannelCreate.js`)
const cooldown = new Set();
const { AuditLogEvent,EmbedBuilder} = require ("discord.js")
module.exports = class {
  async run(channel) {
    const { guild } = channel;
    try {
          if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;

      const entry1 = await guild
        .fetchAuditLogs({type: AuditLogEvent.ChannelCreate})
        .then((audit) => audit.entries.first());
      const user2 = entry1.executor;
    

      const data = await Guild.findOne({ guildID: guild.id });

      if (!data.plugins.logs.channelCreate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.channelCreate.enabled": false,
              "plugins.logs.channelCreate.channel": null,
              "plugins.logs.channelCreate.color": null,
            },
          }
        );
      }
      const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

      if (maintenance && maintenance.toggle == "true") return;
const anti = await antichannel(channel);
      if (cooldown.has(guild.id)) return;
      
      if (data.plugins.logs) {
        if (data.plugins.logs.channelCreate.enabled) {
          
          const channelEmbed = await guild.channels.cache.get(
            data.plugins.logs.channelCreate.channel
          );
          if (channelEmbed) {
            

            if (channel.type === ChannelType.GuildText) {
              const embed = new EmbedBuilder()
                .setThumbnail(guild.iconURL())
                .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
                .setDescription(`:pencil: ***Channel Created***`)
                .addFields(
  { name: "Channel Name",value: `${channel.name}`, inline:true
 },
{ name: "Category", value:`${ channel.parent.name}`, inline:true },
{ name: "Channel Type", value: `${channel.type}`, inline:true },
{ name: " Responsible Moderator", value: `${user2.tag }`, inline:true}
                )

                .setTimestamp()
                .setFooter({ text: guild.name })
                .setColor(data.plugins.logs.channelCreate.color);

              if (channel.parent && channel.type !== ChannelType.GuildCategory)
                if (
                  channelEmbed &&
                  channelEmbed.viewable &&
                  channelEmbed
                    .permissionsFor(guild.members.me)
                    .has(["SendMessages", "EmbedLinks"])
                ) {
                  channelEmbed.send({ embeds: [embed] }).catch((err) => {
                    
                  });
                  cooldown.add(guild.id);
                  setTimeout(() => {
                    cooldown.delete(guild.id);
                  }, 3000);
                }
            }
            if (channel.type === ChannelType.GuildVoice) {
              console.log("hama")
              const embed = new discord.EmbedBuilder()
                .setThumbnail(guild.iconURL())
                .setAuthor(guild.name)
                .setDescription(`:pencil: ***Channel Created***`)
                .addFields(
                  {
                    name: "Channel Name",
                    value: channel.name,
                  },
                  { name: "Category", value: channel.parent.name },
                  { name: "Channel Type", value: channel.type },
                  { name: " Responsible", value: user2.tag }
                )

                .setTimestamp()
                .setFooter({ text:guild.name })
                .setColor(data.plugins.logs.channelCreate.color);

              if (
                channelEmbed &&
                channelEmbed.viewable &&
                channelEmbed
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelEmbed.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }
            }
          }
        }
      };
    


  }catch (error) {
      return console.log(error)
    
  }    
  }
};
