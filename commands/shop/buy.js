const profile = require(`${process.cwd()}/data/user`)
const market = require(`${process.cwd()}/shop/market.json`);
const text = require(`${process.cwd()}/util/string`);
const Discord = require("discord.js")

module.exports = {
  name: "buy",
  aliases: ["buy"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args,  [ amt]) =>{
    
    let doc = await profile.findOne({userID: message.author.id})
    if (!doc){
      doc = new profile({userID: message.author.id });
    };

    const item = market.find(x => x.id == Number(args[1]));

    if (!item){
      return message.channel.send({content:`❎ **${message.author.tag}**, Could not find the item with id ${args[1]}!`});
    };

    amt = Math.floor(Math.abs(amt)) || 1;
    const total = item.price * amt;

    if (!item.price && amt > 1){
      return message.channel.send({content:`❎ **${message.author.tag}**, You may only have 1 free item at a time.`});
    } else if (doc.money < total){
      return message.channel.send({content:`❎ **${message.author.tag}**, You do not have enough credits to proceed with this transaction! You need ${text.commatize(total)} for **${amt}x ${item.name}**`});
    } else if (doc.inventory.find(x => x.id === item.id) && !item.price){
      return message.channel.send({content:`❎ **${message.author.tag}**, You may only have 1 free item at a time.`});
    } else {

      const old = doc.inventory.find(x => x.id === item.id);
      if (old){
        const inv = doc.inventory;
        let data = doc.inventory.splice(inv.findIndex(x => x.id === old.id),1)[0];
        data.amount = data.amount + amt;
        doc.inventory.push(data)
      } else {
        doc.inventory.push({
          id: item.id,
          amount: amt
        });
      };

      doc.money = doc.money - total;
      return doc.save()
      .then(() => message.channel.send({content:`✅ **${message.author.tag}**, successfully purchased **${amt}x ${item.name}!**`}))
      .catch(() => message.channel.send({content:`\`❎ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`}));
    };
  }}
