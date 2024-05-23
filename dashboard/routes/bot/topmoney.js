const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");

function intToString (value) {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}


app.get("/top/money", global.checkAuth, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });
  
  
if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


    return User.find({}).exec(async (err, docs) => {
      docs = docs
        .map((x) => {
          return { id: x.userID, money:x.money };
        })
        .sort((A, B) => B.money - A.money) // Arrange by points, descending.
   // Remove document where xp is 0.
   const users = await bot.users.fetch({ user: docs.slice(0,100).map(x => x.id) })
      .catch(() => null)
   
   
   
   
   
      res.render("./bot/topmoney.ejs", {
        convert:intToString,
        users:users,
        config: config,
        support: config.support,
      docs: docs,
      
        req: req,
        res: res,

        bot: bot,
        user: req.isAuthenticated() ? req.user : null,
      });
    });
  });
module.exports = app;
