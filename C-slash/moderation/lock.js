

const Discord = require("discord.js")
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  
  name:"lock",
  description:'lock is a moderation command to lock channels',
  options:[{
  
      name:"channel",
      description:"channel to lock",
    type:ApplicationCommandOptionType.Channel,
      required:false,
    }],
  
  enabled: true,			    
  memberPermissions: [ "SendMessages","ManageChannels" ],			
  botPermissions: [ "SendMessages", "EmbedLinks","ManageRoles"],		
  enabled:true,
  category:["moderation"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data,channelEmbed) => {

    try{

   // const data = await Guild.findOne({guildID: message.guild.id})
  let channel = await interaction.options.getChannel('mention_channel') || interaction.channel;
  
  channel
      .permissionOverwrites.edit(interaction.guild.id, {
        SendMessages: false
      })
      .then(async() => {
        interaction.reply({content:`channel locked`}).catch(()=>{ return;})
    
    
  })
    }catch(e){
      console.log(e.message)
    }
      
   
}}
