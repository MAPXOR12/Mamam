const fs = require("fs");
const Discord = require("discord.js");
//const { Color } = require("../../config.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "clear",
  description: "To clear the text channel",
options:[{
    name:"number",
    description:"number of message you want to delete between [0,100]",
type:ApplicationCommandOptionType.Number,
    required: true,
  
  
}],
  category: ["Moderation"],
  enabled: true,			
  memberPermissions: [ "ManageMessages","SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks", "ManageMessages" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async ( interaction , dev) => {

    try{
    let number = await interaction.options.getNumber("number");
    
    
    
    let messagecount = parseInt(number) +1;
    
    if(number > 100){
      number === 100}
    if(!messagecount) number= "100";
    interaction.channel.bulkDelete(number);
   await interaction.reply({content:`I have cleared Messages`})
                          
    }catch (e){ 
      console.log(e.message)}
    
    
    
    
  } 
}
