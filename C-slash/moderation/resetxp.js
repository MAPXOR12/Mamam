const profile = require(`${process.cwd()}/data/user`);

module.exports = {
  name: "xpreset",
  description: "Rese all xp from members on server",
  options:[],
  enabled: true,
  memberPermissions: ["ManageGuild"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: false,
  cooldown: 8000,
  run: async (interction, bot) => {
    try {
      let res = await profile
        .updateMany(
          { "data.xp.id": interction.guild.id },
          {
            $pull: { "data.xp": { id: interction.guild.id } },
          }
        )
        .catch((err) => {
          if (err) {
            return interction.reply({
              content: `\`❌ [DATABASE_ERR]:\` The database responded with error: ${err.name}`,
            });
          }
        });
      if (res.nModified == 0) {
        return interction.reply({
          content: `\\❌ **${interction.user.tag}**, this server has no xp data to be cleared of!`,
        });
      } else {
        return interction.reply({
          content: `\\✔️ **${interction.user.tag}**, this server's xp has been reset. (Cleared **${res.nModified}** xpdocs)`,
        });
      }
    } catch(err) {console.log(err.message)}
  },
};
