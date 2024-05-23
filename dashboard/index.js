const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Discord = require("discord.js");

const app = express();
const MemoryStore = require("memorystore")(session);
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser"),
      refresh = require('passport-oauth2-refresh');;
const referrerPolicy = require("referrer-policy");
app.use(referrerPolicy({ policy: "strict-origin" }));
const rateLimit = require("express-rate-limit");
var MongoStore = require("rate-limit-mongo");

const id = config.clientID;
const callback = config.callback;
const secret = config.secret;
const axios = require("axios")
// MODELS

module.exports = async (bot) => {
  global.apiLimiter = rateLimit({
    store: new MongoStore({
      uri: config.mongoURL,
      collectionName: "rate-limit",
      expireTimeMs: 60 * 60 * 1000,
      resetExpireDateOnChange: true,
    }),
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: {
      error: true,
      message:
        "Too many requests, you have been rate limited. Please try again in one hour.",
    },
  });

  var minifyHTML = require("express-minify-html-terser");
  app.use(
    minifyHTML({
      override: true,
      exception_url: false,
      htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
      },
    })
  );

  app.set("views", path.join(__dirname, "/views"));

  app.use(express.static(path.join(__dirname, "/public")));

  const templateDir = path.resolve(
    `${process.cwd()}${path.sep}dashboard/views`
  );

  app.use(
    "/img",
    express.static(path.resolve(`${templateDir}${path.sep}public/img`))
  );
  app.use(
    "/css",
    express.static(path.resolve(`${templateDir}${path.sep}public/css`))
  );
  
  
  app.use("/js", express.static(path.resolve(`${templateDir}${path.sep}public/js`)));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
var scopes = ['identify', 'email', 'guilds', 'guilds.join']
  
  
  passport.use(
    new Strategy(
      {
        clientID: config.clientID,

        clientSecret: config.secret,
        callbackURL: config.callback,
        scope:scopes
      },

      async function (accessToken, refreshToken, profile, done){
    process.nextTick(() => done(null, profile));

    
        
       const { id, username, discriminator, avatar, guilds } = profile;
        ///   console.log(id, username, discriminator, avatar, guilds);

        try {
          const findUser = await User.findOneAndUpdate(
            { userID: id },

            { new: true }
          );
          if (findUser) {
            console.log("User was found");
            // return done(null, findUser);
          } else {
            const newUser = await User.create({
              userID: id,
            });
            //return done(null, newUser);
          }
        } catch (err) {
          console.log(err);
          /// return done(err, null);
        }

        // console.log(profile);
      }))
  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret:
        "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      
      cookie: { maxAge: 60000 * 60 * 24 },
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.engine("ejs", ejs.renderFile);
  app.set("view engine", "ejs");

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  global.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };
  app.get(
    "/login",
    (req, res, next) => {
    
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
      }
      next();
    
    },
    passport.authenticate("discord",{prompt:"none"}))
  app.get(
    "/callback",
    passport.authenticate('discord', {failureRedirect: "/" }),
  
    async (req, res,next) => {
  
      let maintenc = await Maintenance.findOne({ server: config.serverid });
      if (maintenc) {
        res.redirect("/downtime");
      } else {
        let banned = await Ban.findOne({ user: req.user.id });
        if (banned) {
          req.logout(function(err){
if(err){ return next(err);}
            res.redirect("/bans");
    
            req.logout();
          });
        } else {
         
           
      /*
          try {
              const request = require('request');
              request({
                  url: `https://discordapp.com/api/v9/guilds/${config.serverid}/members/${req.user.id}`,
                  method: "PUT",
                  json: { access_token: req.user.accessToken },
                  headers: { "Authorization": `Bot ${bot.token}` }
              });
        } catch(err) {console.log(err)};
          */
try {
        axios({
            url: `https://discordapp.com/api/v10/guilds/${config.serverid}/members/${req.user.id}`,
            method: "PUT",
            data: {
                access_token: req.user.accessToken,
            },
            headers: {
                Authorization: `Bot ${bot.token}`,
                "Content-Type": "application/json",
            },
        }).catch((err) => {console.log(err.message) });
    } catch(err) { console.log(err.message)};

          
          
          
            res.redirect(`/dashboard`);
        }
      }
    }
  );
  app.get('/logout', function(req, res,next){

  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });})


  
  app.use(async (req, res, next) => {
  
    var getIP = require("ipware")().get_ip;
    var ipInfo = getIP(req);
    var geoip = require("geoip-lite");
    var ip = ipInfo.clientIp;
    var geo = geoip.lookup(ip);

    if (geo) {
      await Site.updateOne(
        { id: config.clientID },
        { $set: { [`country.${geo.country}` || null]: 1 } }
      );
    }
    return next();
  });
  const http = require("http").createServer(app);
  const io = require("socket.io")(http);
  io.on("connection", (socket) => {
    io.emit("userCount", io.engine.clientsCount);
    console.log("User connected")
  });
  http.listen(3000, () => {
    console.log("Website running on 3000 port.");
  });

  //------------------- Routers -------------------//

  /* General */

  app.use(async (req, res, next) => {
    if (req.path.includes("/admin")) {
      if (req.isAuthenticated()) {
        
        let guild = await bot.guilds.cache.get(config.serverid);
        let member = await guild.members.fetch(req.user.id);
  if(member.roles.cache.get(config.server.role.adminstrator || config.server.role.moderator || req.user.id === "768944616724103170")){
     
     
    next();
      
        } else {
          res.redirect(
            "/error?code=403&message=You is not competent to do this."
          );
        }
      } else {
        req.session.backURL = req.url;
        res.redirect("/login");
      }
    } else {
      next();
    }
  
  
  
  });


  console.log("\x1b[36m%s\x1b[0m", "Admin Panel system routers loading...");
  sleep(3000);
  // app.use("/arc-sw.js", require("../arc-sw.js"))
  app.use("/", require("./routes/admin/index.js"));
  app.use("/", require("./routes/admin/ban.js"));
  app.use("/", require("./routes/admin/news.js"));
  app.use("/", require("./routes/admin/partner.js"));
  app.use("/", require("./routes/admin/maintenance.js"));

  //////bot
//  app.use("/", require("./routes/bot/discord.js"))
  app.use("/", require("./routes/bot/buyitem.js"));
  app.use("/", require("./routes/bot/topmoney.js"));
  app.use("/", require("./routes/bot/topxp.js"));
  app.use("/", require("./routes/bot/items.js"));
  ///////user
  app.use("/", require("./routes/users/daily.js"));
  app.use("/", require("./routes/users/profile-edit"));
  app.use("/", require("./routes/users/profile.js"));

  ///guilds

  app.use("/", require("./routes/guilds/leaderboard.js"));
  app.use("/", require("./routes/guilds/welcome.js"));
  app.use("/", require("./routes/guilds/autorole.js"));
  app.use("/", require ("./routes/guilds/security.js"));
  app.use("/", require("./routes/guilds/logs.js"));
  app.use("/", require("./routes/index.js"));
  app.use("/", require("./routes/partners.js"));
  app.use("/", require("./routes/users/dashboard.js"));
  app.use("/", require("./routes/guilds/setting.js"));
  app.use("/", require("./routes/guilds/dashboard.js"));
  app.use("/", require("./routes/guilds/discord-guild.js"));
  app.use("/", require("./routes/guilds/xpsystem"));

  app.use((req, res) => {
    req.query.code = 404;
    req.query.message = `Page not found.`;
    res.status(404).render("error.ejs", {
      bot: bot,
      path: req.path,
      config: config,
      user: req.isAuthenticated() ? req.user : null,
      req: req,
    });
  });
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
