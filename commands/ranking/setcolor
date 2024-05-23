const Discord = require("discord.js")
const profile = require(`${process.cwd()}/data/user.js`)

module.exports = {
  name: "setcolor",
  aliases: ["setcolor"],
  enabled: false,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 5000,
prime: true,
  run: async (bot, message, args, dev) => {

    
    
    let doc = await profile.findOne({userID: message.author.id})

  if (!doc){
      doc = new profile({ userID: message.author.id });
    };

    const hex = args[1]?.match(/[0-9a-f]{6}|default/i)?.[0];

    if (!hex){
      return message.channel.send({content:`❎ **${message.author.tag}**, please supply a valid HEX for the color. You may go to <https://www.google.com/search?q=color+picker> to get the desired hex. You may type \`default\` to revert the color to default.`});
    };

    doc.attch.color = hex === 'default' ? null : String('#' + hex);
     doc.money -= 1000
    return doc.save()
    .then(() => message.channel.send({content:`✅ **${message.author.tag}**, your profile color has been updated to **${hex}**! And paided $1000 for change color`}))
    .catch(() => message.channel.send({content:`❎ **${message.author.tag}**, your profile color update failed!`}));
  }}
