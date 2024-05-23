const Discord = require("discord.js")
const { ButtonStyle } = require('discord.js');


module.exports = {
  name: "invite",
  aliases: ["invites","inv","invite"],
  description:"invite link of bot",
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev) => {
    const row = new Discord.ActionRowBuilder()
			.addComponents(
        new Discord.ButtonBuilder()
					
					.setLabel('invite')
          .setURL('https://bobowolrd.tk/support')
					.setStyle(ButtonStyle.Link),
			);
        
				// ...
			

		const embed2 = new Discord.EmbedBuilder()
			.setColor('#0099ff')
		
			.setURL('https://boboworld.tk/invite')
			.setDescription('Invite bot by clicking the button');

  
    
    
      
      message.channel.send({embeds:[embed2], components: [row]}).catch(err=>{
      message.author.send({embeds:[embed2],components: [row]})
      })
  }
}
