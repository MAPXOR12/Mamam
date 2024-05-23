const app = require('express').Router();
const { PermissionsBitField } = require('discord.js');


///const channels = global.config.server.channels;
const Discord = require("discord.js")

app.get("/dashboard/guild", global.apiLimiter,global.checkAuth, async (req,res) => {
const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  
  const user = await bot.users.fetch(req.user.id)
  
  
  
  
  
    res.render("guild/guilds.ejs", {
        bot: bot,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
  
         res:res,
        
        perms: PermissionsBitField,
        guildID: req.params.guildID,

	})
  
})

module.exports = app;
