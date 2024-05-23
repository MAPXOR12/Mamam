
const { Discord, MessageEmbed} = require("discord.js")


const { WebhookClient } = require('discord.js');

const data = {
    id: config.webhook.id,
    token: config.webhook.token,
}

const webhookClient = new WebhookClient(data);




module.exports = {
  name: "unblacklist",
  aliases: ["unblacklist","unblack"],
  enabled: true,			    
  category:["owner"],
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  ownerOnly: true,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
  
  const match = message.content.match(/\d{18}/);
      let member;
      try {
member =  match ? message.mentions.members.first() || message.guild.members.fetch(args[3]) : null;
      } catch {
        return message.channel.send({content:`Provide me with a user`})
      }
   
      let guild = bot.guilds.cache.get(args[2]);
      let reason = args.slice(2).join(' ') || 'Not Specified';

      if (args.length < 1) return message.channel.send({content:`Please provide me with a user or guild blacklist`})
      if (args.length < 2) return message.channel.send({content:`Provide me with a user`})
 
   


      if(!member) return message.channel.send({content:`Provide me with a valid user`})

      if (args[1] === 'user') {
        let user = await  Black.findOne({
          userID: member.id,
        })
          if (user) {
          
            user.deleteOne()
          }
        

       

        message.channel.send({content: `User added to the blacklist! ${member.user.tag}`,
        
        })
        member.send({content:`You have been removed from blacklist by **${message.author.username}**`})

        const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle(`unBlacklist Report`)
          .addField('Status', 'removed from blacklist.')
          .addField('User', `${member.user.tag} (${member.id})`)
          .addField('reason',reason)
          

        return webhookClient.send({
          embeds: [embed]
        });
      }


// guild blacklist
      if (args[1] === 'guild') {
        let server = await Black.findOne({
          Guild: guild,
        })
          if (server) {
            ///const blacklist = new Black({ Guild: guild.id, length: null, type: 'guild', isBlacklisted: true, reason })
            server.deleteOne()
          }
        
        

        message.channel.send({content:`Server removed blacklist! `,
          
        });
const owner = guild.fetchOwner().then(owner=>{
  owner.send({content:`Your server removed from black list by **${message.author.username}**`})
})  
  const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle(`unBlacklist Report`)
          .addField('Status', 'removed from blacklist.')
          .addField('Server', ` (${guild.name}) ${guild.id}`)
          .addField('reason', reason)
          

        return webhookClient.send({embeds: [embed]});
      }
    }
  
  
  
}
