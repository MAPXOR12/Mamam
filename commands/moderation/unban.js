const Discord = require('discord.js');
module.exports = {
    name: "unban",
    aliases: ["unband","unban"],
    description: "You can unban a member, or multiple members using this command",
    usage: ["ban [@User]"],
    category: ["moderation"],
    enabled: true,
    memberPermissions: ["BanMembers","SendMessages"],
    botPermissions: ["SendMessages", "EmbedLinks", "BanMembers"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev,data) => {
  try{
     let user = args[1]
    if(!Number(user)) return message.channel.send({content:`Please put id be number`})
   let ban = message.guild.bans.fetch(user)
      
      
      if(!ban) return message.channel.send({content:`<This user not found>`})
    
      if(ban){
        message.guild.members.unban(args[1])
      }
          /// send to log channel
  
      
      
      return message.channel.send({content:`Unbanned this user`})
                                      

  }catch(err){
    return message.channel.send({content:` something wrong`})
  }
      
    
    
    }
}
