
const {ChannelType,AuditLogEvent ,Discord} = require("discord.js");
async function ban(ban){




    try {
     const {guild} = ban;
          
    //let data = await Guild.findOne({ guildID: ban.guild.id }) || new Guild({guildID: ban.guild.id});
if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;
         const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
 
      
    const owner = await ban.guild.fetchOwner()
   let data = await Guild.findOne({ guildID: guild.id });
       const entry1 = await ban.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd })
        .then(audit => audit.entries.first());
      const user2 = entry1.executor;

      const guildData = await Antis.findOne({ guildID: guild.id });
      if (!guildData) { Antis.create({ guildID: guild.id }); }
      const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
      if (!memberData) { Raider.create({ guildID: guild.id, userID: user2.id }); }
     if(!guildData.enabled) return;
      if (!guildData.ban.enabled) return;
      if (user2.id === guild.ownerId) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
const channel = ban.guild.channels.cache.get(guildData.antislogs)

      if (guildData.ban.limit === 1) {
        let member = await guild.members.fetch(user2.id)
         const embed = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished`)
         .setDescription(`*I have punished a user*`);
        const embed2 = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished`)
         .setDescription(`*I have punished a user*`);
              

        if (guildData.punishment === "ban") {
          if (member.bannable) {
            await member.ban({ reason: `Ban Members` })
            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`})
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
            embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`})

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
            await member.kick( `Kick **${guildData.ban.lmite}** members` )
           embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`})
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
            embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`})
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
        memberData.ban = memberData.ban + 1;
        setTimeout(() => {
          if (memberData.ban !== 0) {
            memberData.ban = 0;
            memberData.save();
          }
        }, guildData.timerefresh || 6000 * 60 * 60)
        if (memberData.ban === guildData.ban.limit || memberData.ban > guildData.ban.limit) {
          let member = await guild.members.fetch(user2.id)
          const embed = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished `)
         .setDescription(`*I have punished a user*`);
        const embed2 = new EmbedBuilder()
         .setColor(config.logcolor)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished `)
         .setDescription(`*I have punished a user*`);
              

          if (guildData.punishment === "ban") {
            if (member.bannable) {
              await member.ban({ reason: `Ban **${guildData.ban.lmite}** members` })
              embed.addField("- Ban", `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`)
             await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't ban", value: `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`})
               await owner.send({ embeds: [embed2] }).catch(err => {})
            }

          } else if (guildData.punishment === "kick") {
            if (member.kickable) {
              await member.kick(r`Kick ${guildData.ban.limit} members` )
              embed.addFields({name:"- Kick", value:`Name: ${user2.username}\nTag : ${user2.tag}\nId: ${user2.id}`})
              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't kick", value: `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nBan Members`})
               await owner.send({ embeds: [embed2] }).catch(err => {})
            }
          }
        }
        memberData.save();
      }
    
      
      
    } catch (err) {
      return;
    }
  }



module.exports = ban;