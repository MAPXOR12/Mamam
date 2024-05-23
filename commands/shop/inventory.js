const Discord = require("discord.js")


const _ = require('lodash');
const { MessageEmbed, GuildEmoji} = require('discord.js');
const profile = require('../../data/user');
const Pages = require('../../struct/Paginate');
const market = require('../../shop/market.json');


module.exports = {
  name: "inventory",
  aliases: ["inv"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
    let doc = await profile.findOne({userID: message.author.id})

    const pages = new Pages(_.chunk(doc.inventory, 25).map((chunk, i, o) => {
      return new MessageEmbed()
      .setColor('GREY')
      .setTitle(`${message.author.tag}'s Inventory`)
      .setDescription('[ WIP ]')
      .setFooter(`Market | \©️${new Date().getFullYear()} Bobo\u2000\u2000•\u2000\u2000Page ${i+1} of ${o.length}`)
      .addFields(...chunk.sort((A,B) => A.id - B.id ).map(d => {
        const item = market.find(x => x.id == d.id);
        return {
          inline: true,
          name: `\`[${item.id}]\` x${d.amount} ${item.name}`,
          value: [
            `Type: *${item.type}*`,
            `Selling Price: *${Math.floor(item.price * 0.7)}*`,
            `Use: \`${bot.prefix}use ${item.id}\``,
            `Sell: \`${bot.prefix}sell ${item.id} [amount]\``
          ].join('\n')
        }
      }));
    }));

    if (!pages.size){
      return message.channel.send({content:`❎ **${message.author.tag}**, your inventory is empty.`});
    };

    const msg = await message.channel.send({embeds:[pages.firstPage]});

    if (pages.size === 1){
      return;
    };

    const prev = bot.emojis.cache.get('767062237722050561') || '◀';
    const next = bot.emojis.cache.get('767062244034084865') || '▶';
    const terminate = bot.emojis.cache.get('767062250279927818') || '❌';

    const filter = (_, user) => user.id === message.author.id;
    const collector = msg.createReactionCollector({filter});
    const navigators = [ prev, next, terminate ];
    let timeout = setTimeout(()=> collector.stop(), 90000);

    for (let i = 0; i < navigators.length; i++) {
      await msg.react(navigators[i]);
    };

    collector.on('collect', async reaction => {

      switch(reaction.emoji.name){
        case prev instanceof GuildEmoji ? prev.name : prev:
          msg.edit({embeds:[pages.previous()]});
        break;
        case next instanceof GuildEmoji ? next.name : next:
          msg.edit({embeds:[pages.next()]});
        break;
        case terminate instanceof GuildEmoji ? terminate.name : terminate:
          collector.stop();
        break;
      };

      await reaction.users.remove(message.author.id);
      timeout.refresh();
    });

    collector.on('end', async () => await msg.reactions.removeAll());

  
    }}
