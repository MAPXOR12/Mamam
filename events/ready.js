
const {ActivityType} = require("discord.js")
module.exports = class {
  async run(bot) {
    try{
      
  await bot.user.setActivity({
      name: `/help | boboworld.xyz` ,
      type: ActivityType.Playing
      
    });

    console.log(`${bot.user.username}: xxxxxxxxxxxxxxx`);
    const checkUnmutes = require("../helpers/Checkunmute.js");
    
const dbl = require("../helpers/dbl.js");
    dbl.init(bot)
    }catch(err){
      console.log(err.message)
    }
  
  }
};
