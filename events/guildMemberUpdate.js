const { Discord} = require ("discord.js")

module.exports = class{
  async run( oldMember, newMember){
    
    
    
    

    try{
      let data = await Guild.findOne({guildID: oldMember.guild.id}) || new Guild({guildID: oldMember.guild.id}).save();
    if (!oldMember.guild.members.me.permissions.has(["ManageGuild", "ManageChannels"])) return;

       const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
   
      
    
    if(!data.plugins.logs.memberUpdate){
      
await Guild.updateOne({guildID: oldMember.guild.id},
{ $set:{ "plugins.logs.memberUpdate.enabled":false,
        
"plugins.logs.memberUpdate.channel":null ,

"plugins.logs.memberUpdate.color":null ,}})
    }
      if(data.plugins.logs.memberUpdate.enabled){
 var logChannel = oldMember.guild.channels.cache.get(data.plugins.logs.memberUpdate.channel);
 
 if (!logChannel) return;
 oldMember.guild.fetchAuditLogs().then(logs => {
   
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  var userTag = logs.entries.first().executor.tag;
  if (oldMember.nickname !== newMember.nickname) {
   if (oldMember.nickname === null) {
    var oldNM = "``???? ??????``";
   } else {
    var oldNM = oldMember.nickname;
   }
   if (newMember.nickname === null) {
    var newNM = "``???? ??????``";
   } else {
    var newNM = newMember.nickname;
   }
   let updateNickname = new Discord.EmbedBuilder()
    .setTitle("**UPDATE MEMBER NICKNAME**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(oldMember.guild.name, oldMember.guild.iconURL());
   logChannel.send({embeds:[updateNickname]});
 
  }
  if (oldMember.roles.cache.size < newMember.roles.cache.size) {
   let role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();
   let roleAdded = new Discord.EmbedBuilder()
    .setTitle("**ADDED ROLE TO MEMBER**")
    .setThumbnail(oldMember.guild.iconURL())
    .setColor("RANDOM")
    .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send({embeds:[roleAdded]});
   }
   if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    let role = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();
    let roleRemoved = new Discord.EmbedBuilder()
     .setTitle("**REMOVED ROLE FROM MEMBER**")
     .setThumbnail(oldMember.guild.iconURL())
     .setColor("RANDOM")
   .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send({embeds:[roleRemoved]});
  }
 });
 if (oldMember.guild.ownerId !== newMember.guild.ownerId) {
  let newOwner = new Discord.EmbedBuilder()
   .setTitle("**UPDATE GUILD OWNER**")
   .setThumbnail(oldMember.guild.iconURL())
   .setColor("RANDOM")
   .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The OwnerShip.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
   .setTimestamp()
   .setFooter(oldMember.guild.name, oldMember.guild.iconURL());
  logChannel.send({embeds:[newOwner]});
 } }
} catch (err) {
  return console.log(err);
}

}}
