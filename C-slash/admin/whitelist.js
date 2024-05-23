const {ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")

module.exports = {
  name: "whitelist",

  description:"add or remove members to whitelist ",
  enabled: true,
  options:[{
  
    name:"choice",
    description:"choice add or remove of user",
    required:true,
    type:ApplicationCommandOptionType.String,
    choices :[
  {name:"Add", value:"add"},
  {name:"Remove", value:"remove"},
      {name:"List", value:"list"}
      ]
  },{
      name:"target ",
      description:"target this user you want to add whistling",
      type:ApplicationCommandOptionType.User,
      required:false
    
    
  
    
  }
          ],
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  
  ownerOnly: false,			
  guilOwnerOnly: true,
  cooldown: 10000,
  run: async (interaction,bot) => {
  const member= await interaction.options.getMember("target");
    const choice = await interaction.options.getString("choice")
      
      let data = await Guild.findOne({ guildID: interaction.guild.id })
    
      
        if(choice=== "add"){
  if(!data.whitelist.find((c) => c.type === member.id)){
        await Guild.findOneAndUpdate(
        {
          guildID: interaction.guild.id,
        },
        {
          $push: {
            whitelist: {
              type: member.id
            }
         },
        })     
        interaction.reply({ embeds: [new EmbedBuilder().setColor(config.embed.Colot).setDescription(`${user.user.username} Added to whitelist`)] })
          } else {
        interaction.reply({ embeds: [new EmbedBuilder().setColor(config.embed.Color).setDescription(`This man is whitelisted`)] })
          }
      }else if (choice=== "remove") {
        
        
        if(data.whitelist.find((c) => c.type === member.id)){
        await Guild.findOneAndUpdate(
        {
          guildID: interaction.guild.id,
        },
        {
          $pull: {
            whitelist: {
              type: member.id
            }
         },
        })
        interaction.reply({ embeds: [new EmbedBuilder().setColor(config.embed.Color).setDescription(`${member.user.username} Removed in whitelist`)] });
        } else {
        interaction.reply({ embeds: [new EmbedBuilder().setColor(config.color).setDescription(`${user.user.username} Not in whitelist`)]});
        };
      }  else if (choice === "list") {
        if (data.whitelist.length === 0) return interaction.reply({ embeds: [new EmbedBuilder().setColor(config.embed.Color).setDescription(`whitelist`)] });
       let arrayOfCustomCommands = data.whitelist.map(w => `=> <@${w.type}>`)
        
        let embed = new EmbedBuilder()
       .setTitle("Whitelisted users")
       .setColor(config.embed.Color)
       .setDescription(arrayOfCustomCommands.slice(0, 15).join('\n'));
      interaction.reply({ embeds: [embed], ephemeral:true });
      }}
  
};