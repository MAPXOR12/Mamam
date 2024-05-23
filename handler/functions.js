async function dj(bot, member, song,guildId) {
    //if no message added return
    if(!bot) return false;
    //get the adminroles
let data = await Guild.findOne({guildID:guildId})
  if(!data) return;
    var roleid = data.plugins.music.dj
    //if no dj roles return false, so that it continues
    if (String(roleid) == "") return false;

    //define variables
    var isdj = false;

    //loop through the roles
    for (let i = 0; i < roleid.length; i++) {
        //if the role does not exist, then skip this current loop run
        if (!member.guild.roles.cache.get(roleid[i])) continue;
        //if he has role set var to true
        if (member.roles.cache.has(roleid[i])) isdj = true;
        //add the role to the string
    }
    //if no dj and not an admin, return the string
    if (!isdj && !member.permissions.has("Administrator") && song.user.id != member.id)
        return roleid.map(i=>`<@&${i}>`).join(", ");
    //if he is a dj or admin, then return false, which will continue the cmd
    else
        return false;
}
