const app = require("express").Router();
const path = require("path");
const { ChannelType} = require ("discord.js")
console.log("welcome router loaded");
app.get(
  "/dashboard/guild/:guildID/welcome",
  global.checkAuth,global.apiLimiter,
  async (req, res, next) => {
    
  const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

    const guild = bot.guilds.cache.get(req.params.guildID);

    
    let data = await Guild.findOne({ guildID: guild.id });
let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    res.render("./guild/welcomesystem.ejs", {
      config: config,
      ChannelType:ChannelType,
      data: data,
      req: req,
      bot: bot,
      guild: guild,
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);
app.post(
  "/dashboard/guild/:guildID/welcome",
  global.checkAuth,global.apiLimiter,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    let rbody = req.body;
   console.log(rbody["withImg"])
   /* let data = await Guild.findOne({ guildID: guild.id });*/

    if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
       await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.message": rbody["message"],
            "plugins.welcome.titile": rbody ["title"],
            "plugins.welcome.welcomeImage": rbody["URL"],

            "plugins.welcome.channel": rbody["channel"],
          },
        }
      );
      
      res.send({ success: true, message: "successfully" });
    }
if(rbody["withImg"]=== "true"){
  await Guild.findOneAndUpdate({guildID: req.params.guildID},{
    $set:{
      "plugins.welcome.enabled":true
    }
  })
}
if(rbody["withImg"]=== "false"){
  await Guild.findOneAndUpdate({guildID: req.params.guildID},{
    $set:{
      "plugins.welcome.enabled":false
    }
  })
}
   if (rbody["onoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.enabled": false,
            
          },
        },
      
      );
     res.send({success:true, message:"disabled successfully "})
    
    }
if (rbody["onoff"] === "true") {

      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.enabled": true,
            "plugins.welcome.withImage": rbody["withImg"] === "true",
          },
        },
      
      );
    }
    }
  
);

module.exports = app;
