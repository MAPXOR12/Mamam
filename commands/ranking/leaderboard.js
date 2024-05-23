const Discord = require("discord.js");
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const text = require('../../util/string');
const profile = require('../../data/user');


module.exports = {
  name: "leaderboard",
  aliases: ["leaderboard","top"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 10000,
  run: async (bot, message, args, [page]) => {
  

        const embed = new Discord.MessageEmbed()    
        
        . setDescription ("The Leaderboard moved to Dashboard see here")
        .setURL(`https://boboworld.tk/dashboard/guild/${message.guild.id}/leadrboard`)
       return  message.channel.send({embeds:[embed]})
    
  
    /*
    
   return profile.find({ 'data.xp.id': message.guild.id }).exec( async (err, docs) => {
      if (err) {
        return message.channel.send({embeds:[
          embed.setAuthor({text:'Database Error'},'https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
          .setDescription('\'s Database Provider responded with an error: ' + err.name)
       ]});
      };

      docs = docs.map(x => { return { id: x.userID, data: x.data.xp.find(x => x.id === message.guild.id)};})
      .sort((A,B) => B.data.xp - A.data.xp) // Arrange by points, descending.
      .filter(x => x.data.xp); // Remove document where xp is 0.

      if (!docs.length){
        return message.channel.send({embeds:[
          embed.setDescription([
            `**${message.member.displayName}**, No XP found.\n\n`,
            'Users in this server have not started earning XP yet!\n',
            '[loading]() about Bobo\'s XP System.'
          ].join('\n'))
          .setAuthor('No XP','https://cdn.discordapp.com/emojis/767062250279927818.png?v=1')
        ]});
      };

      const members = await message.guild.members
      .fetch({ user: docs.slice(0,10).map(x => x.id) })
      .catch(() => null)

      return message.channel.send({embeds:[
        new Discord.MessageEmbed()
        .setColor(config.embed.Color)
        .setFooter(`XP Leaderboard | \©️${new Date().getFullYear()} Bobo`)
        .setAuthor(`🏆 ${message.guild.name} Leaderboard`, message.guild.iconURL({format: 'png', dynamic: true }) || null)
        .addField(`**${members.get(docs[0].id)?.displayName || '<Unknown User>'}** ranked the highest with **${text.commatize(docs[0].data.xp)}**XP!`,
        [
          '```properties',
          '╭═══════╤═══════╤════════╤════════════════════════════╮',
          '┃  Rank ┃ Level ┃     XP ┃ User                               ┃',
          '╞═══════╪═══════╪════════╪════════════════════════════╡',
          docs.slice(0,10).map((u,i) => {
            
            const rank = String(i+1);
          console.log(rank);
            return [
              '┃' + ' '.repeat(6-rank.length) + rank,
              ' '.repeat(5-String(u.data.level).length) + u.data.level,
          
              ' '.repeat(6-text.compactNum(u.data.xp).length) + text.compactNum(u.data.xp),
              members.get(u.id)?.user.tag || '<Unknown User>'
            ].join(' ┃ ')
          }).join('\n'),
          '╞═══════╪═══════╪════════╪════════════════════════════╡',
          docs.filter(x => x.id === message.author.id).map((u,i,a) => {
            const user = a.find(x => x.id === message.author.id);
            
            const rank = docs.findIndex(x => x.id === message.author.id) + 1;
            
            return [
              '┃' + ' '.repeat(6-text.ordinalize(rank).length) + text.ordinalize(rank),
              ' '.repeat(5-String(u.data.level).length) + u.data.level,
          
              ' '.repeat(6-text.compactNum(u.data.xp).length) + text.compactNum(u.data.xp),
              text.truncate('You (' + message.author.username+ ')', 26) + ' '.repeat(27-text.truncate('You (' + message.author.tag + ')', 26).length) + '┃'
            ].join(' ┃ ')
          }).join(''),
          '╰═══════╧═══════╧════════╧════════════════════════════╯',
          '```'
        ].join('\n'))
        
      ]});
    });  
*/
                                                                                      
                                                                                       
    }}
    
