const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")


const moment = require('moment')


const Discord = require("discord.js")

module.exports = {
name:"userinfo",
  description:"information of user",
  options:[{
    
      
      name:'target',
      description: "target someone",
type:ApplicationCommandOptionType.User,

      required:false
    
    
  }],
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

let member = await interaction.options.getMember('target') || interaction.user

      const embed = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setThumbnail(member.displayAvatarURL())
      .addFields({name:"Join",value: moment(member.joinedAt).format('dddd, do MMMM YYYY'), inline:true})
      .addFields({name:"Creation", value:moment(member.createdAt).format('dddd, do MMMM YYYY'), inline:true} )
  
  await interaction.reply({embeds:[embed]})
    }catch{}
  
  }}

