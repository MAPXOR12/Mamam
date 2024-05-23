const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "daily",
  description: "💸 get your daily all 24hours",
options:[],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  enabled: true,
  category: ["economy"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot) => {
  interaction.reply({content:`Daily Command transfer to dashboard https://boboworld.xyz/daily`});
    /*
    let cooldown = 0; //43200000;
    let data = await User.findOne({ userID: interaction.user.id });
    if(!data) return;
    if (
      data.time !== null &&
      cooldown - (Date.now() - data.time) > 0
    ) {
      return interaction.reply({
        content: ` You need wait ${ms(
          cooldown - (Date.now() - data.time)
        )} to daily again`,
      });
    }
    let DR = Math.floor(Math.random() * 2000) + 1000;

    interaction.reply({
      content: `**${interaction.user.username}** you get 💰$\`${DR}\` credits`,
    });


    await User.updateOne(
      {
        userID: interaction.user.id,
      },

      {
        $set: {
          time: Date.now(),
        },
      }
    );
    await User.updateOne(
      {
        userID: interaction.user.id,
      },
      {
        $inc: {
          money: DR,
        },
      }
    );*/
  },
};
