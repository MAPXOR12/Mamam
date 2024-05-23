const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/setting",
  global.checkAuth,global.apiLimiter,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
  maintenance:"maintenance"
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


    
    const guild = bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
    const user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("MANAGE_GUILD")) {
      res.redirect("?error=true&message= You can't access to this page");
    }
    res.render("./guild/setting.ejs", {
      config: config,
      data: data,
      req: req,
      bot: bot,
      guild: guild,
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);


app.post(
  "/dashboard/guild/:guildID/setting",
  global.checkAuth,global.apiLimiter,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);

let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    
    let rbody = req.body;

    if (rbody["prefix"].length > 5) {
      return res.send({ error: true, message: "you can't add up 5 words" });
    }
if(!rbody["prefix"]){ res.send({error:true, message:" Prefix field empty"})
                     
                     
                    }else{
    
    let data = await Guild.findOne({ guildID: guild.id });

    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          prefix: rbody["prefix"],
        },
      }
    );

   return res.send({ success: true, message: "successfully" });
  }
  
  }
);

module.exports = app;
