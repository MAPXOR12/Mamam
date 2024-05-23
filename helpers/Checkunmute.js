const Discord = require("discord.js");

/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	async init(bot){
await Mute.find({ "mute.muted": true }).then((members) => {
			members.forEach(async (member) => {
      ///  const data = await Member.findOne({guildID:member.guildID})
			bot.databaseCache.mutedUsers.set(`${member.id}${member.guildID}`, member);
			});
		});
    
    
    
  
		setInterval(async () => {
      
			bot.databaseCache.mutedUsers.filter((m) => m.mute.endDate <= Date.now()).forEach(async (memberData) => {
        if(!memberData.mute.muted) return;
				const guild = bot.guilds.cache.get(memberData.guildID);
				if(!guild) return;
				const member = guild.members.cache.get(memberData.id) || await guild.members.fetch(memberData.id).catch(() => {
					memberData.mute = {
						muted: false,
						endDate: null,
						case: null
					};
					memberData.save();
				//	client.logger.log("[unmute] "+memberData.id+" cannot be found.");
					return null;
				});
				const guildData = await Guild.findOneAndUpdate({ guildID: guild.id });
				guild.data = guildData;
				if(member){
					guild.channels.cache.forEach((channel) => {/*
          
						const permOverwrites = channel.permissionOverwrites.cache.get(member.id);
						if(permOverwrites) permOverwrites.delete();
					});*/
            channel.permissionOverwrites.edit(member.id, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true,
				CONNECT: true
			}).catch(() => {});
				})}
				const user = member ? member.user : await bot.users.fetch(memberData.id);
				const embed = new Discord.EmbedBuilder()
					.setDescription(`${user.toString()}Unmuted, case now ${memberData.mute.case}
					`)
					.setColor(config.embed.Color)
					.setFooter({text:config.embed.footer});
				const channel = guild.channels.cache.get(guildData.plugins.modlogs);
if(!channel) return;
				if(channel){
					channel.send({ embeds: [embed] });
				}
				memberData.mute = {
					muted: false,
					endDate: null,
					case: null
				};
				bot.databaseCache.mutedUsers.delete(`${memberData.id}${memberData.guildID}`);
				await memberData.save();
			});
		}, 1000 * 5);
	}
}