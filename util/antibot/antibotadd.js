async function botadd(member){

if (
      !member.guild.members.me.permissions.has([
        "ManageGuild",
        "ManageChannels","ViewAuditLog"
        
      ])
    ); return;
    
try {
      member.guild.fetch().then(async (guild) => {
       const guildData = await Antis.findOne({ guildID: member.guild.id });
      if (!guildData) { Antis.create({ guildID: member.guild.id }); }
        if (member.user.bot && guildData?.bot.enabled) await member.kick("bot was added and antibot is on");
    })
    }catch (err) {
      return console.log(err)
}


  
}
module.exports = botadd;