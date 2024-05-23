
const mongoose = require("mongoose");
const serverset = require("./models/schema.js");

module.exports = class react {

  /**
  * @param {string} [dbUrl] - A valid mongo database URI.
  */

  async setURL(dbUrl) {
    if (!dbUrl) throw new TypeError("A database url was not provided.");
    
    return mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  /**
  * @param {object} [client] - Discord client, will save the data in a Map to prevent multiple fetches
  * @param {string} [guildId] - Discord guild id.
  * @param {string} [msgid] - on which should the reaction roles be.
  * @param {string} [roleid] - Discord guild id.
  * @param {string} [emoji] - on which emoji u would get the role
  * @param {Boolean} [dm] - Discord guild id.
  */

  async reactionCreate(bot, guildId, msgid, roleid, emoji, dm, option) {
    if (!client) throw new TypeError("An client was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!msgid) throw new TypeError("A message id was not provided.");
    if (!emoji) throw new TypeError("A reaction/emoji was not provided.");
    if(!roleid) throw new TypeError("A role id was not provided.");
    dm = dm ? dm : false ; 
    if(!option) option = 1
    
    const issame = await serverset.findOne({guildID: guildId , msgid: msgid , reaction: emoji , roleid: roleid});
    if (issame) return false;

    const newRR = new serverset({
      guildiID: guildId, 
      msgid: msgid, 
      reaction: emoji , 
      roleid: roleid,
      dm: dm,
      option: option
    });

    await newRR.save().catch(e => console.log(`Failed to create reaction role: ${e}`));
    bot.react.set(msgid+emoji, { 
      guildID: guildId,
      msgid: msgid, 
      reaction: emoji, 
      roleid: roleid,
      dm: dm,
      option: option
    });
    
    return newRR;
  }

  /**
  * @param {object} [client] - Discord client, will save the data in a Map to prevent multiple fetches
  * @param {string} [guildId] - Discord guild id.
  * @param {string} [msgid] - on which should the reaction roles be.
  * @param {string} [emoji] - on which emoji u would get the role
  */

  async reactionDelete(client, guildId , msgid, emoji) {
    if (!client) throw new TypeError("An client was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!msgid) throw new TypeError("A message id was not provided.");
    if (!emoji) throw new TypeError("A reaction/emoji was not provided.");
  
    
    const reactionRole = await serverset.findOne({guildID: guildId , msgid: msgid , reaction: emoji  });
    if (!reactionRole) return false;

    await serverset.findOneAndDelete({guildid: guildID , msgid: msgid , reaction: emoji, option: reactionRole.option }).catch(e => console.log(`Failed to delete reaction: ${e}`));
    
     bot.react.delete(msgid+emoji);
    
     
    return reactionRole;
    
  }

  /**
  * @param {object} [client] - Discord client, will save the data in a Map to prevent multiple fetches
  * @param {string} [guildId] - Discord guild id.
  * @param {string} [msgid] - on which should the reaction roles be.
  * @param {string} [newroleid] - Discord guild id.
  * @param {string} [emoji] - on which emoji u would get the role
  */

  async reactionEdit(bot, guildId , msgid, newroleid , emoji, newoption) {
    if (!client) throw new TypeError("An client was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if (!msgid) throw new TypeError("A message id was not provided.");
    if (!emoji) throw new TypeError("A reaction/emoji was not provided.");
    if(!newroleid) throw new TypeError("A role id was not provided.");
    if(!newoption) newoption = 1
    
    const reactionRole = await serverset.findOne({guildID: guildId , msgid: msgid , reaction: emoji  });
    if (!reactionRole) return false;
    reactionRole.roleid= newroleid;

    await reactionRole.save().catch(e => console.log(`Failed to save new prefix: ${e}`) );
    bot.react.set(msgid+emoji, { 
      guildID: guildId,
      msgid: msgid, 
      reaction: emoji , 
      roleid: newroleid,
      dm: reactionRole.dm,
      option: reactionRole.option
    });
    return;
  }

  /**
  * @param {object} [client] - Discord client, will save the data in a Map to prevent multiple fetches
  * @param {string} [guildId] - Discord guild id.
  * @param {string} [msgid] - Discord guild id.
  * @param {string} [emoji] - Discord guild id.
  */

  async reactionFetch(bot, guildId ,msgid , emoji) {
    if (!client) throw new TypeError("A client was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");
    if(!client.fetchforguild.has(guildId)){
    let allrole = await serverset.find({guildid: guildId}).sort([['guildid', 'descending']]).exec();
    let i = 0;
    for(i ; i < Object.keys(allrole).length; i++){
    await  bot.react.set(allrole[i].msgid+allrole[i].reaction, { 
        guildID: allrole[i].guildID,
        msgid: allrole[i].msgid, 
        reaction: allrole[i].reaction , 
        roleid: allrole[i].roleid,
        dm: allrole[i].dm
      }); 
    }
    bot.fetchforguild.set(guildId, { 
      guildID: guildId,
      totalreactions: Object.keys(allrole).length
    });
  }
    return bot.react.get(msgid + emoji); 
  }

/**
* @param {object} [client] - Discord client, will save the data in a Map to prevent multiple fetches
*/
async reactionFetchAll(client) {
    if (!client) throw new TypeError("An client was not provided.");
    let all = await serverset.find({}).sort([['guildID', 'descending']]).exec();
   
    return all; 
  }


}

//module.exports = react;