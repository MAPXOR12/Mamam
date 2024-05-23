const app = require("express").Router();
const Discord = require("discord.js");
const news = require("../../../data/news.js")
const path = require("path");

console.log(": Admin/newssssss router loaded.");

app.get("/admin/news", global.checkAuth, async (req, res) => {

  if (!config.owners.includes(req.user.id)) return res.redirect("../admin");

  res.render("admin/administrator/news.ejs", {
    bot: bot,
    data: news,
    path: req.path,
    config: config,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
  });
})

app.post("/admin/news", global.checkAuth, async (req, res) => {
 
  
  
  
  const rbody = req.body;
  

  const embed = new Discord.EmbedBuilder()
    .setTitle(rbody["title"])
    .setColor(config.embed.Color)
    .setDescription(rbody["description"]);
  console.log("ehheeh")
  if (!news.news){
      return await news.create({
          
          Title: rbody["Title"],
        Author: rbody["Author"],
           Image: rbody["Image"],

         description: rbody["description"],
        
          tag: "768944616724103170",
          time: new Date(),
        })}
      (await news.updateOne({
          Title:rbody["Title"],
        Author: rbody["Author"],
        Image: rbody["Image"],
        description: rbody["description"],
          tag: "768944616724103170",
          time: new Date(),
        }))
  
  let guild = await bot.guilds.cache.get(config.serverid);
  let channel = guild.channels.cache.get(config.channels.news);
  channel.send({embeds:[embed]})
 // channel.send({ embeds: [embed] });
  return res.redirect("../admin/news?success=true&message= news  send.");
});

module.exports = app;
