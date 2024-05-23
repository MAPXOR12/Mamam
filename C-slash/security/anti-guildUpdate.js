const fs = require("fs");
const { EmbedBuilder,ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config.json");
const truee = `🟢`;
const falsee = `🔴`; 

module.exports = {
  name: "antiguildupdate",
  description:"anti guild edit",
    options:[{


    name:"choice",

description:"choose on of them",
    required:true,
    type:ApplicationCommandOptionType.String,
    choices:[{name:"Enable", value:"enable"},{name:"Disable", value:"disable"}]
  },{
    name:"limit",
    description:"how many times guild will be update ?",
    required:false,
    type:ApplicationCommandOptionType.String,
    choices:[{name:"1", value:"1"},{name:"2", value:"2"},{name:"3", value:"3"},{name:"4", value:"4"},{name:"5", value:"5"},{name:"6", value:"6"},{name:"7", value:"7"},{name:"8", value:"8"},{name:"9", value:"9"},{name:"10", value:"10"}]
  }
        ],
  enabled: true,			
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  ownerOnly: false,			
  guilOwnerOnly: true,
  cooldown: 5000,
  run: async (interaction) => {
    let guild = await Antis.findOne({ guildID: interaction.guild.id });
    const choice = await interaction.options.getString("choice");
    
     let num = await interaction.options.getString("limit") ||3;
     if (choice === "enable") {
      await Antis.updateOne({guildID: interaction.guild.id},{$set:{
        "guildU.enabled":true,
        "guildU.limit":num
      }});
       
       const embed1 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`${truee} **Antiguildupdate** Has been enabled and set to ***${num}***`);
       return interaction.reply({ embeds: [embed1], ephemeral:true });
     } else if (choice === "disable") {
      await Antis.updateOne({guildID: interaction.guild.id},{
        "guildU.enabled":false
      })
       ;
       const embed2 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`${falsee} **Antiguildupdate** Has been disabled`);
      return interaction.reply({ embeds: [embed2], ephemeral:true });
     }
    if (isNaN(num) || parseInt(num) < 1){
  return message.reply({ embeds: [new EmbedBuilder().setColor(config.logcolor).setDescription(`Your error was found antiguildupdate
   `)] })
    }/*
   await Antis.updateOne({guildID: interaction.guild.id},{$set:{
     "guildU.limit":num
   }});
    const embed3 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`**Antiguildupdate** Successfully has been set to **${guild.guildU.limit}**`);
      return interaction.reply({ embeds: [embed3]});*/
  }
}
