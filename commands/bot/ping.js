const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ['pong'],
  description:"Speed of bot",
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 3000,
  run: async (bot, message, args, dev) => {

    
   let date = Date.now();
        let ping_db = await new Promise((r, j) => {
            require('mongoose').connection.db.admin().ping((err, result) => (err || !result) ? j(err || result) : r(Date.now() - date))
        });

        date = Date.now();

        let pong = new Discord.EmbedBuilder()
            .setColor("RED")
            .setDescription('Pong?')

        return message.channel.send({ embeds:[pong] })
            .then(msg => {

                let embed = new Discord.EmbedBuilder()
                    .setDescription(`🏓 Bot: ${bot.ws.ping}ms \n📡 Discord API: ${Date.now() - date}ms \n🗃️ DB: ${ping_db}ms`)
                    .setColor("RED")

                return msg.edit({ embeds: [embed] })

            })
    }
}
