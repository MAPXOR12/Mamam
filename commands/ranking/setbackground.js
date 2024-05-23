const fs = require("fs");
const Discord = require("discord.js");


module.exports = {
  name: "setbackground",
  aliases: ["bg","background"],
  description: "Change the prefix of the bot",
  usage: ["s!prefix [Prefix]"],
  category: ["ranking"],
  enabled: true,            
  memberPermissions: [ "SendMessages" ],            
  botPermissions: [ "SendMessages", "EmbedLinks" ],        
  ownerOnly: false,            
  cooldown: 5000,
 prime: true,
  run: async (bot, message, args, dev, prefix) => {
   if(!args[0]) return message.channel.send({content:`${prefix}setbackground [upload you bg from your device]`})
 let data = await User.findOne({userID:message.author.id})
let user = message.author;
        let amount = 2000;
        let bal = data.money

        let newBg = message.attachments.first()
        let fetchBg = data.attch.background
        if (!newBg) {
            if (fetchBg) {
                return message.channel.send({content:`🤨 **Profile Background Already Set As - \`${fetchBg}\`**`})
            } else {
                return message.channel.send({content:"❎ **You Need To Upload The Image To Set New Background!**"})
            }
        }

        if (bal < amount) return message.channel.send({content:`❎ **You Do Not Have Sufficient Money!\nPrice To Change Background - $${amount}**`})
    if (data) {
        data.attch.background = newBg.url
       data.money -= amount
        data.save()
      }
      if(!data) { User.create({
        background:newBg.url,
        
      }); }     

      message.channel.send({content:`✅ Your Background Image Has Been Set**\`${amount}\` Has Been Deducted And Profile Background Has Been Set\nLink - ${newBg.url} !**To Check Background Type ${prefix}profile`})
      //return message.channel.send({embeds:[embed]})
  }}
