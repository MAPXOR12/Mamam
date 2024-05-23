const fs = require("fs");
let util = require("util");

const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load Status");


const readdir = util.promisify(fs.readdir);

module.exports = async (bot) => {
  const guild = bot.guilds;
  
  
  
  const init = async () => {
    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach((file) => {
      const eventName = file.split(".")[0];
     // console.log(`Loading Event: ${eventName}`);
      const event = new (require(`../events/${file}`))(bot);
      
      bot.on(eventName, (...args) => event.run(...args, bot));
      delete require.cache[require.resolve(`../events/${file}`)];
    });
  };
  init();
  
};
