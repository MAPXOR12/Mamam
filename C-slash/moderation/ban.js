const Discord = require("discord.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  
name:"ban",
  description:"moderation command to ban someone",
  options:[{

      
      name:"target",
      description:"target someone",
    type:ApplicationCommandOptionType.User,
      required:true,
    },
           {
            
             name:"reason",
             description:"why you ban this user?",
             type:ApplicationCommandOptionType.String,
             required:true,
           
    
    
    
  }],
  enabled: true,
  memberPermissions: ["SendMessages","BanMembers"],
  botPermissions: ["SendMessages", "EmbedLinks","BanMembers"],
  enabled: true,
  category: ["moderation"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data,channelEmbed) => {
    // let data = await Guild.findOne({guildID: message.guild.id})
try{
    let user = await interaction.options.getUser("target");
    //////let reason = await interaction.options.getString('reason');
let reason = await interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(() => {console.log('error')});
   if (member) {
      const memberPosition = member.roles.highest.position;
      const moderationPosition = interaction.member.roles.highest.position;
      if (member.ownerId !== interaction.user.id &&
        !(moderationPosition > memberPosition)
      ) {
        await interaction.reply({
          content: `You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `,
        });

        await interaction.editReply({
          content: `An error has occurred... Please check that I have the permission to ban this specific member and try again!`,
        })}

    await user
      .send(
        `**${interaction.user.tag}** banned you from ${
          interaction.guild.name
        }!\n**Reason**: ${"Unspecified."}`
      )
      .catch((err) => console.log(err.name));

    await member.ban({ reason: ` ${reason ||"Unspecified"}`});

    interaction
      .reply({
        content: `Successfully banned **${user.tag}**`,
      })
      .catch(() =>
        interaction.editReply({ content: `Failed to ban **${user.user.tag}**` })
      );
  }
    
  
  ////// 
  
  }catch(e){console.log(e.message)}
}}
