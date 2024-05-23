const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const pretty = require("pretty-ms");

app.get("/daily", global.apiLimiter,global.checkAuth, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
    maintenance: "maintenance",
  });

  if (maintenance && maintenance.toggle == "true") {
    return res.render(res, req, "maintenance.ejs");
  }

  const user = await bot.users.fetch(req.user.id);
  if (!user) return;
  let data =
    (await User.findOne({ userID: user.id })) ||
    (await new User({ userID: user.id }));

  if (!user) {
    res.redirect(
      `/error?code=404&message= I can't fetch you, you must be a user of bot then try again`
    );
  }
  let cooldown = 43200000;

  let times = cooldown - (Date.now() - data.time);
  console.log(times)
/*
  let time = {
    h: Math.floor((times % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((times % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((times % (1000 * 60)) / 1000),
  };*/
console.log(new Date(data.time).getTime())
  res.render("./users/daily.ejs", {
    times: times,
    config: config,
    
    support: config.support,
    data: data,
    cooldown: cooldown,
    req: req,
    res: res,

    bot: bot,
    user: req.isAuthenticated() ? req.user : null,
  });
});

app.post("/daily", global.apiLimiter,global.checkAuth, async (req, res) => {
  let user = bot.users.cache.get(req.user.id);

  let cooldown = 43200000;
  let data = await User.findOne({ userID: user.id });
  if (data.time !== null && cooldown - (Date.now() - data.time) > 0) {
    res.redirect(
      `?error=true&message= wait ${ms(
        cooldown - (Date.now() - data.time)
      )} to daily again`
    );
  } else {
    let DR = Math.floor(Math.random() * 2000) + 1000;
    await User.updateOne(
      {
        userID: user.id,
      },

      {
        $set: {
          time: Date.now(),
        },
      }
    );
    await User.updateOne(
      {
        userID: user.id,
      },
      {
        $inc: {
          money: DR,
        },
      }
    );

    res.redirect(`?success=true&message=you are got ${DR}`);
  }
});
module.exports = app;
