const fs = require("fs");
const { EmbedBuilder,ApplicationCommandOptionType } = require("discord.js");
const truee = `🟢`;
const falsee = `🔴`; 

module.exports = {
  name: "anti-kick",
  description:"disable or enable anti kick cmand woth limit kick users",
  options:[{
    name:"choice ",
    description:"enable or disable choose one",
    type:ApplicationCommandOptionType.String,
    required:true,
    choices:[{name:"Enable", value:"enable"},{name:"Disable", value:"disable"}]
  },{
    name:"limit",
    description:"how many members can ban ?",
    required:false,
    type:ApplicationCommandOptionType.String,
    choices:[{name:"1", value:"1"},{name:"2", value:"2"},{name:"3", value:"3"},{name:"4", value:"4"},{name:"5", value:"5"},{name:"6", value:"6"},{name:"7", value:"7"},{name:"8", value:"8"},{name:"9", value:"9"},{name:"10", value:"10"}]
    
  }],
  enabled: true,			
  memberPermissions: [ "Administrator" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  ownerOnly: false,			
  guilOwnerOnly: false,
  cooldown: 5000,
  run: async (interaction) => {
    let guild = await Antis.findOne({ guildID: interaction.guild.id });
     let num = await interaction.options.getString("limit")||3;
    let choice = await interaction.options.getString("choice");
     if (choice=== "enable") {
       await Antis.updateOne({guildID: interaction.guild.id},{
         $set:{
           "kick.enabled":true,
           "kick.limit":num
         }
       })
         const embed1 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`${truee} **Antikick** Has been enabled and set to ***${num}***`);
       return interaction.reply({ embeds: [embed1], ephemeral:true });
     } else if (choice === "disable") {
       await Antis.updateOne({guildID: interaction.guild.id},{
         $set:{
           "kick.enabled":false
         }
       })
         const embed2 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`${falsee} **Antikick** Has been disabled`);
       return interaction.reply({ embeds: [embed2], ephemeral:true });
     }
    if (isNaN(num) || parseInt(num) < 1){
       return interaction.reply({ embeds: [new EmbedBuilder().setColor(config.logcolor).setDescription(`Your error was found ${guild.prefix}antikick [on,off,<number>]
   `)] })
    }/*
    await Antis.updateOne({guildID: interaction.guild.id},{
      $set:{
        "kick.limit":num
      }
    })
     const embed3 = new EmbedBuilder()
        .setColor(config.embed.Color)
        .setDescription(`**Antikick** Successfully has been set to **${num}**`);
    return interaction.reply({ embeds: [embed3], ephemeral:true});*/
  }
}
