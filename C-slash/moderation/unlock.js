const Discord = require('discord.js')

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "unlock",

  description: "open he current or selected text channels",
 options:[{ 
   
     name:"channel",
   description:"channel to unlock",
   type:ApplicationCommandOptionType.Channel,
   required:false,
 }],
 category: ["moderation"],
  enabled: true,			  
  memberPermissions: [ "ManageChannels","SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks","ManageRoles" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (interaction, bot) => {
 
    try{
      let channel = await interaction.options.getChannel('channel')
  
  if(!channel) return interaction.reply({content:`You must mention channel`})
  
  channel
      .permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: true
      })
      .then(() => {
        interaction.reply({content:`channel unlocked`});
     });
    
    }catch(e){ console.log(e.message)
                }
    
    
   }
}
