const Discord = require("discord.js")
module.exports = {
name:"help",
  description:'commands',
  options:[],
  enabled: true,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
   
    try{
    await interaction.reply({content:` help command transfer to Dashboard: https://boboworld.xyz/commands`});
    }catch{}
  

  }}

    
    