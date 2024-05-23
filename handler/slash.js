
  const fs = require("fs");
    const ascii = require("ascii-table");

    let slash = []

    const table = new ascii().setHeading(" Slash Commands", "Load Status");
  module.exports = async(bot)=>{
    try{
    const commandFolders = fs.readdirSync("./C-slash");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./C-slash/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../C-slash/${folder}/${file}`);
        if (command.name) {
          bot.slash.set(command.name, command);
          slash.push(command)
          table.addRow(file, "✔️");
        } else {
          table.addRow(
            file,
            "❌ => Missing a help.name or help.name is not in string"
          );
          continue;
        }
      }
     // console.log(table.toString());
    }
    bot.on("ready", async() => {
      try{
      await bot.application.commands.set(slash)
      } catch (err){
        console.log(err.message,err.lineNumber)}


    })
  }catch(err){
      console.log(err)
  }}
  
  