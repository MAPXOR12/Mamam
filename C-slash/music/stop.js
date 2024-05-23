let badges = require(`${process.cwd()}/struct/badge.json`)
const {EmbedBuilder,Discord }= require ("discord.js")
module.exports = {
  name: "stop",
description: "stop currently song",
options:[],
  category: ["music"],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (interaction, bot) => {
    
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
			} = interaction;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return interaction.reply({
				embeds: [
					new EmbedBuilder().setColor(config.embed.Color).setTitle(`**Please join ${guild.members.me.voice.channel ? "my" : "a"} VoiceChannel First!**`)
				],
				ephemeral: true
			})
			if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new EmbedBuilder()
						.setColor(config.embed.Color)
						
						.setTitle(`Join __my__ Voice Channel!`)
						.setDescription(`<#${guild.members.me.voice.channel.id}>`)
					],
					ephemeral: true
				});
			}
			try {
				let newQueue = distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) {
					await newQueue.stop()
					//Reply with a Message
					interaction.reply({
						embeds: [new EmbedBuilder()
						  .setColor(config.embed.Color)
						  .setTimestamp()
						  .setTitle(`⏹ **Stopped playing and left the Channel!**`)
						  ]
					})
				}
			/*	if (check_if_dj(client, member, newQueue.songs[0])) {
					return interaction.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x} **You are not a DJ and not the Song Requester!**`)
							.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
						ephemeral: true
					});
				}*/
				await newQueue.stop()
				//Reply with a Message
				interaction.reply({
					embeds: [new EmbedBuilder()
					  .setColor(config.embed.Color)
					  .setTimestamp()
					  .setTitle(`⏹ **Stopped playing and left the Channel!**`)
					
				]})
				return
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: `Error: `,
					embeds: [
						new MessageEmbed().setColor(config.embed.Color)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.log(e.message)
		}}}
		