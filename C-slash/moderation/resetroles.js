

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "resetroles",
  
  description: "reseroles of your user want",
options:[{

    name:"target",
    description:"Target this member",
  type:ApplicationCommandOptionType.User,
    required:true,
  
  
}],
  category: ["moderation"],
  enabled: true,
  memberPermissions: ["ManageRoles","SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks", "ManageRoles"],
  ownerOnly: false,
  cooldown: 6000,
     prime:false,
  run: async (interaction,bot) => {
    
    try{
let member = await interaction.options.getMember('target');


    if (!member){
      return interaction.reply({content:`\\ Unable to reset roles of the user: User not found.`});
    } else if (member.id === bot.user.id){
      return interaction.reply({content:`\\ ${interaction.user}, I do not recommend resetting my roles!`});
    } else if (member.user.bot){
      return interaction.reply({content:`\\ ${interaction.user}, I do not recommend resetting bot roles! (Might affect role integration)`});
    } else if (interaction.member.id === member.id){
      return interaction.reply({content:`\\ ${interaction.user}, You cannot reset your own roles!`});
    } else if (interaction.member.roles.highest.position < member.roles.highest.position){
      return interaction.reply({content:`\\ ${interaction.user}, You cannot modify roles of user who has of higher permission than yours!`});
    } else if (!Boolean(member.roles.cache.size - 1)){
      return interaction.reply({content:`\\ ${interaction.user}, **${member.user.tag}** has no roles to remove from.`});
    };

   
    const prevRoleCount = member.roles.cache.size - 1;
    return member.roles.set([])
    .then(member => interaction.reply({content:`\\ Successfully removed **${prevRoleCount}** roles from **${member.user.tag}**!`}))
    .catch(() => interaction.reply({content:`\\ Unable to remove all of **${member.user.tag}**'s roles!`}))
  }catch(e){console.log(e.message)
      
}}}
     