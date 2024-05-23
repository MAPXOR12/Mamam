
const Discord = require("discord.js")
const moment= require ("moment")
moment.suppressDeprecationWarnings = true;
const news =require(`../../data/news.js`);

module.exports = {
name:"news",
description:"all news about me",
  options:[],
  enabled: false,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction) => {

let data = await News.findOne({tag:"768944616724103170"})
try{

      
let embed = new Discord.EmbedBuilder()
      .setColor(config.embed.Color)
      .setTitle(`Bobo News`)
    .setDescription(`***__Date Published__ ${moment(data.news.time).format("dddd, MMMM Do YYYY")}*** \n**__[\`${moment(data.news.time).fromNow()}\`]__**\n\n ${data.news.news}`)
  
      .setFooter('Bobot Teams')
      .setTimestamp();
    await interaction.reply({embeds:[embed]});
    
  }catch(e){console.log(e.message)
      } 
    
    
  }}
