const fs = require("fs");
const Discord = require("discord.js");

const progressbar = require("percentagebar");

module.exports = {
  name: "ship",
  aliases: ["ship"],
  description: "ship people ",
  usage: ["ship","ship @user"],
  category: ["Fun"],
  enabled: true,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 5000,
  run: async (bot, message, args, dev, data,client) => {
try{
   const user1 =await  message.mentions.users.first() || await message.guild.members.cache.get(args[1]) || message.author
                                                                                                                                                                                    
   if (!user1) {
    return message.reply({content: `❎ Please mention a first user to ship!\n\n**Usage:** \`Boship <user> <user>\``
    });
   }
  let author = message.author
   
   const ship = Math.floor(Math.random() * 100) + 1;
   const bar = progressbar(100, ship, 10);
   const mehh = new Discord.EmbedBuilder() // Prettier
    
    .setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1")
    .setDescription(`I shipped ${author} with **${user1}** and it is **${ship}%**\n${bar}`)
    
    .setColor(config.embed.Color);
   const love = new Discord.MessageEmbed() // Prettier
  
    .setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1")
    .setDescription(`I shipped ${author} with **${user1}**  and it is **${ship}%**\n${bar}`)
  
    .setColor(config.embed.Color);
   if (ship > 50) {
    message.channel.send({embeds:[love]});
   } else{
    message.channel.send({embeds:[mehh]});
   }
  } catch (err) {
   message.reply({content:`Something went wrong...`
   });
  }}}
