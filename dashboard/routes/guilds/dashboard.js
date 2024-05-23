const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
app.get(
  "/dashboard/guild/:guildID",global.apiLimiter,
  global.checkAuth,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });
    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

    const guild =  bot.guilds.cache.get(req.params.guildID);
    let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    let data = await Guild.findOne({ guildID: guild.id });
    if (!data) {
      return Guild.create({ guildID: guild.id });

      return res.send(`I can't find Your guild in database try again `);
   
    }

    const join1 = [];
    const leave1 = [];
    const join2 = [];
    const leave2 = [];

    data.joins.forEach(async (user) => {
      /*let day = 7 * 86400000;
      let x = Date.now() - user.joinedAt;
      let created = Math.floor(x / 86400000);*/

let xx = user - Date.now();
    if(Date.now() > user){
      xx = Date.now() - user
    }

    let createdd = Math.floor(xx / 86400000);


      if (6 >= createdd) {
        join2.push(user);
      }
      if (0 >= createdd) {
        join1.push(user);
      }
    });


data.leaves.forEach(async(leave)=>{

    
    let xx = leave - Date.now();
    if(Date.now() > leave){
      xx = Date.now() - leave
    }

    let createdd = Math.floor(xx / 86400000);


    if(6 >= createdd) {
    leave2.push(leave)
    }

       if(0 >= createdd) {
    leave1.push(leave)
    }

     })
    

    res.render("./guild/dashboard.ejs", {
      config: config,

      join1: join1.length || 0,
      join2: join2.length || 0,
      leave1: leave1.length || 0,
      guild: guild,
      leave2: leave2.length || 0,

      support: config.support,
      data: data,
      res: res,
      guildID: req.params.guildID,
      bot: bot,
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);

module.exports = app;
