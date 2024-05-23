const profile = require(`${process.cwd()}/data/user`);

    module.exports = {
  name: "xpreset",
  aliases: ["xpreset"],
  
  description:"Rese all xp from members on server",
  enabled: true,			    
  memberPermissions: [ "MANAGE_GUILD" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 8000,
  run: async (bot, message, args, dev) => {
 



await message.channel.send({content:`This will **reset** all experience points in this server (Action irreversible). Continue?`});
    const collector = message.channel.createMessageCollector( res => message.author.id === res.author.id);

    const continued = await new Promise(resolve => {
      setTimeout(()=> collector.stop('TIMEOUT'), 30000);
      collector.on('collect', message => {
        if (['y','yes'].includes(message.content.toLowerCase())) return resolve(true);
        if (['n','no'].includes(message.content.toLowerCase())) return resolve(false);
      }).on('end', () => resolve(false));
    });

    if (!continued){
      return message.channel.send({content:`\\❌ **${message.author.tag}**, cancelled the xpreset command!`});
    };


    let res = await  profile.updateMany({'data.xp.id': message.guild.id },{
      $pull: { 'data.xp' : { id: message.guild.id }}
    }).catch((err)=>{
      if (err){
        return message.channel.send({content:`\`❌ [DATABASE_ERR]:\` The database responded with error: ${err.name}`});
      }})
    if (res.nModified == 0){
        return message.channel.send({content:`\\❌ **${message.author.tag}**, this server has no xp data to be cleared of!`});
      } else {
        return message.channel.send({content:`\\✔️ **${message.author.tag}**, this server's xp has been reset. (Cleared **${res.nModified}** xpdocs)`});
      };
    
  }}