const Discord = require("discord.js")

const fetch = require("node-fetch")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {

  name:"hug",
  description:"hug yourself if you single or your love",
  options:[{
    
      name:'target',
      description:'target user',
      required:false,
type:ApplicationCommandOptionType.User,
    
    
  }],
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
    const member = await interaction.options.getMember('target')

    
    if (member == bot.user) {
     return interaction.reply({content:`❎ Oh, you tried to hug me but u can't... Im not real... But I can hug you ＼( ^o^ )／`,
      
     });
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new Discord.EmbedBuilder() // Prettier
     
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
    .setDescription(`${member.user.tag} Got hug`)
     
     .setTimestamp()
     .setURL(body.url);
  interaction.reply({embeds:[embed]});
   } catch (err) {
    interaction.reply({content:`Something went wrong... `,
     
    });
   }}}