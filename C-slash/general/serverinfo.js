const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: '(╯°□°）╯︵ ┻━┻',

	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};
const Discord = require("discord.js")

module.exports = {
  name:"serverinfo",
  description:"server information",
  options:[],
  enabled: true,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    try{
    const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

            
       
		const members = interaction.guild.members.cache;

	        ///let guild = await Guild.findOne({ guildID: message.guild.id });
		
                const channel = interaction.guild.channels.cache.size;
	       
                const channels =interaction.guild.channels.cache;

		const emojis = interaction.guild.emojis.cache;

		const embed = new Discord.EmbedBuilder()
      .setTitle("Guild information")
			.setColor(config.embed.Color)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addFields({name:"Name",value: `${interaction.guild.name}`, inline:true})
                      
                        .addFields({name:"Owner", value:`<@${interaction.guild.ownerId}>`, inline:true})
                        .addFields({name:"Region", value:`${regions[interaction.guild.region]}`, inline:true})
                        .addFields({name:"Explicit Filter", value:`${filterLevels[interaction.guild.explicitContentFilter]}`, inline:true})
                        .addFields({name:"Verification Level",value: `${verificationLevels[interaction.guild.verificationLevel]}`, inline:true})
                        .addFields({name:"Time Created", value:`${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format('LL')} ${moment(interaction.guild.createdTimestamp).fromNow()}`, inline:true})
                        .addFields({name:"Role Count",value: `${roles.length}`, inline:true})
                        .addFields({name:"Boost Count",value: `${interaction.guild.premiumSubscriptionCount || '0'}`, inline:true})
                        .addFields({name:"Member Count",value: `${interaction.guild.memberCount}`, inline:true})
                        .addFields({name:"Bots",value: `${members.filter(member => member.user.bot).size}`, inline:true})
                        .addFields({name:`Channels`, value:`(${channel})`, inline:true})
                        .addField({name:"Emoji Count", value:`${emojis.size}`, inline:true})


	    await interaction.reply({embeds: [embed] });

  }catch{}

  }}