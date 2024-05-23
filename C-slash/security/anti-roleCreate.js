const fs = require("fs");
const { EmbedBuilder ,ApplicationCommandOptionType} = require("discord.js");
const config = require("../../config.json");
const truee = `🟢`;
const falsee = `🔴`; 

module.exports = {
  name: "anti-rolecreate",
  description:"limit role Create from server",
  options:[{
name:"choice",

description:"choose on of them",
    required:true,
    type:ApplicationCommandOptionType.String,
    choices:[{name:"Enable", value:"enable "},{name:"Disable", value:"disable"}]
  },{
    name:"limit",
    description:"how many roles can be create ?",
    required:false,
    type:ApplicationCommandOptionType.String,
    choices:[{name:"1", value:"1"},{name:"2", value:"2"},{name:"3", value:"3"},{name:"4", value:"4"},{name:"5", value:"5"},{name:"6", value:"6"},{name:"7", value:"7"},{name:"8", value:"8"},{name:"9", value:"9"},{name:"10", value:"10"}]
  




    
  }],
  enabled: true,			
  memberPermissions: [ "SendMessages" ,"Administrator"],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  ownerOnly: false,			
  guilOwnerOnly: false,
  cooldown: 5000,
  run: async (interaction) => {
 let choice = await interaction.options.getString("choice");
let num = await interaction.options.getString("limit") || 3;
  let guild = await AntisfindOne({ guildId: interaction.guild.id });
     
     if (choice === "enable") {
       await Antis.updateOne({guildID: interaction.guild.id},{
         $set:{
           "roleC.enabled":true,
           "roleC.limit":num
         }
       })
        const embed1 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`${truee} **AntiroleCreate** Has been enabled and set to ***${num}***`);
     return interaction.reply({ embeds: [embed1] });
     } else if (choice === "disable") {
             await Antis.updateOne({guildID: interaction.guild.id},{
         $set:{
           "roleC.enabled":false
         }
       })
     const embed2 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`${falsee} **AntiroleCreate** Has been disabled`);
      return interaction.reply({ embeds: [embed2]});
     }
    if (isNaN(num) || parseInt(num) < 1){    
    return interaction.reply({ embeds: [new EmbedBuilder().setColor(config.embed.Color).setDescription(`Your error was found`)] })
   }/*
    await Antis.updateOne({guildID: interaction.guild.id},{
      $set:{
        "roleC.limit":num
      }
    })
    const embed3 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`**AntiroleCreate** Successfully has been set to **${guild.roleC.limit}**`);
      return await interaction.reply({ embeds: [embed3]});*/
       }
}
