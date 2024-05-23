const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.json`)
module.exports = class {

	
	async run (guild,bot, message) {
    try{
const data = await Guild.findOne({guildID:guild.id});
    
   const channel = await bot.guilds.cache.get(config.serverid).channels.cache.get(config.channels.join);
    const embed = new Discord.EmbedBuilder()
    .setAuthor({name: guild.name})
    .setDescription("**left Guild**")
   .addFields({ name: "GUILD MEMBER COUNT", value: `${guild.memberCount}`,inline:true},
              {name: "Guild Name", value:`${guild.name}`, inline:true},
               {name: "GUILD OWENR NAME", value:`${guild.owner.tag}`, inline:true},
              )
     setTimeout(async()=>{
    await channel.send({embeds:[embed]})
       if(data){ data.delete()}
     },2000)
	}catch{}}}
