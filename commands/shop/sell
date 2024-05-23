
const profile = require(`${process.cwd()}/data/user.js`);
const market = require(`${process.cwd()}/shop/market.json`);
const text = require(`${process.cwd()}/util/string`);

const Discord = require("discord.js");
module.exports = {
  name: "sell",
  aliases: ["sell"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args,[id, amt], prefix ) =>{

    
    let doc = await profile.findOne({userID: message.author.id})
    
    if (!doc){
      doc = new profile({ userID: message.author.id });
    };

    const item = market.find(x => x.id == args[1]);

    if (!item){
      return message.channel.send({content:`❎ **${message.author.tag}**, Could not find the item with id ${id}!`});
    };

    amt = Math.floor(Math.abs(amt)) || 1;
    const total = item.price * 0.7 * amt;
    const itemcount = doc.inventory.find(x => x.id === item.id)?.amount;

    if (!itemcount || itemcount < amt){
      return message.channel.send({content:`❎ **${message.author.tag}**, You do not have the necessary amount of **${item.name}** to sell.`});
    } else if (!item.price){
      return message.channel.send({content:`❎ **${message.author.tag}**, Unable to sell ${item.name}.`});
    } else if (doc.money === null){
      return message.channel.send({content:`❎ **${message.author.tag}**, You cannot sell items befor you create a money database  please type ${prefix}daily.`})
    } else {

      const inv = doc.inventory;
      const old = inv.find(x => x.id === item.id);
      let data = doc.inventory.splice(inv.findIndex(x => x.id === old.id),1)[0];
      data.amount = data.amount - amt;

      if (data.amount > 0){
        doc.inventory.push(data);
      } else if (item.assets.link === doc.data[item.type]) {
        doc.data[item.type] = null;
      } else {
        // Do nothing...
      };

      doc.money = doc.money + total;
      return doc.save()
      .then(() => message.channel.send({content:`✅ **${message.author.tag}**, successfully sold **${amt}x ${item.name}** for **${text.commatize(total)}**`}))
      .catch(() => message.channel.send({content:`\`❎ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`}));
    };
  
}}
