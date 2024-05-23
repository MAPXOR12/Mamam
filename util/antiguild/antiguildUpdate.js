let {AuditLogEvent,ChannelType,Discord, EmbedBuilder} = require("discord.js");

async function guildUpdate(guild){
                
   try {
     const owner = await guild.fetchOwner()
   
      const entry1 = await guild.fetchAuditLogs({ type: AuditLogEvent.GuildUpdate}).then(audit => audit.entries.first());
      const user2 = entry1.executor;
      const guildData = await Antis.findOne({ guildID: guild.id });
      if (!guildData) { Antis.create({ guildID: guild.id }); }
      const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
      if (!memberData) { Raider.create({ guildID: guild.id, userID: user2.id }); }
      if (!guildData.guildU.enabled) return;
      if (user2.id === guild.ownerId) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
     const channel = ban.guild.channels.cache.get(guildData.antislogs)

      let Ww = await Owner.findOne({ ownerCode: "" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
      if (guildData.guildU.limit === 1) {
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
            await member.ban({ reason: `Updating Guild` })
            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
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
            await member.kick(`Updating Guild`)
            embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
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
        memberData.guildU = memberData.guildU + 1;
        setTimeout(() => {
          if (memberData.guildU !== 0) {
            memberData.guildU = 0;
            memberData.save();
          }
        }, guildData.timerefres || 6000 * 60 * 60)
        if (memberData.guildU === guildData.guildU.limit|| memberData.guildU > guildData.guildU.limit) {
          let member = await guild.members.fetch(user2.id)
          const embed = new Discord.EmbedBuilder()
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
              await member.ban({ reason: `Updating guild` })
              embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
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
              await member.kick(`Updating guild`)
              embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't kick", value: `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Guild`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(ban.guild.members.me)
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
module.exports =guildUpdate