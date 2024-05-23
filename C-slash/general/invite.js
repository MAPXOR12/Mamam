const Discord = require("discord.js")

module.exports = {
  name:"invite",
  description:"give you my invite link",
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
let embed = new Discord.EmbedBuilder()
      .setColor(config.embed.Color)
      .setTitle("**Bobo Bot**  InviteLink!")
      .setURL(
        `https://boboworld.xyz/invite`
)
     

     await  interaction.reply({embeds:[embed]})
}catch{}

}}
  
  
