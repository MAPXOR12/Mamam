const app = require('express').Router();

console.log(" Admin/Ban router loaded.");

app.get("/admin/userban", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    let bandata = await Ban.find();
    res.render("admin/administrator/user-ban.ejs", {
        bot: bot,
        path: req.path,
        config: config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
    
        bandata: bandata
    })
});
app.post("/admin/userban", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    new Ban({
        user: req.body.userID,
        reason: req.body.reason,
        moderator: req.user.id
    }).save()
    return res.redirect('../admin/userban?success=true&message=User banned.');
});
app.post("/admin/userunban", global.checkAuth, async (req, res) => {
    if (!config.owners.includes(req.user.id)) return res.redirect('../admin');
    Ban.deleteOne({
        user: req.body.userID
  
    })
    return res.redirect('../admin/userban?success=true&message=User ban removed.');
});

module.exports = app;