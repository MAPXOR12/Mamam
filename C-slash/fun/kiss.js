const Discord = require("discord.js")
const fetch = require("node-fetch")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  
  name:"kiss",
  description:" 💋 kiss",
  options:[{
    
      name:'kiss_target',
      description:"mention someone",
type:ApplicationCommandOptionType.User,

      required:false,
      
    
    
    
  }],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
        try{
const user = await interaction.options.getMember('kiss_target')
  

  
    const response = await fetch("https://nekos.life/api/v2/img/kiss");
    const body = await response.json();
   const embed = new Discord.EmbedBuilder() // Prettier
     
     .setDescription("So sweeet 😘")
     .setImage(body.url)
     .setColor(config.embed.Color)
    
     .setTimestamp()
     .setURL(body.url)
    interaction.reply({embeds:[embed]});
    }catch (err) {
     console.log(err)
    interaction.reply({content: `Something went wrong...`
                   
     })
    }}}