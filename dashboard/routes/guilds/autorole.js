const app = require("express").Router();
const path = require("path");
console.log("autorole router loaded");
app.get(
  "/dashboard/guild/:guildID/autorole",global.apiLimiter,
  global.checkAuth,
  async (req, res, next) => {
    
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


    
    const guild = await bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
    const user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    res.render("./guild/autorole.ejs", {
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
  "/dashboard/guild/:guildID/autorole",global.apiLimiter,
  global.checkAuth,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
const user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }

    let rbody = req.body;
    
    let data = await Guild.findOne({ guildID: guild.id });
console.log(rbody["role"])
    
     if(Object.prototype.hasOwnProperty.call(rbody, "role")){
       const role = guild.roles.cache.get(rbody["role"]);
    if(role.permissions.has("Administrator")){ return res.send({error:true, message:"errothis role have Administrator permission"})}
await Guild.findOneAndUpdate({ guildID: req.params.guildID}
                             ,{ $set:{
                               "plugins.autorole.role": rbody["role"],
                              /// "plugins.autorole.enabled": true,
                             }})
     
     res.send({ success: true, message:"successfully"})
     }
       
     
if(rbody["onoff"]==="true"){
    await Guild.findOneAndUpdate(
      { guildID: req.params.guildID },
      {
        $set: {
     "plugins.autorole.enabled": true,
  
        },
      }
    );}
    if(rbody["onoff"]==="false"){
    await Guild.findOneAndUpdate(
      { guildID: req.params.guildID },
      {
        $set: {
     "plugins.autorole.enabled": true,
  
        },
      }
    );}

  }
);

module.exports = app;
