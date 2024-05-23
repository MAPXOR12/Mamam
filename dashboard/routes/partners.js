const app = require("express").Router();

const path = require("path");

///const partnersdata = require("../database/models/partners/partner.js");
console.log(" Partners router loaded.");

app.get("/partners", global.apiLimiter,async (req, res) => {
  const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  res.render("partners.ejs", {
    bot: bot,
    res:res,

    path: req.path,
    config: global.config,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    db: await Partner.find(),
    
  });
});

module.exports = app