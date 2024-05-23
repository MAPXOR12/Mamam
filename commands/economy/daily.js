const ms = require('ms');
const fs = require("fs");
const pretty = require("pretty-ms")
const Discord = require("discord.js");
module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "To get your daily", 
  usage: ["daily"], 
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown:0,
  run: async (client, message, args, dev,dev2) => {
    message.reply({content:`tranafer to https://boboworld.tk/daily`});
    /*
  let cooldown = 0//43200000;
      let data = await User.findOne({ userID: message.author.id });
      if(data.time !== null && cooldown - (Date.now() - data.time) > 0) return message.reply({content:` You need wait ${ms(cooldown - (Date.now() - data.time))} to daily again`})

      let DR = Math.floor(Math.random() * 2000) + 1000
      
      message.channel.send({content:`**${message.author.username}** you get 💰$\`${DR}\` credits`})
      
    
    await User.updateOne({
      userID: message.author.id},
                         
                         {
      $set:{
      time: Date.now()
      }},)
    await User.updateOne({
      userID: message.author.id},
                         {
      $inc:{
        money: DR
      }})*/
    
    
  }};
