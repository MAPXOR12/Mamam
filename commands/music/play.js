let badges = require(`${process.cwd()}/struct/badge.json`)
const Discord = require ("discord.js")
module.exports = {
  name: "play",
  aliases: ["play"],
  description: "",
  usage: [""],
  category: ["owner"],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (bot, message, args, dev,prefix) => {
    
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
			} = message;
			const { guild } = member;
			const { channel } = member.voice;
			if (!channel) return message.reply({
				embeds: [
					new Discord.EmbedBuilder().setColor(config.embed.Color).setTitle(` **Please join ${guild.members.me.voice.channel ? "my" : "a"} VoiceChannel First!**`)
				],

			})
			if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new Discord.EmbedBuilder()
						.setColor(config.embed.Color)
					
						.setTitle(` **I am already connected somewhere else**`)
					],
				});
			}
			if (!args[1]) {
				return message.reply({
					embeds: [new Discord.EmbedBuilder()
						.setColor(config.embed.Color)
						
						.setTitle(` **Please add a Search Query!**`)
						.setDescription(`**Usage:** \`Boplay <Search/Link>\``)
					],
				});
			}
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = args.slice(1).join(" ") //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			try {
				let queue = distube.getQueue(guildId)
				let options = {
					member: member,
				}
        console.log(options,guildId,channelId);
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await distube.play(message.member.voice.channel, Text, {
      member: message.member,
      textChannel: message.channel,
      message}).catch(e => {
					console.log(e)
				})
			} catch (e) {
				
				message.reply({
					content: `${e}`,
			

				})
			}
		} catch (e) {
			console.log(e)
		}

    
  
}}