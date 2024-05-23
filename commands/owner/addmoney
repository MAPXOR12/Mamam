
const { MessageEmbed } = require("discord.js");
const dev = ["768944616724103170"]
const Discord = require("discord.js")

module.exports = {
  name: "addmoney",
  aliases: ["addmoney","adm"],
  enabled: true,			    
  category:["owner"],
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: true,			
  cooldown: 5000,
  run: async (bot, message, args) => {

      
        if (!args[0]) return message.channel.send({content:"**Please Enter A User!**"})
 
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[1].toLocaleLowerCase());
       if(!user) return message.channel.send({content:` mention user `})
    let member =  await User.findOne({userID: user.id})
    if (!user) return message.channel.send({content:"**Enter A Valid User!**"})
        if (!args[1]) return message.channel.send("**Please Enter A Amount!**")
        if (isNaN(args[1])) return message.channel.send({content:`x Your Amount Is Not A Number!`});
        if (args[1] > 5000000) return message.channel.send({content:"**Cannot Add That Much Amount!**"})
        member.money += args[1]
    member.save()
        let bal = member.money

        message.channel.send({content:`:white_check_mark: Added ${args[1]} coins\n\nNew Balance: \`$${bal}\``});
        

    }
}
