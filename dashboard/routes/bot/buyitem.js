const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
const text = require(`${process.cwd()}/util/string`);

const market = require(`${process.cwd()}/shop/market.json`);
app.get("/item/:id", global.apiLimiter,global.checkAuth, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });
  
if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  
  const id = market.find((x) => x.id == req.params.id);
/*
  const user = await bot.users.fetch(req.user.id);*/
  let data = await User.findOne({ userID: req.user.id });
  res.render("./bot/buyitem.ejs", {
    id: id,
    config: config,
    market: market,
    data: data,
    req: req,
    img: id?.assets.link,
    bot: bot,

    user: req.isAuthenticated() ? req.user : null,
  });
});

app.post("/item/:id", global.apiLimiter,global.checkAuth, async (req, res) => {
  const id = market.find((x) => x.id == req.params.id);
  let rbody = req.body;
/*
  let user = await bot.users.fetch(req.user.id);*/
  let data = await User.findOne({ userID: req.user.id });

  let amt;
  amt = Math.floor(Math.abs(amt)) || 1;
  
  const total = id.price * amt;

  if (!id.price && amt > 1) {
    res.redirect(
      '?error=true&message="You may only have 1 free item at a time'
    );
  } else if (data.money < total) {
    res.redirect(
      `?error=true&message=You do not have enough credits to proceed with this transaction! You need ${text.commatize(
        total
      )} for **${amt}x ${id.name}**`
    );
  } else if (data.inventory.find((x) => x.id === id.id) && !id.price) {
    res.redirect(`?error=true&message=You have may only 1 free item at time`);
  } else {
    const old = data.inventory.find((x) => x.id === id.id);

    if (old) {
      const inv = data.inventory;
      let x = data.inventory.splice(
        inv.findIndex((x) => x.id === old.id),
        1
      )[0];

      x.amount = x.amount + amt;
      data.inventory.push(x);
    } else {
      data.inventory.push({
        id: id.id,
        amount: amt,
        
      });
    }
    if(rbody ["background"] === "true"){
      data.attch[id.type] = id.assets.link
    }
    data.money = data.money - total;
    return data.save().then(() => {
      res.redirect(`?success=true&message=successfully`);
    });
  }
});
module.exports = app;
