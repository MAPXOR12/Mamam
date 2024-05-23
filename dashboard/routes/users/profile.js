const app = require("express").Router();
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const market = require (`${process.cwd()}/shop/market.json`);
console.log("profile router loaded");
const _ = require('lodash');
const pretty = require ("pretty-ms");



function intToString (value) {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}




app.get(
  "/profile/:userID",global.apiLimiter,
  global.checkAuth,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


    const user = await bot.users.fetch(req.params.userID)
    if(!user) res.send("I can't find this user so i can't get profile ");
  let data = await User.findOne({userID: user.id});
    
      res.render("./users/profile.ejs", {
        config: config,
        data:data,
        req: req,
        convert:intToString,
        bot: bot,
        _:_,
        pretty:pretty,
        market:market,
        member:user,
        user: req.isAuthenticated() ? req.user : null,
      })
    });
module.exports = app;
