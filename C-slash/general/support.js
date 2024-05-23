const Discord = require("discord.js")

module.exports = {
name:"support",
  description:"server support",
  options:[],
  enabled:true,		    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    try{
    await interaction.reply({content:`Join support server ${config.support}`})
 
    }catch{}
    }}