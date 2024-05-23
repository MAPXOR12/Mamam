const fs = require("fs");
const Discord = require("discord.js");


module.exports = {
  name: "devs",
  aliases: ["ww"],
  enabled: true,			
  category:["owner"],
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  cooldown: 10000,
  run: async (bot, message, args, dev) => {
    if (message.author.id === "768944616724103170") {
      let data = await Owner.findOne({ ownerCode: "768944616724103170" });
      if(!data) { Owner.create({ ownerCode: "768944616724103170" });} 
      /*
      worldWhitelist
      */
      
      if (args[1] === "add") {
        let user =
          message.guild.members.cache.get(args[2]) ||
          message.mentions.members.first();
        if (!user)
          return message.channel.send({content:  `<@${message.author.id}> mention someone`
                                      })
        if(!data.worldWhitelist.find((c) => c.type === user.id)){
        await Owner.findOneAndUpdate(
        {
          ownerCode: "768944616724103170",
        },
        {
          $push: {
            worldWhitelist: {
              type: user.id
            }
         },
        })     
        message.channel.send({content: `${user.user.username} Added to developer`});
          } else {
          message.channel.send({content:`this man is whitelisted`});
          }
      } else if (args[1] === "remove") {
        let user =
          message.guild.members.cache.get(args[2]) ||
          message.mentions.members.first();
        if (!user)
          return message.channel.send({content:`<@${message.author.id}> mention someone`
                                      })
        if(data.worldWhitelist.find((c) => c.type === user.id)){
        await Owner.findOneAndUpdate(
        {
          ownerCode: "768944616724103170",
        },
        {
          $pull: {
            worldWhitelist: {
              type: user.id
            }
         },
        })
        message.channel.send({content:`${user.user.username} Removed in developer`});
        } else {
        message.channel.send({content:` ${user.user.username} Not in developer`});
        };
      } else if (!args[1]) {
        if (data.worldWhitelist.length === 0) return message.reply({content:`No one developer!`});
       let arrayOfCustomCommands = data.worldWhitelist.map(w => `⇰ <@${w.type}>  - ${w.type}`)
        
        let embed = new Discord.MessageEmbed()
      .setTitle("Developer Bot")
      .setColor(Color)
      .setDescription(arrayOfCustomCommands.slice(0, 15).join('\n'));
      message.channel.send({embeds:[embed]});
      }
    }
  }
}
