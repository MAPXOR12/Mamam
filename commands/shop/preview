const market = require(`../../shop/market`);
const text = require(`${process.cwd()}/util/string`);
const Discord = require("discord.js")

module.exports = {
  name: "preview",
  aliases: ["preview","pv"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message,args ) => {
  
if (!args[1]){
      return message.channel.send({content:`❎ **${message.author.tag}**,Please specify the id!`});
    };
 
    let selected =  market.find( x => x.id == args[1])
  

    if (!selected){
      return message.channel.send({content:`❎ **${message.author.tag}**, Could not find the item with that id!`});
    };
     
    return message.channel.send({content:`name: **${selected.name}**, type: **${selected.type}**, price: **${text.commatize(selected.price)}**`, files: [selected.assets.link]
    })
  }
};
