/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require("moment"),
      {ChannelType,EmbedBuilder,  AuditLogEvent} = require ("discord.js");
    
const cooldown = new Set();
const channelDelete = require (`${process.cwd()}/util/antichannel/antichannelDelete.js`)
module.exports = class {
  async run(channel) {
    const { guild } = channel;
    
    try {
      if (!guild.members.me.permissions.has(["ManageGuild", "ManageChannels","ViewAuditLog"])) return;
      const entry = await guild
        .fetchAuditLogs({ type: AuditLogEvent.ChannelDelete })
        .then((audit) => audit.entries.first());
      const user = entry.executor;


      const data= await Guild.findOne({ guildID: guild.id });

      if (!data.plugins.logs.channelDelete) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.channelDelete.enabled": false,
              "plugins.logs.channelDelete.channel": null,
              "plugins.logs.channelDelete.color": null,
            },
          }
        );
      }

      const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

      if (maintenance && maintenance.toggle == "true") return;
const antichannelDelete = await channelDelete(channel);
      if (cooldown.has(guild.id)) return;
      
      if (data.plugins.logs) {
        if (data.plugins.logs.channelDelete.enabled) {
          const channelEmbed = await guild.channels.cache.get(
            data.plugins.logs.channelDelete.channel
          );
          if (channelEmbed) {
            let color = config.embed.Color;

            if (channel.type === ChannelType.GuildText) {
              const embed = new discord.EmbedBuilder()
                .setThumbnail(guild.iconURL())
                .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
                .setDescription(`:pencil: ***Channel Deleted***`)
                .addFields(
                  {
                    name: "Channel Name",
                    value: `${channel.name}`, inline:true
                  },
                  { name: "Category", value: `${channel.parent.name }`, inline:true},
                  { name: "Channel Type", value: `${channel.type}`, inline:true },
                  { name: " Responsible Moderator", value: `${user.tag }`, inline:true}
                )

                .setTimestamp()
                .setFooter({ text: guild.name })
                .setColor(data.plugins.logs.channelDelete.color);

              if (channel.parent && channel.type !== ChannelType.Category)
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
            if (message.type === ChannelType.GuildVoice) {
              const embed = new discord.EmbedBuilder()
                .setThumbnail(message.guild.iconURL())
                .setAuthor(message.guild.name)
                .setDescription(`:pencil: ***Channel Deleted***`)
                .addFields(
                  {
                    name: "Channel Name",
                    value: `${channel.name}`, inline:true
                  },
                  { name: "Category", value: `${message.parent.name}`, inline:true},
                  { name: "Channel Type", value: `${message.type}`, inline:true },
                  { name: " Responsible", value: `${user2.tag}`, inline:true}
                )

                .setTimestamp()
                .setFooter({ text: message.guild.name })
                .setColor(data.plugins.logs.channelDelete.color);

              if (
                channelEmbed &&
                channelEmbed.viewable &&
                channelEmbed
                  .permissionsFor(message.guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelEmbed.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(message.guild.id);
                setTimeout(() => {
                  cooldown.delete(message.guild.id);
                }, 3000);
              }
            }
          }
        }
      }


                  
                  
      
    } catch (error) {
      return console.log(error)
    }
    

    }
  }
