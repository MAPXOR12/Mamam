const app = require("express").Router();
const path = require("path");
const { ChannelType} = require("discord.js");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/logsystem",global.apiLimiter,
  global.checkAuth,
  async (req, res, next) => {
    try{
    const maintenance = await Maintenance.findOne({
      server: config.serverid,
    });

    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

    const guild = await bot.guilds.cache.get(req.params.guildID);
    let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    let data = await Guild.findOne({guildID:guild.id}) || new Guild({guildID: guild.id}).save();
      
  
  
    res.render("./guild/logsystem.ejs", {
      config: config,
      data: data,
      ChannelType:ChannelType,
      req: req,
      bot: bot,
      guild: guild,
      user: req.isAuthenticated() ? req.user : null,
    });
    }catch(err){ return;}
  })

app.post(
  "/dashboard/guild/:guildID/logsystem",
  global.checkAuth,global.apiLimiter,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
let user = await guild.members.fetch(req.user.id);


    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
    let rbody = req.body;
    let data = await Guild.findOne({ guildID: guild.id });

    if (
      Object.prototype.hasOwnProperty.call(
        rbody,
        "channelCreatechannel" ||
          "channelDeletechannel" ||
          "channelUpdatechannel"
      )
    ) {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.logs.channelCreate.channel":
              rbody["channelCreatechannel"],
            "plugins.logs.channelCreate.color":
              rbody["channelCreatecolor"],
            "plugins.logs.channelDelete.channel":
              rbody["channelDeletechannel"],

            "plugins.logs.channelDelete.color":
              rbody["channelDeletecolor"],
            "plugins.logs.channelUpdate.channel":
              rbody["channelUpdatechannel"],
            "plugins.logs.channelUpdate.color":
              rbody["channelUpdatecolor"],
            "plugins.logs.roleCreate.channel":
              rbody["roleCreatechannel"],
            "plugins.logs.roleCreate.color": rbody["roleCreatecolor"],
            "plugins.logs.roleDelete.channel":
              rbody["roleDeletechannel"],
            "plugins.logs.roleDelete.color": rbody["roleDeletecolor"],
            "plugins.logs.roleUpdate.channel":
              rbody["roleUpdatechannel"],
            "plugins.logs.roleUpdate.color": rbody["roleUpdatecolor"],
            "plugins.logs.banAdd.channel": rbody["banAddchannel"],
            "plugins.logs.banAdd.color": rbody["banAddcolor"],
            "plugins.logs.banRemove.channel": rbody["banRemovechannel"],
            "plugins.logs.banRemove.color": rbody["banRemovecolor"],

            "plugins.logs.messageUpdate.channel": rbody["messageUpdatechannel"],
            "plugins.logs.messageUpdate.color": rbody["messageUpdatecolor"],
            "plugins.logs.messageDelete.channel": rbody["messageDeletechannel"],
"plugins.logs.messageDelete.color": rbody["messageDeletecolor"],



            "plugins.logs.kick.channel": rbody["ki kchannel"],
"plugins.logs.kick.color": rbody["kickcolor"],

            
          },
        },
        
      );
    
      res.send({ success: true, message: "successfully" });
    }
    
    if (rbody["onoff"] === "true") {
      console.log("true")
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.enabled": true } },
      
      );
    }if (rbody["onoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.enabled": false } },
    
      );
    }

    
    if (rbody["channelCreateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelCreate.enabled": true } },
        
      );
    } 
    if (rbody["channelCreateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelCreate.enabled": false } },
        
      );
    }
    if (rbody["banAddonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.banAdd.enabled": true } },
        
      );
    }
    if (rbody["banAddonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.banAdd.enabled": false } },
        
      );
    }

if (rbody["banRemoveonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.banRemove.enabled": true } },
        
      );
}
   if (rbody["banRemoveonoff"] === "false") {   await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.banRemove.enabled": false} },
        
      );
    }
    if (rbody["channelDeleteonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelDelete.enabled": true } },
        
      );
    }if (rbody["channelDeleteonoff"] === "false") {

      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelDelete.enabled": false } },
        
      );
    }
    if (rbody["channelUpdateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelUpdate.enabled": true } },
      
      );
    }
    if (rbody["channelUpdateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelUpdate.enabled": false } },
      
      );
    }
    if (rbody["roleCreateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleCreate.enabled": true } },
      
      );
    }
        if (rbody["roleCreateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleCreate.enabled": false } },
        
      );
    }
    if (rbody["roleDeleteonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleDelete.enabled": true } },
      
      );
    }
    if (rbody["roleDeleteonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleDelete.enabled": false } },
      
      );
    }
    if (rbody["roleUpdateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleUpdate.enabled": true } },
      
      );
    }
    if (rbody["roleUpdateonoff"] === "false") {
    
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleUpdate.enabled": false } },
      
      );
    } if (rbody["messageUpdateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.messageUpdate.enabled": true } },)}
    if (rbody["messageUpdateonoff"] === "false") {


      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.messageUpdate.enabled": false } },)}



if (rbody["messageDeleteonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.messageDelete.enabled": true} })
}
    if (rbody["messageDeleteonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.messageDelete.enabled": false } })
}
console.log(rbody["kickonoff"]==="true")
if (rbody["kickonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.kick.enabled": true } })
}
    if (rbody["kickonoff"] === "false") {
  
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.kick.enabled": false } })}  

  }
);
module.exports = app;
