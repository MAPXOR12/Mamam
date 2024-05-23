
const Discord= require("discord.js");
///const { check_if_dj }  = require("../../handler/functions.js");

module.exports = {
  name: "stop",
  aliases: ["stop"],
  enabled: true,			    
  memberPermissions: [ "SendMessages"],			
  botPermissions: [ "SendMessages","EmbedLinks" ],		
  ownerOnly: false,			
  cooldown: 8000,
  prime:false,
  run: async (bot, message, args, dev) => {
	try {
			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = message;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
    console.log(guildId)
			if (!channel) return message.reply({
				embeds: [
					new Discord.EmbedBuilder().setColor(config.embed.Color).setTitle(`**Please join ${guild.members.me.voice.channel ? "my" : "a"} VoiceChannel First!**`)
				],

			})
			if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new Discord.EmbedBuilder()
						.setColor(config.embed.Color)
						
						.setTitle(`**Join my Voice Channel!**`)
						.setDescription(`<#${guild.members.me.voice.channel.id}>`)
					],
				});
			}
			try {
				let newQueue = distube.getQueue(guildId);
				if(!newQueue)
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return message.reply({
					embeds: [
						new Discord.EmbedBuilder().setColor(config.embed.Color).setTitle(`**I am nothing Playing right now!**`)
					],
				})
				/*if (check_if_dj(bot, member, guildId,newQueue.songs[0],guildId)) {
					return message.reply({
						embeds: [new Discord.EmbedBuilder()
							.setColor(config.embed.Color)
					 
							.setTitle(`**You are not a DJ and not the Song Requester!**`)
							.setDescription(`**DJ-ROLES:**\n> ${dj(bot, member, newQueue.songs[0]),guildId}`)
						],
					});
				}*/
				await newQueue.stop()
				//Reply with a Message
				message.reply({
					embeds: [new Discord.EmbedBuilder()
					  .setColor(config.embed.Color)
					  .setTitle(`**Stopped the Music!**`)
                                 ]
				})
				return
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `| Error: `,
					embeds: [
						new Discord.EmbedBuilder().setColor(config.embed.Color)
						.setDescription(`\`\`\`${e}\`\`\``)
					],

				})
			}
		} catch (e) {
			console.log(String(e))
}}}







