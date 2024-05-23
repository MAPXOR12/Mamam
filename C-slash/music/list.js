const {EmbedBuilder,Discord }= require ("discord.js")
const {	SelectMenuBuilder,
	ActionRowBuilder
} = require("discord.js");
module.exports = {
  name: "list",
description: "Lists the current Queue",
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
					new EmbedBuilder().setColor(config.embed.Color).setTitle(`**Please join ${guild.members.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
				],
				ephemeral: true
			})
			if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new 
						EmbedBuilder().setColor(config.embed.Color)
						
						.setTitle(` Join __my__ Voice Channel!`)
						.setDescription(`<#${guild.members.me.voice.channel.id}>`)
					],
					ephemeral: true
				});
			}
			try {
				let newQueue = distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.reply({
					embeds: [
						new EmbedBuilder().setColor(config.embed.Color)
            .setTitle(` **I am nothing Playing right now!**`)
					],
					ephemeral: true
				})
				let embeds = [];
				let k = 10;
				let theSongs = newQueue.songs;
				//defining each Pages
				for (let i = 0; i < theSongs.length; i += 10) {
					let qus = theSongs;
					const current = qus.slice(i, k)
					let j = i;
					const info = current.map((track) => `**${j++} -** [\`${String(track.name).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 60)}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
					const embed = new 
						EmbedBuilder().setColor(config.embed.Color)
						.setDescription(`${info}`)
					if (i < 10) {
						embed.setTitle(`📑 **Top ${theSongs.length > 50 ? 50 : theSongs.length} | Queue of ${guild.name}**`)
						embed.setDescription(`**(0) Current Song:**\n> [\`${theSongs[0].name.replace(/\[/igu, "{").replace(/\]/igu, "}")}\`](${theSongs[0].url})\n\n${info}`)
					}
					embeds.push(embed);
					k += 10; //Raise k to 10
				}
				embeds[embeds.length - 1] = embeds[embeds.length - 1]
					
				let pages = []
				for (let i = 0; i < embeds.length; i += 3) {
					pages.push(embeds.slice(i, i + 3));
				}
				pages = pages.slice(0, 24)
				const Menu = new SelectMenuBuilder()
					.setCustomId("QUEUEPAGES")
					.setPlaceholder("Select a Page")
					.addOptions(
						pages.map((page, index) => {
							let Obj = {};
							Obj.label = `Page ${index}`
							Obj.value = `${index}`;
							Obj.description = `Shows the ${index}/${pages.length - 1} Page!`
							return Obj;
						})
					)
				const row = new ActionRowBuilder().addComponents([Menu])
				interaction.reply({
					embeds: [embeds[0]],
					components: [row],
					ephemeral: true
				});
				//Event
				bot.on('interactionCreate', (i) => {
					if (!i.isSelectMenu()) return;
					if (i.customId === "QUEUEPAGES" && i.applicationId == bot.user.id) {
						i.reply({
							embeds: pages[Number(i.values[0])],
							ephemeral: true
						}).catch(e => {})
					}
				});
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				interaction.editReply({
					content: `Error: `,
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
	}
}