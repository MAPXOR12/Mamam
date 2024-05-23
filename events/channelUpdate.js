const cooldown = new Set();

let {AuditLogEvent,ChannelType,Discord, EmbedBuilder} = require("discord.js");
const channelUpdate = require (`${process.cwd()}/util/antichannel/antichannelUpdate.js`)
module.exports = class {
  async run(oldChannel , newChannel) {



    

    try {
      const { guild } = newChannel || oldChannel;
    if(!guild.members.me.permissions.has(["ManageGuild","ViewAuditLog"])) return;
      
      const entry = await guild
        .fetchAuditLogs({ type: AuditLogEvent.ChannelUpdate })
        .then((audit) => audit.entries.first());

      let data = await Guild.findOne({ guildID: guild.id });
      if (!data.plugins.logs.channelUpdate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.channelUpdate.enabled": false,
              "plugins.logs.channelUpdate.channel": null,
              "plugins.logs.channelUpdate.color": null,
            },
          }
        );
      }
      if (data.plugins.logs.channelUpdate.enabled) {
        const channelEmbed = await guild.channels.cache.get(
          data.plugins.logs.channelUpdate.channel
        );
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
 channelUpdate(oldChannel,newChannel);    
        let type;

        if (data.plugins.logs) {
          if (data.plugins.logs.channelUpdate.enabled) {
            if (newChannel.type === ChannelType.Category) type = "Category";
            if (ChannelType.GuildText) type = "Text Channel";
            if (newChannel.type ===  ChannelType.GuildVoice) type = "Voice Channel";

            let embed = new EmbedBuilder()
              .setColor(data.plugins.logs.channelUpdate.color)
              .setAuthor({ name: guild.name, urlIcon: guild.iconURL() })
              .addFields({name:"Channel", value:`${newChannel}`, inline:true})
              .setFooter({text:`Channel ID: ${newChannel.id}`})
              .setTimestamp();
            if (oldChannel.name !== newChannel.name) {
              embed.addFields({
                name: "Name Update",
                value: `${oldChannel.name} --> ${newChannel.name}`,
              });
            } else {
              embed.addFields({
                name: "Name Update",
                value: `Name not updated`,
              });
            }
            if (oldChannel.topic || newChannel.topic) {
              if (oldChannel.topic !== newChannel.topic) {
                embed.addFields({
                  name: "Topic",
                  value: `${oldChannel.topic || "none"} --> ${
                    newChannel.topic || "none"
                  }`,
                });
              }
            }

            if (oldChannel.nsfw || newChannel.nsfw) {
              if (oldChannel.nsfw !== newChannel.nsfw) {
                embed.addFields({
                  name: "NSFW",
                  value: `${oldChannel.nsfw} --> ${newChannel.nsfw}`,
                });
              }
            }
           
 // var userID = entry.entries.first().executor.id;
  var userAvatar = entry1.entries.first().executor.avatarURL();
  var userTag = entry.entries.first().executor.tag;

          
            if (oldChannel.roles.cache.size < newChannel.roles.cache.size) {
   let role = newChannel.roles.cache.filter(r => !oldChannel.roles.cache.has(r.id)).first();
            
   //let roleAdded = new Discord.MessageEmbed()
    embed.setTitle("**ADDED ROLE TO MEMBER**")
    embed.setThumbnail(oldChannel.guild.iconURL())
    embed.setColor("RANDOM")
   embed.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldChannel.name}**\n\n**Channel:** <@${oldChannel.id}> (ID: ${oldChannel.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**`)
   embed.setTimestamp()
    embed.setFooter({text:userTag, iconURL:userAvatar});
 ////  channelEmbed.send({embeds:[roleAdded]});
   }
            

            if (oldChannel.rateLimitPerUser || newChannel.rateLimitPerUser) {
              if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                embed.addFields({
                  name: "Slowmode",
                  value: `${oldChannel.rateLimitPerUser} --> ${newChannel.rateLimitPerUser}`,
                });
              }
            }

            if (oldChannel.rateLimitPerUser === newChannel.rateLimitPerUser) {
              if (oldChannel.name === newChannel.name) {
                if (oldChannel.topic === newChannel.topic) {
                  if (oldChannel.nsfw === newChannel.nsfw) {
                    return;
                  }
                }
              }
            }
            if (
              channelEmbed &&
              channelEmbed.viewable &&
              channelEmbed
                .permissionsFor(newChannel.guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelEmbed.send({ embeds: [embed] }).catch(() => {});
              cooldown.add(newChannel.guild.id);
              setTimeout(() => {
                cooldown.delete(newChannel.guild.id);
              }, 2000);
            }
          }
        }
      }

///------anti channel update ---////









      
          
      
      





      
    } catch (err) {
      return console.log(err)
    }
  }
};
