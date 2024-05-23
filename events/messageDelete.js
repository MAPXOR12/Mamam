const { EmbedBuilder} = require('discord.js')
module.exports= class{

async run(message){

try {
  const { guild} = message;
  if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels"])) return;
         const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
 
      
      
      
  
const data = await Guild.findOne({
        guildID: guild.id
    })
    if (!data.plugins.messageDelete) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.messageDelete.enabled": false,
              "plugins.logs.messageDelete.channel": null,
              "plugins.logs.messageDelete.color": null,
            },
          }
        );
      }
if(data.plugins.logs.messageDelete.enabled){
      const channelEmbed = await guild.channels.cache.get(
        data.plugins.logs.messageDelete.channel
      );

      if (!channelEmbed) return;
  
const embed = new EmbedBuilder()
    .setTitle("Message Deleted")
    .setDescription(`${message.author.username}'s messages was deleted in ${message.channel}`)
    .addFields({name:'Message Content', value:`${message.content}`, inline:true})
    .setColor(data.plugins.messageDelete.color)
    .setTimestamp()
channelEmbed.send({embeds:[embed]})
                  }
} catch (error) {
  console.log(error)
}
  

  
}

  
}