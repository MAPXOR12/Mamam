const Discord = require("discord.js")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name:"kick",
  description:" kick is a moderation command to kick someone",
  options:[{
  
    name:"target_user",
    description:"target someone to kick",
    type:ApplicationCommandOptionType.User,
    required:true,
  },{
  
      
      name:"reason",
      description:'pick reason for kick',
    type:ApplicationCommandOptionType.String,
      required:true,
      
    
    
    
    
  }],

  enabled: true,			   
  memberPermissions: [ "SendMessages","KickMembers" ],			
  botPermissions: [ "SendMessages", "EmbedLinks","KickMembers" ],		
  enabled:true,
  category:["moderation"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data,channelEmbed) => {
try{
    let user = await interaction.options.getUser("target_user");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(() => {console.log('error')});

  
  
    //// let member = await interaction.options.getMember('target_user')
     
     
      let reason = await interaction.options.getString('reason');
      
if(member){
    
  
    const memberPosition = member.roles.highest.position;
			const moderationPosition = interaction.member.roles.highest.position;
			if(interaction.ownerId !== interaction.user.id && !(moderationPosition > memberPosition)){
				return interaction.followUp({content:`You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `})
			}
			if(!member.kickable) {
				return interaction.reply({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
		//////
        
      await member.send(`**${interaction.user.tag}**kicked you from ${interaction.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return member.kick( ` ${reason || 'Unspecified'}`)
    .then(_member => interaction.reply(`Successfully Kicked **${user.user.tag}**`))
    .catch((err) => interaction.editReply(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));

}
}catch(e){console.log(e.message)
}
    
    }
}
