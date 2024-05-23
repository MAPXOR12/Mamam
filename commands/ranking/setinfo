const fs = require("fs");
const Discord = require("discord.js");


module.exports = {
  name: "setinfo",
  aliases: ["setinfo","info"],
  description: "C",
  usage: ["s"],
  category: ["Moderation"],
  enabled: false,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 5000,
  run: async (bot, message ,dev,prefix) => {
  
    let doc = await User.findOne({userID: message.author.id})

    
    
     if (!doc){
      doc = new User({ userID: message.author.id });
    };
    
    
    const [ name, ...args ] = message.content.slice(prefix.length)
  .split(/ +/)
  .filter(Boolean);

 
let bio = args.join(' ')
if(bio.includes("https://")) return message.channel.send({content:`The system detected advertising Change your bio text please`})
    if (!bio.length){
      return message.channel.send({content:`❎ **${message.author.tag}**, Please add the text for your bio (max 200 char.)`});
    } else if (bio.length > 200){
      return message.channel.send({content:`❎ **${message.author.tag}**, Bio text should not exceed 200 char.`});
    } else {
      doc.info = bio

      return doc.save()
      .then(() => message.channel.send({content:`✅ **${message.author.tag}**, your bio has been updated!`}))
      .catch(() => message.channel.send({content:`❎ **${message.author.tag}**, your bio update failed!`}))
    };
  
}
    
    
  }
