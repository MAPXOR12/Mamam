const Discord = require("discord.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
const progressbar = require("percentagebar");
const fs = require("fs");
module.exports = {
  name:"ship",
  description:"ship",
  options:[{
  
      name:"target_ship",
      description:'mention someone',
    type:ApplicationCommandOptionType.User,
      required:false,
      
      
    
  }],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  enabled: true,
  category: ["general"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    try {
      const user1 =
        (await interaction.options.getMember("target_ship")) || interaction.user;
      let author = interaction.user;
      const ship = Math.floor(Math.random() * 100) + 1;
      const bar = progressbar(100, ship, 10);
      const mehh = new Discord.EmbedBuilder() // Prettier

        .setThumbnail(
          "https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1"
        )
        .setDescription(
          `I shipped ${author} with **${user1}** and it is **${ship}%**\n${bar}`
        )

        .setColor(config.embed.Color);
      const love = new Discord.EmbedBuilder() // Prettier

        .setThumbnail(
          "https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1"
        )
        .setDescription(
          `I shipped ${author} with **${user1}**  and it is **${ship}%**\n${bar}`
        )

        
      if (ship > 50) {
        interaction.reply({ embeds: [love] });
      } else {
        interaction.reply({ embeds: [mehh] });
      }
    } catch (err) {
      interaction.reply({ content: `Something went wrong...` });
    }
  },
};
