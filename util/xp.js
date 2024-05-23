/// xp(message)
async function xp(message, bot, guild, user) {
  /// let guild = await Guild.findOne({guildID: message.guild.id})

  if (!guild.xp.onoff) return;

  let res =
    (await User.findOne({ userID: message.author.id })) ||
    (await new User({ userID: message.author.id }).save());
  if (guild) {
    const max = 3;
    const min = 1;
    const points = Math.floor(Math.random() * (max - min)) + min;
    //const guild = await Guild.findOne({guildID: message.guild.id})

    // Check if the data returned is a valid
    if (!(res instanceof User)) {
      return promise.resolve({ xpAdded: false, reason: "DB_ERROR" });
    }

    /*=======================CALCULATE XP============================*/
    // Some weird math goes here...

    // Get the server data
    let index = res.data.xp.findIndex((x) => x.id === message.guild.id);
    let serverdata;

    // Add serverdata to profile if it doesn't exist yet
    // -1 means the index couldn't be found
    if (index === -1) {
      res.data.xp.push({
        id: message.guild.id,
        xp: 0,
        level: 1,
      });
      index = res.data.xp.findIndex((x) => x.id === message.guild.id);
      [serverdata] = res.data.xp.splice(index, 1);
    } else {
      [serverdata] = res.data.xp.splice(index, 1);
    }

    // define points
    let _xp = {
      global: {
        get cap() {
          return (
            50 * Math.pow(res.data.global_level, 2) +
            250 * res.data.global_level
          );
        },
        get next() {
          return this.cap - res.data.global_xp;
        },
      },
      local: {
        get cap() {
          return 50 * Math.pow(serverdata.level, 2) + 250 * serverdata.level;
        },
        get next() {
          return this.cap - serverdata.xp;
        },
      },
    };

    // PROCESS GLOBAL XP
    // Add 3xp xp add on global based xp
    // Increment level if next is less than the current xp
    res.data.global_xp = res.data.global_xp + 100;
    while (_xp.global.next < 1) {
      res.data.global_level++;
    }

    // PROCESS LOCAL XP
    // Add points which was previously randomized on server[local] based xp
    // increment level if next is less than the current xp.
    serverdata.xp = serverdata.xp + points;
    while (_xp.local.next < 1) {
      serverdata.level++;

      let channel = bot.channels.cache.find((c) => c.id === guild.xp.channel);
      if (channel) {
        let xpmessage = guild.xp.message
          .replace(/{user}/, message.author.toString())
          .replace(/{level}/, serverdata.level);

        channel.send({ content: xpmessage });
      } else {
        let xpmessage = guild.xp.message
          .replace(/{user}/, message.author.toString())
          .replace(/{level}/, serverdata.level);
        await message.channel.send({ content: xpmessage }).catch(() => {});
      }
    }

    // Add xpdata again to the xp array of the profile
    // index = where the serverdata is inserted
    // 0 = number of elements to remove
    // serverdata = the inserted data
    res.data.xp.splice(index, 0, serverdata);

    // Save the new data
    return res
      .save()
      .then(() => {
        xp.set(message.author.id, {});
        setTimeout(() => xp.delete(message.author.id), 60000);
        return { xpAdded: true, reason: null };
      })
      .catch(() => {
        return { xpAdded: false, reason: "DB_ERROR_ON_SAVE" };
      });
  }
}

module.exports = xp;
