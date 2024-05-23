let badges = require(`${process.cwd()}/struct/badge.json`)
const Discord = require ("discord.js")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "play",
description: "play your favorite songs",
options:[
{

  name:"searching",
  description:" Searching songs",
  type:ApplicationCommandOptionType.String,
  required:true,
 
},

  
],
  category: ["music"],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (interaction, bot) => {
    
  		try {
			//console.log(interaction, StringOption)

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
					new EmbedBuilder().setColor(config.embed.Color).setTitle(`**Please join ${guild.members.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
				],
				ephemeral: true
			})
			if (channel.userLimit != 0 && channel.full)
				return interaction.reply({
					embeds: [new EmbedBuilder()
						.setColor(config.embed.Color)
						
						.setTitle(`<:declined:780403017160982538> Your Voice Channel is full, I can't join!`)
					],
					ephemeral: true
				});
			if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new EmbedBuilder()
						.setColor(config.embed.Color)
						
						.setTitle(`<:declined:780403017160982538> I am already connected somewhere else`)
					],
					ephemeral: true
				});
			}
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = options.getString("searching"); //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			await interaction.reply({
				content: `🔍 Searching... \`\`\`${Text}\`\`\``,
				ephemeral: true
			});
			try {
				let queue = distube.getQueue(guildId)
				let options = {
					member: member,
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await distube.play(channel, Text, options)
				//Edit the reply
				interaction.editReply({
					content: `${queue?.songs?.length > 0 ? "👍 Added" : "🎶 Now Playing"}: \`\`\`css\n${Text}\n\`\`\``,
					ephemeral: true
				});
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