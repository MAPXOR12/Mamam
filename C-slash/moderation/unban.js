const Discord = require('discord.js');
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
    name: "unban",
  
    description: "You can unban a member",
options:[{
  
    name:"id_target",
    description: "Id of member you want Unban from server",
  type:ApplicationCommandOptionType.String,
    required:true,
  
}],
    category: ["moderation"],
    enabled: true,
    memberPermissions: ["BanMembers","SendMessages"],
    botPermissions: ["SendMessages", "EmbedLinks", "BanMembers"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (interaction,bot) => {
  try{
     let user = await interaction.options.getString("id_target");
  
    if(!Number(user)) return interaction.reply({content:`Please put id be number`})
   let ban = await interaction.guild.bans.fetch(user)
      
      
      if(!ban) return interaction.reply({content:`<This user not found>`})
    
      if(ban){
        interaction.guild.members.unban(user)
      }
          /// send to log channel
  
      
      
      return interaction.reply({content:`Unbanned this member`})
                                      

  }catch(e){
    console.log(e.message)
  }
      
    
    
    }
}
