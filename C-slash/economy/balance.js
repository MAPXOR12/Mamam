const Discord = require("discord.js");
const m = "<:Bobocash:897148836567457862>";
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  
  name: "balance", //the command name for the Slash Command
  description: "get your balance or anyone",
  options: [
   {
        name: "ping_a_user",
        description: "To Ping a user lol",
        type:ApplicationCommandOptionType.User,
        required: false,
      
    },
  ],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  enabled: true,
  category: ["economy"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    const user =
      (await interaction.options.getUser("ping_a_user")) || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    if (member) {
      let autho = await User.findOne({ userID: member.id });
      if (!autho)
        return interaction.reply({ content: `user not have any data` });
      interaction.reply({
        content: `
          🏦 **${member.user.username}**, credits balance is __${
          autho.money.toLocaleString() || "0"
        }__ ${m}`,
      });
    }
    if (!member) {
      let author = await User.findOne({ userID: interaction.user.id });
      interaction.reply({
        content: `🏦 **${
          interaction.user.username
        }**, Your credits balance is:  __\`${
          author.money.toLocaleString() || "0"
        }\`__${m}
      `,
      });
    }
  },
};
