const {EmbedBuilder,Discord }= require ("discord.js")

module.exports = {
  name: "addrelated",
description: "Add a similar/related song to the current Song!",
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
					new EmbedBuilder().setColor(config.embed.Color).setTitle(` **Please join ${guild.members.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
				],
				ephemeral: true
			})
			if (channel.userLimit != 0 && channel.full)
				return interaction.reply({
					embeds: [new EmbedBuilder()
						.setColor(config.embed.Color)
			
						.setTitle(`Your Voice Channel is full, I can't join!`)
					],
					ephemeral: true
				});
			if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new EmbedBuilder()
						.setColor(config.embed.Color)
					
						.setTitle(`I am already connected somewhere else`)
					],
					ephemeral: true
				});
			}
			try {
				let newQueue = distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.reply({
					embeds: [
						new EmbedBuilder().setColor(config.embed.Color).setTitle(` **I am nothing Playing right now!**`)
					],
					ephemeral: true
				})
				//update it without a response!
				await interaction.reply({
					content: `🔍 Searching Related Song for... **${newQueue.songs[0].name}**`,
					ephemeral: true
				});
				await newQueue.addRelatedSong();
				await interaction.editReply({
					content: `👍 Added: **${newQueue.songs[newQueue.songs.length - 1].name}**`,
					ephemeral: true
				});
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: ` Error: `,
					embeds: [
						new EmbedBuilder().setColor(config.embed.Color)
						.setDescription(`\`\`\`${e}\`\`\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.log(e.message)
		}
    
  }}