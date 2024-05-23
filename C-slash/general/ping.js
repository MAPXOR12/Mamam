const Discord = require("discord.js");
const { Colors } = require('discord.js');

module.exports ={
  
name:"ping",
  description:"show speed of bot",
  options:[],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  enabled: true,
  category: ["general"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    let date = Date.now();
    let ping_db = await new Promise((r, j) => {
      require("mongoose")
        .connection.db.admin()
        .ping((err, result) =>
          err || !result ? j(err || result) : r(Date.now() - date)
        );
    });

    date = Date.now();

    let pong = new Discord.EmbedBuilder()
  
      .setDescription("Pong?");

    return interaction.reply({ embeds: [pong] }).then(async() => {
      let embed = new Discord.EmbedBuilder()
        .setDescription(
          `🏓 Bot: ${bot.ws.ping}ms \n📡 Discord API: ${
            Date.now() - date
          }ms \n🗃️ DB: ${ping_db}ms`
        )
        .setColor(config.embed.Color)

      return await interaction.editReply({ embeds: [embed] });
    });
  },
};
