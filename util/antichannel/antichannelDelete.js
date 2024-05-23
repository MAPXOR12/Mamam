/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require("moment"),
      {ChannelType,EmbedBuilder,  AuditLogEvent} = require ("discord.js");
    
const cooldown = new Set();

async function channelDelete(channel){
    try{
      
              
//----------anti channel delete ----//
     const { guild } = channel
     const owner = await guild.fetchOwner()
              if (!guild.members.me.permissions.has(["ManageGuild", "ManageChannels","ViewAuditLog"])) return;


      const entry1 = await guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then(audit => audit.entries.first());
      const user2 = entry1.executor;
      const guildData = await Antis.findOne({ guildID: guild.id });
      if (!guildData) { Antis.create({ guildID: guild.id }); }
      const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
      if (!memberData) { Raider.create({ guildID: guild.id, userID: user2.id }); }
      if(!guildData.enabled) return;
      if (!guildData.channelD.enabled) return;
      const channelD = guild.channels.cache.get(guildData.antislogs)
      if (user2.id === guild.ownerId) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
      if (guildData.channelD.limit === 1) {
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
            await member.ban({ reason: `Deleting Channels` })
            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`})
            await owner.send({ embeds: [embed] }).catch(err => {})
            const position = channel.position;
            const newChannel = await channel.clone();
            newChannel.setPosition(position);
          } else {
            embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`}) 
              if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              } 





            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
    
        } else if (guildData.punishment === "kick") {
          if (member.kickable) {
            await member.kick(`Deleting Channels` )
            embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`})  

if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }


            await owner.send({ embeds: [embed] }).catch(err => {})
            const position = channel.position;
            const newChannel = await channel.clone();
            newChannel.setPosition(position);
          } else {
            embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`})    

if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed2] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }




            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
        }

      } else {
        memberData.channelD = memberData.channelD + 1;
        console.log("uujjjj")
        setTimeout(() => {
          if (memberData.channelD !== 0) {
            memberData.channelD = 0;
            memberData.save();
          }
        }, guildData.timerefresh || 6000 * 60 * 60)
        if (memberData.channelD === guildData.channelD.limit || memberData.channelD > guildData.channelD.limit) {
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
              await member.ban({ reason: `Deleting **${guildData.channel.limit}** Channels` })
              embed.addFields({name:"- Ban", value :`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`}) 
if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }

              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't ban", value: `**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`})

if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed2] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }



              await owner.send({ embeds: [embed2] }).catch(err => {})
            }
          
          } else if (guildData.punishment === "kick") {
            if (member.kickable) {
              await member.kick( `Deleting **${guildData.channelD.limit}** Channels` )
              embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`})
if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }

              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nDeleting Channels`}) 
if (
                channelD &&
                channelD.viewable &&
                channelD
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelD.send({ embeds: [embed2] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }

              await owner.send({ embeds: [embed2] }).catch(err => {})
            }
          }
        }
        memberData.save();
      }
 








      
    } catch (error) {
      return console.log(error)
    }
    

    }
  module.exports = channelDelete
