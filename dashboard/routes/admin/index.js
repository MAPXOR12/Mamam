
const app = require('express').Router();

console.log("Admin/Index router loaded.");
app.get("/admin", global.checkAuth, async (req, res) => {
	let userdata = await User.find();
  let guilddata = await Guild.find();
  let mutedata = await Mute.find()
  let partnerdata = await Partner.find();
  let primedata = await Prime.find();
	let siteD = await Site.findOne({ id: config.clientID });
    res.render("admin/index.ejs", {
    	bot: bot,
      userdata:userdata,
      guilddata:guilddata,
      mutedata: mutedata,
      partnerdata: partnerdata,
      primedata: primedata,
      
        path: req.path,
        config: config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
      
        siteD: siteD
    })
});

app.get("/admin/guildsin", global.checkAuth,async(req,res)=>{
  
  res.render("admin/guildsin.ejs",{
    bot:bot,
   // guilds:guilds,
    req:req,
    user:req.isAuthenticated() ? req.user:null,
  })

})



module.exports = app;