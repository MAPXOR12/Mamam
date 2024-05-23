const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
const market = require(`${process.cwd()}/shop/market.json`);
app.get("/items", global.checkAuth, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
    maintenance: "maintenance",
  });

  if (maintenance && maintenance.toggle == "true") {
    return res.render(res, req, "maintenance.ejs");
  }/*

  const user = await bot.users.fetch(req.user.id);*/
  let data = await User.findOne({ userID: req.user.id});
  if(!data){ return await User.create({
    userID: req.user.id
  })}
  res.render("./bot/items.ejs", {
    config: config,
    market: market,
    data: data,
    req: req,
    bot: bot,

    user: req.isAuthenticated() ? req.user : null,
  });
});

module.exports = app;
