const app = require("express").Router();
const path = require("path");

app.get("/",async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
    maintenance: "maintenance",
  });
  if (maintenance && maintenance.toggle === "true") {
    return res.render(res, req, "maintenance.ejs");
  }
  const hama = bot.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );
  
  res.render("index.ejs", {
    config: config,
    support: config.support,
    req: req,
    guild: hama,
    bot: bot,
 user: req.isAuthenticated() ? req.user : null,
  });
});
app.get("/support", async (req, res, next) => {
  res.redirect(config.support);
});

app.get("/tos",global.apiLimiter, async (req, res) => {
  res.render("tos.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    bot: bot,
    req: req,
  });
});
/*
app.post("/language", global.checkAuth,async(req,res)=>{
  const user = await bot.users.fetch(req.user.id)
  if(!user) res.send("I can't find  you")
const language= await Lang.findOne({userID:req.user.id})
if(!language){
await Lang.create({userID:user.id,
                   language:"english"
                  });
}
  console.log("eeeee")
  const rbody = req.body;
  if(language){
    await Lang.updateOne({userID:user.id},{
      $set:{
        language:rbody["language"] ||"en",
        date: Date.now()
      }
    })
    
  }

})*/
app.get("/be-partner",global.apiLimiter, async (req, res) => {
  const maintenance = await Maintenance.findOne({
    maintenance: "maintenance",
  });
  if (maintenance && maintenance.toggle == "true") {
    return res.render(res, req, "maintenance.ejs");
  }

  res.render("be-partner.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    req: req,
  });
});
app.get("/commands",global.apiLimiter, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
    maintenance: "maintenance",
  });

  if (maintenance && maintenance.toggle == "true") {
    return res.render(res, req, "maintenance.ejs");
  }

  res.render("./bot/commands.ejs", {
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    bot: bot,
  });
});
app.get("/downtime", global.apiLimiter,global.checkAuth, async (req, res) => {
  let maintenc = await Maintenance.findOne({ server: config.serverid });
  if (maintenc) {
    res.render("maintenance.ejs", {
      user: req.isAuthenticated() ? req.user : null,
      bot: bot,
      data: maintenc,
      config: config,
    });
  } else {
    res.redirect("/");
  }
});
app.get("/bans", global.apiLimiter,async (req, res) => {
  const maintenance = await Maintenance.findOne({
    server: config.serverid,
  });

  if (maintenance && maintenance.toggle == "true") {
    return res.render(res, req, "maintenance.ejs");
  }

  res.render("bans.ejs", {
    // data:data,
    bot: bot,
    req: req,
    user: req.isAuthenticated() ? req.user : null,
  });
});
app.get("/invite", global.apiLimiter,(req, res, next) => {
  res.redirect(config.invitelink);
});
module.exports = app;
