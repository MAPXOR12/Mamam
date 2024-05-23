const fs = require("fs");
const Discord = require("discord.js");

const fetch = require("node-fetch")
module.exports = {
  name: "slap",
  aliases: ["slap"],
  description: "slap someone",
  usage: ["slap","slap @user"],
  category: ["slap"],
  enabled: true,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 5000,
  run: async (bot, message, args, dev, data) => {
try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return message.reply({content:`❎ Pleasr mention someone to slap!\n\n**Usage:** \`Boslap <user>\``
    });
   }
   if (message.author === member || message.member == member) {
    return await message.reply({content: `❎ You cant slap yourself!`
    });
   }
   
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    const embed = await new Discord.EmbedBuilder() // Prettier
     .setColor(config.embed.Color)
  
     .setImage(body.url);
    message.channel.send({embeds:[embed]});
   
  } catch (err) {
   message.reply({content:`Something went wrong... `});
  }}}
