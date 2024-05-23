const Discord = require('discord.js');
module.exports = {
    name: "kick",
    aliases: ["kick"],
    description: "kick",
    usage: ["kick [@User]"],
    category: "moderation",
    enabled: true,
    memberPermissions: ["KickMembers","SendMessages"],
    botPermissions: ["SendMessages", "EmbedLinks", "KickMembers"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev) => {
    
      
      try{
     let user = await message.mentions.members.first() || await message.guild.members.fetch(args[1])
     
      let reason = args.slice(2).join(" ");
    
      const member = await message.guild.members.fetch(user.id).catch(() => {});
if(member){
    
  
    const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerId !== message.author.id && !(moderationPosition > memberPosition)){
				return message.channel.send({content:`You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `})
			}
			if(!member.kickable) {
				return message.channel.send({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
	
      await user.send(`**${message.author.tag}**kicked you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.kick(`${reason || ' unspecified'}`)
    .then(_member => message.channel.send(`Successfully Kicked **${_member.user.tag}**`))
    .catch((err) => message.channel.send(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));



  


    
    
    }
    
  }catch(err){ 
    return message.channel.send({content:`I can't kick this user please check my permission or other issues `})}
}}
