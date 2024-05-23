

const { EmbedBuilder } = require("discord.js")

module.exports = class{

async run(newMessage,oldMessage){
  try{ 
    const {guild} = newMessage;


if (!guild.members.me.permissions.has(["ManageGuild","ManageChannels"])) return;
         const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
 
      
      
      
  
const data = await Guild.findOne({
        guildID: guild.id
    })
    if (!data.plugins.messageUpdate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.messageUpdate.enabled": false,
              "plugins.logs.messageUpdate.channel": null,
              "plugins.logs.messageUpdate.color": null,
            },
          }
        );
      }
if(data.plugins.logs.messageUpdate.enabled){
      const channelEmbed = await guild.channels.cache.get(
        data.plugins.logs.messageUpdate.channel
      );

      if (!channelEmbed) return;
const embed = new EmbedBuilder()
    .setTitle("Message Edited")
    .setDescription(`${newMessage.author} edited their message in ${newMessage.channel}`)
    .addFields({name:'Jump to Message', value:`[Click Me](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`})
    .addField({name:`Old Message`, value:`${oldMessage.content}`, inline:true})
    .addFields({name:'New Message', value:`${newMessage.content}`, inline:true})
    .setColor(data.plugins.messageUpdate.color)
    .setTimestamp()
channelEmbed.send({embeds:[embed]})

}
}catch(err){ console.log(err)}
}
}