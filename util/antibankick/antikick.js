const Discord = require("discord.js")

const { AuditLogEvent,EmbedBuilder } = require('discord.js');
async function kick(member){
  
           try {
             const { guild } = member, user = member;
             if (
      !guild.members.me.permissions.has([
        "ManageGuild",
        "ManageChannels","ViewAuditLog"
        
      ])
    ); return;
    
  
          const owner = await guild.fetchOwner()
        if (member.guild) {
          const entry1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first());
          if (entry1.action === AuditLogEvent.MemberKick) {
          const entry2 = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberKick}).then(audit => audit.entries.first());
          const user2 = entry1.executor;
          const guildData = await Antis.findOne({ guildID: member.guild.id });
          if (!guildData) { Antis.create({ guildID: member.guild.id }); }
          const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
          if (!memberData) { Raider.create({ guildId: guild.id, userID: user2.id }); }
            if (!guildData.enabled) return;
          if (!guildData.kick.enabled) return;
          if (user2.id === guild.ownerId) return;
          if (guildData.whitelist.find((c) => c.type === user2.id)) return;
          let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
          if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
          if (guildData.kick.limit === 1) {
            let member = await guild.members.fetch(user2.id)
            const embed = new EmbedBuilder()
            .setColor(config.embed.Color)
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
                await member.ban({ reason: `banned Member` })
                embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                await owner.send({ embeds: [embed] }).catch(err => {})
              } else {
                embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                await owner.send({ embeds: [embed2] }).catch(err => {})
              }
    
            } else if (guildData.punishment === "kick") {
              if (member.kickable) {
                await member.kick(`Kick Members` )
                embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                await owner.send({ embeds: [embed] }).catch(err => {})
              } else {
                embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                await owner.send({ embeds: [embed2] }).catch(err => {})
              }
            }
          } else {
            memberData.kick = memberData.kick + 1;
            setTimeout(() => {
              if (memberData.kick !== 0) {
                memberData.kick = 0;
                memberData.save();
              }
            }, guildData.timerefresh ||6000 * 60 * 60)
            if (memberData.kick === guildData.kick.limit || memberData.kick > guildData.kick.limit) {
              let member = await guild.members.fetch(user2.id)
              const embed = new EmbedBuilder()
              .setColor(config.embed.Color)
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
                  await member.ban({ reason: `banned**${guildData.kick.limit}** members` })
                  embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                  await owner.send({ embeds: [embed] }).catch(err => {})
                } else {
                  embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                  await owner.send({ embeds: [embed2] }).catch(err => {})
                }
                     } else if (guildData.punishment === "kick") {
                if (member.kickable) {
                  await member.kick( `Kick **${guildData.kick.limit}** members` )
                  embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                  await owner.send({ embeds: [embed] }).catch(err => {})
                } else {
                  embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nKick Members`})
                  await owner.send({ embeds: [embed2] }).catch(err => {})
                }
              }
            }
            memberData.save();
          }
        }
      };
    } catch (err) {
      return console.log(err)
    }
  }
module.exports = kick;