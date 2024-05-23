const {EmbedBuilder,Discord }= require ("discord.js")
const FiltersSettings = require("../../helpers/filters.json");

module.exports = {
  name: "filterlist",
description:"List all active and possible Filters!",
options:[],
  category: ["music"],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: true,
  cooldown: 6000,
  run: async (interaction, bot) => {


    try {
      //things u can directly access in an interaction!
      const {
        member,
        channelId,
        guildId,
        applicationId,
        commandName,
        deferred,
        replied,
        ephemeral,
        options,
        id,
        createdTimestamp
      } = interaction;
      const {
        guild
      } = member;
      try {
        let newQueue = distube.getQueue(guildId);
        if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) return interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(config.embed.Color)
            .addFields({name:"**All available Filters:**", value :Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ") + "\n\n**Note:**\n> *All filters, starting with custom are having there own Command, please use them to define what custom amount u want!*"})
          ],
          ephemeral: true
        })
        return interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(config.embed.Color)
            .addFields({name:"**All available Filters:**", value:Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ") + "\n\n**Note:**\n> *All filters, starting with custom are having there own Command, please use them to define what custom amount u want!*"})
            .addFields({name:"**All __current__ Filters:**", value:newQueue.filters.map(f => `\`${f}\``).join(", ")})
            ],
        })
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.reply({
          content: ` Error: `,
          embeds: [
            new EmbedBuilder().setColor(config.embed.Color)
            .setDescription(`\`\`\`${e}\`\`\``)
          ],
          ephemeral: true
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  }
}
    