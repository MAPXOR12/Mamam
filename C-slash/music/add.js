const {EmbedBuilder,Discord }= require ("discord.js")
const FiltersSettings = require("../../helpers/filters.json");
const {  ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "addfilter",
description:"Add a Filter to the Filters",
options:[{
			
				name: "filters",
				description: "Add all filters with a space between, to add!",
  type:ApplicationCommandOptionType.String,
				required: true
    }],
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
					embeds: [new EmbedBuilder().setColor(config.embed.Color)
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
						new EmbedBuilder().setColor(config.embed.Color).setTitle(` **I am nothing Playing right now!**`)
					],
					ephemeral: true
				})
			/*	if (check_if_dj(client, member, newQueue.songs[0])) {
					return interaction.reply({
						embeds: [new MessageEmbed()
							.setColor(ee.wrongcolor)
							.setFooter(ee.footertext, ee.footericon)
							.setTitle(`${client.allEmojis.x}**You are not a DJ and not the Song Requester!**`)
							.setDescription(`**DJ-ROLES:**\n> ${check_if_dj(client, member, newQueue.songs[0])}`)
						],
						ephemeral: true
					});
				}*/
				let filters = options.getString("filters").toLowerCase().split(" ");
				if (!filters) filters = [options.getString("filters").toLowerCase()]
				if (filters.some(a => !FiltersSettings[a])) {
					return interaction.reply({
						embeds: [ new
							EmbedBuilder().setColor(config.embed.Color)
							.setTitle(`**You added at least one Filter, which is invalid!**`)
							.setDescription("**To define Multiple Filters add a SPACE (` `) in between!**")
							.addFields({name:"**All Valid Filters:**", value:Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ") + "\n\n**Note:**\n> *All filters, starting with custom are having there own Command, please use them to define what custom amount u want!*"})
						],
					})
				}
				let toAdded = [];
				//add new filters
				filters.forEach((f) => {
					if (!newQueue.filters.includes(f)) {
						toAdded.push(f)
					}
				})
				if (!toAdded || toAdded.length == 0) {
					return interaction.reply({
						embeds: [
							new EmbedBuilder().setColor(config.embed.Color)
							.setTitle(` **You did not add a Filter, which is not in the Filters yet.**`)
							.addFields({name:"**All __current__ Filters:**", value:newQueue.filters.map(f => `\`${f}\``).join(", ")})
						],
					})
				}
				await newQueue.setFilter(toAdded);
				interaction.reply({
					embeds: [new EmbedBuilder().setColor(config.embed.Color)
					  .setTimestamp()
					  .setTitle(`♨️ **Added ${toAdded.length} ${toAdded.length == filters.length ? "Filters": `of ${filters.length} Filters! The Rest was already a part of the Filters!`}**`)
					  ]
					})

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