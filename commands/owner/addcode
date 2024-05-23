const Premium = require('../../data/prime');
const  Discord = require('discord.js');
const moment = require('moment');
var voucher_codes = require('voucher-code-generator');
module.exports = {
  name: "addcode",
  aliases: ["addcode"],
  category:["owner"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: true,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
    
    
const plans = ["month", "year"]

if(!args[1]) return message.channel.send({content:`Provide a Plan!\n${plans.join(" - ")}`})

if(!plans.includes(args[1])) return message.channel.send({content:`Provide a Plan!\n${plans.join(" - ")}`})

let expiresAt;

 
if(args[1] === "month"){

expiresAt = Date.now() + 2592000000;


} else if(args[1] === "year"){

expiresAt = Date.now() + (2592000000 * 12);

}


let amount = args[2];
if(!amount) amount = 1

const array = []
  for (var i = 0; i <  amount; i++) {

      const codePremium = voucher_codes.generate({
    pattern: "####-####-####",
});

const code = codePremium.toString().toUpperCase();


const find = await Prime.findOne({ 
  code: code 
  });

if(!find){

Prime.create({
  code: code,
  expiresAt: expiresAt,
  plan: args[1]
});

array.push(`\`${i + 1}-\` ${code}`)
}
  }

let embed =new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**Generated ${array.length} Premium Code(s)**\n\n${array.join("\n")}\n\n**Type:** ${args[1]}\n**Expires:** ${moment(expiresAt).format("dddd, MMMM Do YYYY")}`)
  message.channel.send({embeds: [embed]})
      
    }
}

          function match(msg, i) {
          if (!msg) return undefined;
          if (!i) return undefined;
          let user = i.members.cache.find(
            m =>
              m.user.username.toLowerCase().startsWith(msg) ||
              m.user.username.toLowerCase() === msg ||
              m.user.username.toLowerCase().includes(msg) ||
              m.displayName.toLowerCase().startsWith(msg) ||
              m.displayName.toLowerCase() === msg ||
              m.displayName.toLowerCase().includes(msg)
          );
          if (!user) return undefined;
          return user.user;
          }
