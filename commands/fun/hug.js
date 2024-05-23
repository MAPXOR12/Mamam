const Discord = require("discord.js")

const fetch = require("node-fetch")




module.exports = {
  name: "hug",
  aliases: ["hug"],
  enabled: true,		
  usage:["hug","hug @user"],
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args) => {

    try{
    const user = message.mentions.users.first() || message.author
    if (!user) {
     return message.reply({content: `❎ Please mention someone to hug!\n\n**Usage:** \`Bohug <user>\``,
      }
     );
    }
    if (user == message.author) {
     return message.reply({content: `❎ You can't hug yourself but... Ok, get the hug `
     });
    }
    if (user == bot.user) {
     return message.reply({content:`❎ Oh, you tried to hug me but u can't... Im not real... But I can hug you ＼( ^o^ )／`,
      
     });
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle");
    const body = await response.json();
    const embed = new Discord.EmbedBuilder() // Prettier
     
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription(user.toString() + " got a hug from " + message.author.toString())
     
     .setTimestamp()
     .setURL(body.url);
    message.channel.send({embeds:[embed]});
   } catch (err) {
    message.reply({content:`Something went wrong... `,
     
    });
    
  
  
  }}}
  
