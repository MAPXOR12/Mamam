const app = require('express').Router();
const market =require (`${process.cwd()}/shop/market.json`);
const _ = require ('lodash');
app.get("/profile/:userID/edit",global.apiLimiter, global.checkAuth, async (req, res) => {
  
  
  
const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });
if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  
    if(req.params.userID != req.user.id) return res.redirect('/profile/'+req.user.id+'/edit');
   let member= await bot.users.fetch(req.user.id)
        const data = await User.findOne({
            userID: member.id
        });
        res.render("users/profile-edit.ejs", {
        	bot: bot,
            path: req.path,
            config: config,
            user: req.isAuthenticated() ? req.user : null,
            req: req,
            market:market,
            data:data,
          _:_,
            member: member
        });
    });

app.post("/profile/:userID/edit",global.apiLimiter, global.checkAuth, async (req, res) => {
    let rBody = req.body;
  const d = new Date();
  let member = await bot.users.fetch(req.user.id)
    await User.findOneAndUpdate({
        userID: member.id
    }, {
        $set: {
          "attch.background": rBody['background'],
            info: rBody['biography'],
            website: rBody['website'],
            "lastchange.date": Date.now(),
            github: rBody['github'],
            twitter: rBody['twitter'],
            instagram: rBody['instagram'],
          "attch.color": rBody['color']
        }
    }, {
        upsert: true
    })
    return res.redirect('?success=true&message=Your profile has been successfully edited.');
});

module.exports = app;