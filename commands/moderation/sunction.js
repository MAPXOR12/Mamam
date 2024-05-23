const Discord = require ("discord.js");

module.exports = {
    name: "sunction",
    aliases: ["warns"],
    description: "You can see all warns",
    usage: ["warns"],
    category: ["moderation"],
    enabled: true,
    memberPermissions: ["ManageMessages","SendMessages"],
    botPermissions: ["SendMessages", "EmbedLinks"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev) => {
try{
const user = await message.mentions.members.first();
		if(!user){
			return message.channel.send({content:`I can't find this user`});
		}
		const memberData = await Member.findOne({ userID: user.id, guildID: message.guild.id });

		const embed = new Discord.EmbedBuilder()
			.setAuthor({name:`${user.tag}`, iconURL: user.displayAvatarURL()})
			.setColor(config.embed.Color)
			.setFooter({text:"BoBo ©Team"});

		if(memberData.sanctions.length < 1){
			embed.setDescription(`no any sunction in database`)
			return message.channel.send({embeds:[embed]});
		} else {
			memberData.sanctions.forEach((s) => {
				embed.addFields({name:s.type+" | #"+s.case,value: `moderator: <@${s.moderator}>\nreason : ${s.reason}`,inline: true});
			});
		}

		message.channel.send({embeds:[embed]});
    }catch(err){
      return message.channel.send({content:` something wrong please check it in fix it`})}
    
    }}