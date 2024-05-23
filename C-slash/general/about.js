const Discord = require("discord.js")


module.exports = {
  
name:"botinfo",
  description:"information about bot",
  options:[],
  enabled: true,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  enabled:false,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    try{
    let embed = new Discord.EmbedBuilder()
        .setTitle(`${bot.user.username} Information`)
        .setDescription(`info`)
        .setColor(config.embed.Color)
        .setThumbnail(bot.user.displayAvatarURL())
    .addFields({name:`**users**:`,value:`${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) }`, inline:true})
        .addFields({name:`**Bot Name:**`, value:`${bot.user.tag}`, inline:true})
        .addFields({name:`**Bot ID**`, value:`${bot.user.id}`, inline:true})
        .addFields({name:`**Bot Prefix**`,value: `${data.guild.prefix}`, inline:true})
        .addFields({name:`**Discord.js Version**`, value:`${Discord.version}`, inline:true})
        .addFields({name:`**Ping**`,value: `${Math.round(bot.ws.ping)}ms`, inline:true})
        .addFields({name:`**Guilds**`,value: `${bot.guilds.cache.size}`, inline:true})
interaction.reply({embeds:[embed]})
    } catch (e) {console.log(e.message)}

  }}
