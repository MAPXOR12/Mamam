const fs = require("fs");
const { EmbedBuilder ,ApplicationCommandOptionType} = require("discord.js");

const truee = `🟢`;
const falsee = `🔴`; 

module.exports = {
  name: "anti-bot",
  description:"anti bots join",
  options:[{
    name:"choice",
    description:"choose one of them",
    type:ApplicationCommandOptionType.String,
    required:true,
    choices:[{name:"Enable", value:"enable"},{name:"Disable", value:"disable"}]
  
  }],
  enabled: true,			
  memberPermissions: [ "SendMessages","" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  ownerOnly: false,			
  guilOwnerOnly: false,
  cooldown: 5000,
  run: async ( interaction) => {
    try{
    let guild = await Antis.findOne({ guildID: interaction.guild.id });
    let choice = await interaction.options.getString("choice")
     if (choice === "enable") {
       await Antis.updateOne({guildID: interaction.guild.id},{
         $set:{
           "bot.enabled":true
         }
       });
       const embed1 = new EmbedBuilder() 
        .setColor(config.embed.Color) 
        .setDescription(`${truee} **Antibot** Has been enabled`); 
        return interaction.reply({ embeds: [embed1] });
     } else if (choice === "disable") {
       await Antis.updateOne({guildID: interaction.guild.id},{
         $set:{
           "bot.enabled":false
         }
       })
      const embed2 = new EmbedBuilder() 
        .setColor(config.embed.Color) 
        .setDescription(`${falsee} **Antibot** Has been disabled`); 
       return interaction.reply({ embeds: [embed2]});
     }/*
      return interaction.reply({ embeds: [new EmbedBuilder().setColor(config.embed.Color).setDescription(`Your error was found ${guild.prefix}antibot [on,off] `)] })*/
   
   }catch(e){
      console.log(e.message)
   }
}}
