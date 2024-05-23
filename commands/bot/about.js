const Discord = require("discord.js")

module.exports = {
  
name:"about",
  description:"some information about bot",
  aliases:["about","botinfo"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (bot,message) => {
    let data = await Guild.findOne({guildID: message.guild.id})
    if(!data) return;
    let embed = new Discord.EmbedBuilder()
        .setTitle(`${bot.user.username} Information`)
        .setDescription(`This bot has been created by **<@768944616724103170>**`)
        .setColor(config.embed.Color)
        .setThumbnail(bot.user.displayAvatarURL({format:"png"}))
.addFields({name:"Users", value:`${bot.guilds.cache.reduce((acc,guild)=> acc + guild.memberCount,0)}`},
           {name:"Ping", value:`${Math.round(bot.ws.ping)}`},
           {name:"Guilds", value:`${bot.guilds.cache.size}`})
           
await message.channel.send({embeds:[embed]})
    

  }}
