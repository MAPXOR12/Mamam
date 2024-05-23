const app = require('express').Router();

const channels = global.config.channels;
	  
console.log("Admin/Maintence router loaded.");

app.get("/admin/maintence", global.checkAuth, async (req, res) => {
  let data = await Maintenance.findOne({server: config.serverid});
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    res.render("admin/administrator/maintenance.ejs", {
        bot: global.Client,
        path: req.path,
      data:data,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
      
        channels: global.config.server.channels
    })
});
app.post("/admin/maintence", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    let bakimdata = await Maintenance.findOne({
        server: config.serverid
    });
    if (bakimdata) return res.redirect('../admin/maintence?error=true&message=Maintenance mode has already been activated for this site.');
    bot.channels.cache.get(channels.webstatus).send(`<a:maintence:833375738547535913> BoBo website has been switched to __maintance__ due to **${req.body.reason}**`).then(a => {
        new Maintenance({
            server: config.serverid,
            reason: req.body.reason,
            message: a.id,
          toggle: true,
        }).save();
    })
    return res.redirect('../admin/maintence?success=true&message=Maintence opened.');
});
app.post("/admin/unmaintence", global.checkAuth, async (req, res) => {
    const dc = require("discord.js");
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    let bakimdata = await Maintenance.findOne({
        server: config.serverid
    });
    if (!bakimdata) return res.redirect('../admin/maintence?error=true&message=The website is not in maintenance mode anyway.');
    const bakimsonaerdikardesvcodes = new dc.MessageEmbed()
       /// .setAuthor("", client.user.avatarURL())
        .setThumbnail(bot.user.avatarURL())
        .setColor("GREEN")
        .setDescription(`<a:online:833375738785824788> BoBo are **active** again!\n[Click to redirect website](https://boboworld.tk)`)
        .setFooter("bobo © All rights reserved.");
    await bot.channels.cache.get(channels.webstatus).messages.fetch(bakimdata.message).then(a => {
        a.edit(`~~ <a:maintence:833375738547535913> BoBo Website has been switched to __maintance__ due to **${bakimdata.reason}** ~~`, bakimsonaerdikardesvcodes)
    })
    bot.channels.cache.get(channels.webstatus).send("wuwjwjwkkakaka.").then(b => {
        b.delete({
            timeout: 500
        })
    })
    await Maintenance.deleteOne({
        server: config.serverid
    })
    return res.redirect('../admin/maintence?success=true&message=Maintenance mode has been shut down successfully.');
});

module.exports = app;