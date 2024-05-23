const app = require("express").Router();
const {ChannelType} = require("discord.js")
const path = require("path");
console.log("setting  router loaded");
app.get(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,global.apiLimiter,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

    const guild = await bot.guilds.cache.get(req.params.guildID);
    let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    let data = await Guild.findOne({ guildID: guild.id });
    res.render("./guild/xpsystem.ejs", {
      config: config,
      data: data,
      ChannelType:ChannelType,
      req: req,
      bot: bot,
      guild: guild,
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);

app.post(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,global.apiLimiter,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    let rbody = req.body;

    if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "xp.channel": rbody["channel"],
            "xp.message": rbody["message"],
        }
        },
        
      );
      return res.send({ success: true, message: "successfully" });
    }
    if (rbody["onoff"] === "false") {
      
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "xp.channel": null,"xp.onoff":false, "xp.message": null } },
      
      );
    }
    if (rbody["onoff"] === "true") {
      await Guild.findOneAndUpdate(
        {
          guildID: req.params.guildID,
        },
        {
          $set: {
            "xp.onoff": true,
          },
        },
      
      );
    }
  }
);
module.exports = app;
