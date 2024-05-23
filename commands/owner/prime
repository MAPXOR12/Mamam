
const moment = require("moment-timezone");
const parseInt = require("ms")
const day = require("dayjs")
module.exports = {
  name: "add-prime",
  aliases: ["prime"],
  enabled: false,			
  category:["owner"],
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES" ],		
  ownerOnly: true,			
  cooldown: 1000,
  prime: false,
  run: async (bot, message, args, dev) => {
    ///if (!args[1]) return message.reply(`Please specify a guild id`);
    ////if(!bot.guilds.cache.has(args[1]))
     // return message.reply(`Its an invalid guild's id`)
    if (args[1]==="time") {
      let data = await Prime.findOne({Guild: message.guild.id });
      if (data) {
        if (data.log==="enable") {
        let time = day(data.time);
       if(!data.time) return message.channel.send({content:`your srrver don't have prime bot `})   
// let time = new Date(data)
    ///  let Y = time.getFullYear(),
     //  M = time.getMonth(),
     //  D = time.getDate(),
   //    H = time.getHours(),
  //    m = time.getMinutes()

        
      message.channel.send({content:`prime bot in this server end in ${time}`})// ${Y}/${M}/${D} \`${H}:${M}\`
    
          } else {
            message.channel.send({content:"this server don't have a prime bot"}) 
          }
        }
      if (!data) {
          message.channel.send({content:"this server don't have a prime bot"})
        }
    } else
      
      if (args[1]=== "add") {
     if (!args[2]) return message.reply({content:`please specify guild id`})
       if(!bot.guilds.cache.has(args[2])) return message.reply({content:`your guild id is invalid`})
    // let time = parseInt(args[3]);
   //  let total = time * 86400000;    
    let time = day(args[3]).valueOf();;
        // let time2 = Date.now() + total ///+ 3600000;
      let data = await Prime.findOne({ Guild: args[2]});
      if (data) {
        data.time = 0;
        data.log = "enable";
        data.save()
      }
      if(!data) { Prime.create({
        Guild: args[2],
        time: time,
        log: "enable",
        Permanent: false
      }); } 
        let time0 = day(time)
///      let data = await Prime.findOne({ time: time2})
      ///let time0 = new Date(time2)
       //  let Y = time0.getFullYear(),
       //      M = time0.getMonth(),
      //       D = time0.getDate(),
       //      H = time0.getHours(),
      //       m = time0.getMinutes()
        
      message.channel.send({content:`prime bot in this server ${time0}`})// ${Y}/${M}/${D} \`${H}:${M}\` `)
      
      }else if (args[1]==="remove"){
      if (!args[2]) return message.reply({content:`pleade give me a guild id`})
        
        let data = await Prime.findOne({ Guild: args[2]})
      
        if(data) {
          //data.time = time0;
          data.log = "enable";
          data.delete()
        }
  message.channel.send({content:`prime bot on server removed`})
      }
  
  }
}
