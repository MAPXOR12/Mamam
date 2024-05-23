let badges = require(`${process.cwd()}/struct/badge.json`)

module.exports = {
  name: "addbadge",
  aliases: [""],
  description: "",
  usage: [""],
  category: ["owner"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (bot, message, args, dev,prefix) => {
    
  
///let data = await Guild.findOneAndUpdate({guildID: message.guild.id})
let user = await message.mentions.users.first() || await bot.users.cache.get(args[1])
if(!user) return message.channel.send({content:`please mention any one to give badge`})
    let data= await User.findOne({userID: user.id})
if(user){

  let id = args[2];
  if(!Number(id)) return message.channel.send({content:`Id required only number`})
  let badge = badges.find(x => x.id == id)
  
  const old = data.data.badgeinv.find(x=> x.id===badge.id)
  if(old){ return message.channel.send({content:`this user have badge`})
         }
  if(!old){
  data.data.badgeinv.push({
    id: badge.id,
    type: badge.type,
    link: badge.assets.link
  
  })
    data.save()
          return message.channel.send({content:` pushed to user`})
           
  
  
}}}}