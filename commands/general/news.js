const Discord = require("discord.js")

const moment = require("moment")
moment.suppressDeprecationWarnings = true;
const Guild = require('../../data/news.js')


module.exports = {
  name: "news",
  description:"All last news here ",
  aliases: ["news"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {


const guild= await Guild.findOne({
        tag: '768944616724103170'
      });
      
let embed = new Discord.EmbedBuilder()
      .setColor(message.guild.members.me.displayHexColor)
      .setTitle(`Bobo News`)
    .setDescription(`***__Date Published__ ${moment(guild.time).format("dddd, MMMM Do YYYY")}*** \n**__[\`${moment(guild.time).fromNow()}\`]__**\n\n ${guild.news}`)
  
      .setFooter('Bobot Teams')
      .setTimestamp();

      message.channel.send({embeds:[embed]}).catch(() => {
        message.channel.send({content:`Dont have any new news`})
      });
    
    }}
