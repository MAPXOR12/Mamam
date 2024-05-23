const text = require('../../util/string');
const profile = require('../../data/user');
const market = require('../../shop/market.json');
const Discord = require("discord.js");
module.exports = {
  name: "unequip",
  aliases: ["unequip","unuse"],
  enabled: true,			
 description:["remove things you used before "],    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
    let doc = await profile.findOne({userID: message.author.id})
 if (!doc){
      doc = new profile({ userID: message.author.id });
    };
let type = args[1]
    const types = ['background','pattern','emblem','hat','wreath'];
    if (!types.includes(type)){
      return message.channel.send({content:`❎ **${message.author.tag}**, Please select one of the following: \`${types.join('`, `')}\``});
    };

    doc.attch[type] = null;

    return doc.save()
    .then(() => message.channel.send({content:`✅ **${message.author.tag}**, successfully unequipped **${type}!**`}))
    .catch(() => message.channel.send({content:`\`❎ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`}));
  }}
