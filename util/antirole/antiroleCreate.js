
const {AuditLogEvent,discord,EmbedBuilder} = require("discord.js");
const moment = require("moment");
const cooldown = new Set();

async function roleCreate(role){
  
    
    try {
const { guild } = role;
    if (!guild.members.me.permissions.has(["ManageGuild", "ManageChannels","ViewAuditLog"])) return;

const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

      if (maintenance && maintenance.toggle == "true") return;




    
          
      const entry1 = await guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate }).then((audit) =>{audit.entries.first()});
      const user2 = entry1.executor;


    const guildData = await Antis.findOne({ guildID: guild.id });
      if (!guildData) { Antis.create({ guildID: guild.id }); }
      const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
      if (!memberData) { Raider.create({ guildID: guild.id, userID: user2.id }); }
      if(!guildData.enabled) return;
      
      if (!guildData.roleC.enabled) return;
      const channel= await role.guild.channels.cache.get(guildData.antislogs)
      if (user2.id === guild.ownerId) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
      if (guildData.roleC.limit === 1) {
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
            await member.ban({ reason: `Creating Roles` })
            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
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
            await member.kick(`Creating Roles`)
            embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
            if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
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
        
        memberData.roleC = memberData.roleC + 1;
        setTimeout(() => {
          if (memberData.roleC !== 0) {
            memberData.roleC = 0;
            memberData.save();
          }
        }, guildData.timerefresh || 6000 * 60 * 60)
        if (memberData.roleC === guildData.roleC.limit|| memberData.roleC > guildData.roleC.limit) {
          let member = await guild.members.fetch(user2.id)
          const embed = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished `)
         .setDescription(`*I have punished a user*`);
        const embed2 = new EmbedBuilder()
         .setColor(config.embed.Color)
         .setThumbnail(guild.iconURL())
         .setTitle(`User Punished`)
         .setDescription(`*I have punished a user*`);
              
          if (guildData.punishment === "ban") {
            if (member.bannable) {
              await member.ban({ reason: `Creating **${guildData.roleC.limit}** roles` })
              embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
                if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }



              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

              await owner.send({ embeds: [embed2] }).catch(err => {})
            }
           } else if (guildData.punishment === "kick") {
            if (member.kickable) {
              await member.kick(`Creating **${guildData.roleC.limit}** roles` )
              embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles`})
              if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
          .has(["SendMessages", "EmbedLinks"])
      ) {
        channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }

              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't kick", value: `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Roles `})
                if (
        channel &&
        channel.viewable &&
        channel
          .permissionsFor(role.guild.members.me)
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

/////logs
      
    } catch (err) {
      return console.log(err)
    }
  }
module.exports = roleCreate;