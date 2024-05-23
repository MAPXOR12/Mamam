const cooldown = new Set();

let {AuditLogEvent,ChannelType,Discord,EmbedBuilder} = require("discord.js");

async function channelUpdate(oldChannel,newChannel) {

try{


    
    
///------anti channel update ---////






const { guild } = oldChannel;
    if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;

const owner = await guild.fetchOwner()
   
  
      const entry1 = await guild.fetchAuditLogs({ type: AuditLogEvent.ChannelUpdate }).then(audit => audit.entries.first());
      const user2 = entry1.executor;
      const guildData = await Antis.findOne({ guildID: guild.id });
      if (!guildData) { Antis.create({ guildID: guild.id }); }
  const channelU =await guild.channels.cache.get(guildData.antislogs) ;
      const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
  
  
      
   if (!memberData) { Raider.create({ guildID: guild.id, userID: user2.id }); }
  
  
  
      if(!guildData.enabled) return;
      if (guildData.channelU.enabled) return;
      if (user2.id === guild.ownerId) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "769956996476043275" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
      if (guildData.channelU.limit === 1) {
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
            await member.ban({ reason: `Updating Channels` })
            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`});

if (
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed] }).catch(() => {});
              cooldown.add(newChannel.guild.id);
              setTimeout(() => {
                cooldown.delete(newChannel.guild.id);
              }, 2000);
            }
            
            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
            embed2.addFields({name:"- Can't ban", value :`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`}) 

if (
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed2] }).catch(() => {});
              cooldown.add(guild.id);
              setTimeout(() => {
                cooldown.delete(guild.id);
              }, 2000);
            }
            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
      } else if (guildData.punishment === "kick") {
          if (member.kickable) {
            await member.kick( `Updating Channels` )
            embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`})

if (
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed] }).catch(() => {});
              cooldown.add(guild.id);
              setTimeout(() => {
                cooldown.delete(guild.id);
              }, 2000);
            }
            await owner.send({ embeds: [embed] }).catch(err => {})


        
          } else {
            embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`})
            await owner.send({ embeds: [embed2] }).catch(err => {})

if (
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed2] }).catch(() => {});
              cooldown.add(guild.id);
              setTimeout(() => {
                cooldown.delete(guild.id);
              }, 2000);
            }

            
          }
        }
      } else { console.log('hhhhhhaowjsia')
        memberData.channelU = memberData.channelU + 1;
        setTimeout(() => {
          if (memberData.channelU !== 0) {
            memberData.channelU = 0;
            memberData.save();
          }
        }, guildData.timerefresh || 6000 * 60 * 60)
        if (memberData.channelU === guildData.channelU.limit|| memberData.channelU > guildData.channelU.limit) {
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
              await member.ban({ reason: `Updating **${guildData.channelU.limit}** channels` })
              embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`})

if (
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed] }).catch(() => {});
              cooldown.add(guild.id);
              setTimeout(() => {
                cooldown.delete(guild.id);
              }, 2000);
            }

              
              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`})


if(
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed2] }).catch(() => {});
              cooldown.add(guild.id);
              setTimeout(() => {
                cooldown.delete(guild.id);
              }, 2000);
            }
              
              await owner.send({ embeds: [embed2] }).catch(err => {})
            }
           } else if (guildData.punishment === "kick") {
            if (member.kickable) {
              await member.kick( `Updating **${guildData.channelU.lmite}** channels` )
              embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`})
              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
              embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nUpdating Channels`})

if (
              channelU &&
              channelU.viewable &&
              channelU
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelU.send({ embeds: [embed2] }).catch(() => {});
              cooldown.add(guild.id);
              setTimeout(() => {
                cooldown.delete(nguild.id);
              }, 2000);
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
module.exports = channelUpdate
