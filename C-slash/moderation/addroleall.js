const Discord = require("discord.js");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "add-roleall",
  description: "addoleall",
  options: [
    {
     
  name: "which_one",
         description:"Added one please 😃",
      type:ApplicationCommandOptionType.String,
          required: true,
        choices:[{name:"Members", value:"member"},{
          name:"Bots", value:"bots"
        }]
         
   
    },{
      name:"role",
      description:"what is role yiu want to add?",
      type:ApplicationCommandOptionType.Role,
      required:true,
    }
  ],

  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["ManageRoles", "SendMessages", "EmbedLinks"],
  memberPermissions: ["ManageRoles", "SendMessages"],
  run: async (interaction, args) => {
    try {
      let choice = await interaction.options.getString("which_one");

      let Role = await interaction.options.getRole("role");

      if (interaction.guild.members.me.roles.highest.comparePositionTo(Role) < 0) {
        return interaction.reply({
          content: `My role is not high enough than **${Role.name}** role!`,
        });
      }

      if (interaction.member.roles.highest.comparePositionTo(Role) < 0) {
        return interaction.reply({
          content: ` Your role must be higher than **${Role.name}** role!`,
        });
      }

      if (!Role) {
        return interaction.reply({ content: "Please provide a valid role" });
      }

      if (choice === "members") {
        const embed = new Discord.EmbedBuilder().setDescription(
          `Added ${Role.name} To members `
        );

        await interaction.guild.members.fetch().filter((r) => !r.user.bot);
        setTimeout(() => {
          interaction.reply({ embeds: [embed] });
        });
      }
      if(choice === "bots"){


const embed = new Discord.EmbedBuilder().setDescription(
          `Added ${Role.name} To members `
        );

        await interaction.guild.members.fetch().filter((r) => r.user.bot);
        setTimeout(() => {
          interaction.reply({ embeds: [embed] });
        });
      }el

    
    } catch (err) {
      return  console.log(err.message)
    }
  },
};
