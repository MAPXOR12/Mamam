const {AuditLogEvent,Discord,EmvedBuilder} = require("discord.js");

async function roleUpdate(oldRole,newRole){
    
    try {



const { guild } = newRole;
  
    if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;



      const entry1 = await guild.fetchAuditLogs({ type: AuditLogEvent.RoleUpdate}).then(audit => audit.entries.first());
      const user2 = entry1.executor || null;
      const guildData = await Guild.findOne({ guildId: guild.id });
      if (!guildData) { Guild.create({ guildId: guild.id }); }
      const memberData = await User.findOne({ guildId: guild.id, userID: user2.id });
      if (!memberData) { User.create({ guildId: guild.id, userID: user2.id }); }
      if(!guildData.enabled) return;
      if (!guildData.roleU.enabled) return;
      if (user2.id === guild.ownerId) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
      if (guildData.roleU.limit === 1) {
        let member = await guild.members.fetch(user2.id)
        const embed = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished`)
         .setDescription(`*I have punished a user*`);
        const embed2 = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished `)
         .setDescription(`*I have punished a user*`);
              

        if (guildData.punishment === "ban") {
          if (member.bannable) {
            await member.ban({ reason: `Updating Roles` })
            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})

if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }
            
            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed2] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
            }
            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
      } else if (guildData.punishment === "kick") {
          if (member.kickable) {
            await member.kick( `Updating Roles` )
            embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
            }


            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})


            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed2] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }
            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
        }
      } else {
        memberData.roleU = memberData.roleU + 1;
        setTimeout(() => {
          if (memberData.roleU !== 0) {
            memberData.roleU = 0;
            memberData.save();
          }
        }, guildData.timerefres ||6000 * 60 * 60)
        if (memberData.roleU === guildData.roleU.limit || memberData.roleU > guildData.roleU.limit) {
          let member = await guild.members.fetch(user2.id)
          const embed = new EmbedBuilder()
         .setColor(config.logcolor)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished `)
         .setDescription(`*I have punished a user*`);
        const embed2 = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished `)
         .setDescription(`*I have punished a user*`);
              
          if (guildData.punishment === "ban") {
            if (member.bannable) {
              await member.ban({ reason: `Updating **${guildData.roleU.lmite}** roles` })
              embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
              }
              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed2] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
              }
              await owner.send({ embeds: [embed2] }).catch(err => {})
            }
           } else if (guildData.punishment === "kick") {
            if (member.kickable) {
              await member.kick( `Updating **${guildData.roleU.limit}** roles` )
              embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles`})
                if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
              }


              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't kick", value: `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Roles `})
                if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed2] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
              }


              await owner.send({ embeds: [embed2] }).catch(err => {})
            }
          }
        }
        memberData.save();
      }
 




      
      
          
    } catch (err) {
      return console.log(err)
    }
  }
module.exports = roleUpdate