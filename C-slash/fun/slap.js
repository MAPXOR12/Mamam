const Discord = require("discord.js")
const fetch = require("node-fetch")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name:"slap",
  description:"slap user or user",
  options:[{

      name:"target_slap",
      description:"mention someone",
    type:ApplicationCommandOptionType.User,
      required:false,
    
    
  }]
  
  
  
  ,
  enabled: true,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  enabled:true,
  category:["fun"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    try {
   const member = await interaction.options.getMember('target_slap')
   
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new Discord.MessageEmbed() // Prettier
     .setColor(config.embed.Color)
  
     .setImage(body.url);
    interaction.reply({embeds:[embed]});
   
  } catch (err) {
   interaction.reply({content:`Something went wrong... `});
  }}}