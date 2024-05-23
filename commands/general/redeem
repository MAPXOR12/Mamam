const Guild = require("../../data/guild");
const Premium = require("../../data/prime");
const moment = require("moment");

const Discord = require("discord.js");
const { WebhookClient } = require("discord.js");

const data = {
  id: config.webhook.id,
  token:config.webhook.token,
};

const webhookClient = new WebhookClient(data);

let uniqid = require("uniqid");


module.exports = {
  name: "redeem",
  aliases: ["redeem"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 5000,
  
  run: async (bot, message, args, dev) => {
    const guildDB = await User.findOneAndUpdate({
      userID: message.author.id
    });

    ///const language = require(`../../data/language/${guildDB.language}.json`)

    let code = args[1];

    if (!code)
      return message.channel.send({
        content: `Please Specify a code to redeem`
      });

    if (guildDB.isPremium === "true") {
      return message.channel.send({
        content: `the current guild is already premium`
      });
    }

    const premium = await Premium.findOneAndUpdate({
      code: code
    });

    if (premium) {
      const expires = moment(Number(premium.expiresAt)).format(
        "dddd, MMMM Do YYYY HH:mm:ss"
      );

      guildDB.isPremium = "true";
      guildDB.premium.redeemedBy.id = message.author.id;
      guildDB.premium.redeemedBy.tag = message.author.tag;
      guildDB.premium.redeemedAt = Date.now();
      guildDB.premium.expiresAt = premium.expiresAt;
      guildDB.premium.plan = premium.plan;

      await guildDB.save().catch(() => {});

      await premium.deleteOne().catch(() => {});

      let ID = uniqid(undefined, `-${code}`);
      const date = require("date-and-time");
      const now = new Date();
      let DDate = date.format(now, "YYYY/MM/DD HH:mm:ss");

     /* try{*/
        let dv = new Discord.MessageEmbed()
          .setDescription(
            `**Premium Subscription**\n\nYou've recently redeemed a code in **${message.guild.name}** and here is your receipt:\n\n **Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**User  Name:** ${message.author.username}\n**User ID:** ${message.author.id}`
          )
          .setColor("RANDOM")
          .setFooter(message.guild.name);
        return message.author.send({ embeds: [dv] })
          message.channel.send({content:`Check Your Dm ✅`}).catch((err)=>{
     // } catch (err) {
     //   console.log(err);
        let embed = new Discord.MessageEmbed()
          .setDescription(
            `**Congratulations!**\n\n**${message.guild.name}** Is now a premium guild! Thanks a ton!\n\nIf you have any questions please contact me [here](r)\n\n**Could not send your Reciept via dms so here it is:**\n**Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**Guild Name:** ${message.guild.name}\n**Guild ID:** ${message.guild.id}\n\n**Please make sure to keep this information safe, you might need it if you ever wanna refund / transfer servers.**\n\n**Expires At:** ${expires}`
          )
          .setColor("RANDOM")
          .setFooter(message.guild.name);
        return message.channel.send({ embeds: [embed] });

      
  })

      let embed2 = new Discord.MessageEmbed()
        .setDescription(
          `**Congratulations!**\n\n**${message.author.username}** Is now a premium User! Thanks a ton!\n\nIf you have any questions please contact me [here](https://discord.gg/rjhPpahNNR)\n**your receipt has been sent via dms**\n\n**Expires At:** ${expires}`
        )
        .setColor("RANDOM")
        .setFooter(message.guild.name);
     return message.channel.send({ embeds: [embed2] });
    
      
      const embedPremium = new Discord.MessageEmbed()
        .setDescription(
          `**Premium Subscription**\n\n**${message.author.tag}** Redeemed a code in **${message.guild.name}**\n\n **Reciept ID:** ${ID}\n**Redeem Date:** ${DDate}\n**Guild Name:** ${message.guild.name}\n**Guild ID:** ${message.guild.id}\n**Redeemer Tag:** ${message.author.tag}\n**Redeemer ID:** ${message.author.id}\n\n**Expires At:** ${expires}`
        )
        .setColor("RANDOM");

     return webhookClient.send({ embeds: [embedPremium] });
    } else {
      return message.channel.send({
        content: ` I could not the following Code.`
      });
    }
  }
};
