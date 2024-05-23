const Discord = require("discord.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "avatar",
  description: "avatar images",
  options: [{
  
        name: "target",
      type:ApplicationCommandOptionType.User,
        description: "target someone",
        required: false,
      
    },
  ],
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
      const member =
        (await interaction.options.getMember("target")) || interaction.member;

      const avatar = member.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      });
      if (member) {
        const embed = new Discord.EmbedBuilder()
          .setColor(config.embed.Color)
          .setImage(avatar)
          .setFooter({ text: `Avatar | \©️${new Date().getFullYear()}` })
          .setDescription(`**${member.user.tag}**\n[Avatar](${avatar})`);
        return interaction.reply({ embeds: [embed] });
      }
    } catch (e){console.log(e.message)}
  },
};
