
const discord = require("discord.js");
const moment = require("moment");
const { ChannelType} = require ("discord.js")

const cooldown = new Set();
const { AuditLogEvent,EmbedBuilder} = require ("discord.js")
async function channelCreate(channel ){
  
    
    try {
      const { guild } = channel;
    if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels","ViewAuditLog"])) return;
      const entry1 = await guild
        .fetchAuditLogs({type: AuditLogEvent.ChannelCreate})
        .then((audit) => audit.entries.first());
      const user2 = entry1.executor;
    

      


  
const owner = await guild.fetchOwner()
    
      
      const guildData = await Antis.findOne({ guildID: guild.id });
      if (!guildData) { Antis.create({ guildID: guild.id }); }


      const memberData = await Raider.findOne({ guildID: guild.id, userID: user2.id });
      if (!memberData) { Raider.create({ guildID: guild.id, userID: user2.id }); }
    if(!guildData.enabled) return;
      if (!guildData.channelC.enabled) return;
      if (user2.id === guild.ownerId) return;
    if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
console.log(user2.id)
    const channelC = await guild.channels.cache.get(
            guildData.antislogs );
      if (guildData.channelC.limit === 1) {
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
            await member.ban({ reason: `Creating Channels` })


            embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`, inline:true}) 
   if (
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                 hannelC.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }         

member.send({embeds:[embed]}).catch(err=>{});
            await owner.send({ embeds: [embed] }).catch(err => {console.log(err)});
          }else {
            embed2.addFields({name:"- Can't ban-", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channe`})
if (
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelC.send({ embeds: [embed2] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }

            await member.send({embeds:[embed2]}).catch(err=>{});
            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
  
        } else if (guildData.punishment === "kick") {
          console.log("kicked")
          if (member.kickable) {
            await member.kick( `Creating Channels` )
           embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`})

if (
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelC.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }

            
            await owner.send({ embeds: [embed] }).catch(err => {})
          } else {
           embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`})
            await owner.send({ embeds: [embed2] }).catch(err => {})
          }
    }
      } else {
        memberData.channelC = memberData.channelC + 1;
        console.log('kick')
        setTimeout(() => {
          if (memberData.channelC !== 0) {
            memberData.channelC = 0;
            memberData.save();
          }
        },guildData.timerefresh || 6000 * 60 * 60)
        if (memberData.channelC === guildData.channelC.limit || memberData.channelC > guildData.channelC.limit) {
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
              await member.ban({ reason: `Creating **${guildData.channelC.lmite}** channels` })
             embed.addFields({name:"- Ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`})
        if (
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelC.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }
              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
             embed2.addFields({name:"- Can't ban", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`})
 

if (
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelC.send({ embeds: [embed2] }).catch((err) => {
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
              console.log('kicked')
              await member.kick( `Creating **${guildData.channelC.limit}** channels` )
             embed.addFields({name:"- Kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`})
               if(
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelC.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(guild.id);
                setTimeout(() => {
                  cooldown.delete(guild.id);
                }, 3000);
              }






              await owner.send({ embeds: [embed] }).catch(err => {})
            } else {
             embed2.addFields({name:"- Can't kick", value:`**Server:**\n${guild.name}\n**User:**\n${user2.tag}\n${user2.id}\n**Actions:**\nCreating Channels`})

          if (
                channelC &&
                channelC.viewable &&
                channelC
                  .permissionsFor(guild.members.me)
                  .has(["SendMessages", "EmbedLinks"])
              ) {
                channelC.send({ embeds: [embed] }).catch((err) => {
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






      


  }catch (error) {
    console.log(error)
  }



}






    
  module.exports = channelCreate

