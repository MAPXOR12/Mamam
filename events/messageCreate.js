const Discord = require("discord.js");
const owners = "768944616724103170";
/**/
const experience = require(`${process.cwd()}/util/xp`);

module.exports = class {
  async run(message, bot, member) {
    const data = {};

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    //----------------------------database mamager------------------------//
    let guild = await Guild.findOne({ guildID: message.guild.id });
    if (!guild) {
      Guild.create({ guildID: message.guild.id });
    }
    data.guild = guild;
    let user = await User.findOne({
      userID: message.author.id,
    });
    if (!user) {
      User.create({ userID: message.author.id });
    }
    data.user = user;
    let prime = await Prime.findOne({ guildID: message.guild.id });
    if (prime && prime.log === "enable") return; //message.channel.send(`you don't have Premium version`);

    let h = await Owner.findOne({ ownerCode: "768944616724103170" });
    if (!h) {
      Owner.create({
        ownerCode: "768944616724103170",
        worldWhitelist: "768944616724103170",
      });
    }
    let antis = await Antis.findOne({
      guildID: message.guild.id
    })
    if(!antis){ await Antis.create({guildID: message.guild.id})}
     let mute = await Mute.findOne({ guildID: message.guild.id })
if(!Mute){
    Mute.create({
      guildID: message.guild.id})}
    ///if(message.guild.members.cache.has("838593240328044554")) return

    if (!user || !user.xp || !data.guild) {
      return;
    }
    ///-----------////

    /// Black list System
    const userBlacklistSettings = await Black.findOne({
      userID: message.author.id,
    });
    const guildBlacklistSettings = await Black.findOne({
      Guild: message.guild.id,
    });

    if (userBlacklistSettings && userBlacklistSettings.isBlacklisted) {
      //   l
      return;
    }

    // Check if server is Blacklisted
    if (guildBlacklistSettings && guildBlacklistSettings.isBlacklisted) {
      return;
    } /////////
    let ban = await Ban.findOne({user: message.author.id});
    if(ban) return;

    ////////-----------------------------------------------------------------------///

    const response = await experience(message, bot, guild);
    
    
    ////----------------mute interval--------------///
    
    
  
  
    
    
    if (guild) {
      if (!message.content.toLowerCase().startsWith(guild.prefix.toLowerCase()))
        return;
      let args = message.content.split(" ");
      const argsr = message.content
        .slice(guild.prefix.length)
        .trim()
      
        .split(/ +/g);
      
      const cmd =   argsr.shift().toLowerCase();
if (cmd.length === 0) return; 
      let command = bot.commands.get(cmd);
      
      if (!command) command = bot.commands.get( bot.aliases.get(cmd));
      if (!command) return;
      if (command.prime) {
        let data = await Prime.findOne({ Guild: message.guild.id });
        if (!data)
          return message.channel.send({
            content: `this server not haven't on data base`,
          });
        if (!data.Permanent && Date.now() > data.time) {
          data.delete();
          return message.channel.send({
            content: `prime bot on your server ended for buy mor join support server `,
          });
        }
      }

      //-----------------------------modlogse---------------------////
const channelEmbed = await message.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SendMessages', 'EmbedLinks'])){
    
          
      }
        

      
      ////-------------///
  
      
      ///-----------------------------------------permissoins--------------------------------///
      if (!message.channel.permissionsFor(bot.user).has("SendMessages"))
        return;
      if (!command.enabled)
        return await message.channel.send({
          content: `This command is **Disable** for now`,
        });
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      data.ww = Ww;
      if (
        command.ownerOnly &&
        !Ww.worldWhitelist.find((c) => c.type === message.author.id)
      )
        return await message.channel.send({
          content: `This command is only for owner the bot`,
        });
      if (command.guilOwnerOnly) {
        if (
          message.author.id !== message.guild.ownerId &&
          !Ww.worldWhitelist.find((c) => c.type === message.author.id)
        )
          return message.channel.send({
            content: `This command is only for guildOwner`,
          });
      }
      let neededPermissions = [];
      if (!command.botPermissions.includes("EmbedLinks")) {
        command.botPermissions.push("EmbedLinks");
      }
      command.botPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(bot.user).has(perm)) {
          neededPermissions.push(perm);
        }
      });
      if (neededPermissions.length > 0) {
        return message.channel.send({
          content: `I don't have a ${neededPermissions
            .map((p) => `\`${p}\``)
            .join(", ")} permissions`,
        });
      }
      neededPermissions = [];
      command.memberPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.member).has(perm)) {
          neededPermissions.push(perm);
        }
      });
      if (neededPermissions.length > 0) {
        return message.channel.send({
          content: `You don't have a ${neededPermissions
            .map((p) => `\`${p}\``)
            .join(", ")} permissions`,
        });
      }

      if (command.botPermissions) {
        let perms = new Discord.EmbedBuilder().setDescription(
          `i don't Have ${command.botPermissions} To Run Command..`
        );
        if (!message.guild.members.me.permissions.has(command.botPermissions || []))
          return message.channel.send({ embeds: [perms] });
      }
      ///------------------------------cooldown---------------------------/////////////

      if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = bot.cooldowns.get(command.name);
      const cooldownAmount = command.cooldown || 2 * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel
            .send({ content: `Please wait ${timeLeft.toFixed(1)} second` })
            .then((msg) => setTimeout(() => msg.delete(), 2000));
        }
      }
      timestamps.set(message.author.id, now);
      let prefix = guild.prefix;
      if (command) command.run(bot, message, args, prefix, data, cmd, prime,channelEmbed);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
  }
};
