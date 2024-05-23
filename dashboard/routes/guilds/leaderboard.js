const app = require("express").Router();
const path = require("path");
const type = require ('typed.js')
app.get("/dashboard/:guildID/leaderboard",global.checkAuth,global.apiLimiter,async(req, res,next)=> {
  const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  const guild = await bot.guilds.cache.get(req.params.guildID);
  let user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("ManageGuild")) {
      res.send("You can't access to this page");
    }
  return User.find({ 'data.xp.id':guild.id}).exec( async (err, docs) => {
  
    
    
    
    docs = docs.map(x => { return { id: x.userID, data: x.data.xp.find(x => x.id === guild.id)};})
      .sort((A,B) => B.data.xp - A.data.xp) // Arrange by points, descending.
      .filter(x => x.data.xp); // Remove document where xp is 0.
const members = await guild.members
      .fetch({ user: docs.slice(0,10).map(x => x.id) })
      .catch(() => null)

  res.render("./guild/leaderboard.ejs", {
    config: config,
    members: members,
    docs:docs,
    req: req,
 guild:guild,
    
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 
})

module.exports = app;
