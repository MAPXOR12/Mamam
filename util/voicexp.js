
       /// xp(message)
        async function voicexp(message,bot,guild,user){
         /// let guild = await Guild.findOne({guildID: message.guild.id})
                                          
  const max = 205;
  const min = 10;
  const points = Math.floor(Math.random() * (max-min)) + min;
//const guild = await Guild.findOne({guildID: message.guild.id})

  let res = await User.findOneAndUpdate({ userID: message.author.id }) ||
  await new User({ userID: message.author.id }).save();

  // Check if the data returned is a valid
  if (!(res instanceof User)){
    return promise.resolve({ xpAdded: false, reason: 'DB_ERROR'})
  };

  /*=======================CALCULATE XP============================*/
  // Some weird math goes here...

  // Get the server data
  let index = res.data.voice.findIndex(x => x.id === message.guild.id);
  let serverdata;

  // Add serverdata to profile if it doesn't exist yet
  // -1 means the index couldn't be found
  if (index === -1){
    res.data.voice.push({
      id: message.guild.id,
      voice: 0,
      level: 1
    });
    index = res.data.xp.findIndex(x => x.id === message.guild.id);
    [ serverdata ] = res.data. voice.splice(index,1);
  } else {
    [ serverdata ] = res.data. voice.splice(index,1);
  };

  // define points
  let _xp = {
   /* global: {
      get cap(){ return (50 * Math.pow(res.data.global_level,2)) + (250 * res.data.global_level); },
      get next(){ return this.cap -  res.data.global_xp; },
    },*/
    local: {
      get cap(){ return (50 * Math.pow(serverdata.level,2)) + (250 * serverdata.level); },
      get next(){ return this.cap - serverdata.voice }
    }
  };

  // PROCESS GLOBAL XP
  // Add 3xp xp add on global based xp
  // Increment level if next is less than the current xp
  /*res.data.global_xp = res.data.global_xp + 3;
  while (_xp.global.next < 1){
    res.data.global_level++
    /*
if(guild){
  
  let channel = bot.channels.cache.find(c=>c.id===guild.channels.xp)
  
    channel.send({content:`Congratulations ${message.author.toString()}, your leveled up to ${serverdata.level}!!`})
}else{
  message.channel.send({content:`Congratulations ${message.author.toString()}, you leveled up to ${serverdata.level}!!`})

  }}*/

  // PROCESS LOCAL XP
  // Add points which was previously randomized on server[local] based xp
  // increment level if next is less than the current xp.
  serverdata.voice = serverdata.voice + points;
  while (_xp.local.next < 1){
    serverdata.level++
    if(guild){
     /* let channel =bot.channels.cache.find(c=> c.id === guild.channels.xp)
      
     if(channel){channel.send({content:`Congratulations ${message.author.tag}, your leveled up to ${serverdata.level}!!`}).catch(()=>{})
       
       
     }*/}else{
       
    return message.channel.send({content:`Congratulations ${message.author.tag}, your leveled up to ${serverdata.level}!!`}).catch(()=>{})

  }}

  // Add xpdata again to the xp array of the profile
  // index = where the serverdata is inserted
  // 0 = number of elements to remove
  // serverdata = the inserted data
  res.data. voice.splice(index, 0, serverdata);

  // Save the new data
  return res.save()
  .then(() => {
    xp.set(message.author.id, {});
    setTimeout(() => xp.delete(message.author.id), 60000);
    return { xpAdded: true, reason: null };
  })
  .catch(() => {
    return { xpAdded: false, reason: 'DB_ERROR_ON_SAVE' }
  });}
        
        module.exports = voicexp;
        