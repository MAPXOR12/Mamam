const moment = require('moment');
const text = require(`${process.cwd()}/util/string`);

const Discord = require("discord.js")
const {ApplicationCommandOptionType} = require("discord.js")
module.exports = {
name:"rep",
description: "rep someone ",
options:[{
  name:"target",
  description:"mention someone to send rep",
  type:ApplicationCommandOptionType.User,
  required:true,
}],
  enabled: false,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks" ],		
  enabled:true,
  category:["rank"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction) => {

    try{
    const user = await interaction.options.getMember('target')
    let tipper = await User.findOne({userID: user.id})
    if (!tipper){
      tipper = new User({ userID: user.id });
    };
    const now = Date.now();
if (tipper.data.reps.timestamp !== 0 && tipper.data.reps.timestamp - now > 0){
      return interaction.reply({content:`❎ **${interaction.user.tag}**, you already used your rep. You can wait for ${moment.duration(tipper.data.reps.timestamp - now).format('H [hours,] m [minutes, and] s [seconds]')} to rep someone again.`});
    } else if (!user){
      return interaction.reply({content:`✅ **${interaction.user.tag}**, you can now rep someone from this server!`});
    };
     if(user.id ===interaction.user.id){ return interaction.reply({content:`❎ You can't tip Your self`})};
    const member = await interaction.guild.members
    .fetch(user)
if (!member){
      return interaction.reply({content:`❎ **${interaction.user.tag}**, could not add rep to this user. Reason: User not found!`});
    } else if (member.user.bot){
      return interaction.reply({content:`❎ **${interaction.user.tag}**, you cannot rep a bot!`});
    };
    
    let doc = await User.findOne({userID: member.id})
      if (!doc){
        doc = new User.findOne({userID:member.id });
      };
const amount = 50000
      let overflow = false, excess = null, unregistered = false;
if (doc.money === null){
        unregistered = true;
      } else if (doc.money + amount > 50000){
        overflow = true;
        excess = doc.money + amount - 50000;
        doc.money = 50000;
      } else {
        doc.money += amount;
      };
tipper.data.reps.timestamp = now + 432e5;
      tipper.data.reps.given++;
      doc.data.reps.received++;
    
    return Promise.all([ doc.save(), tipper.save() ])
      .then(() => interaction.reply({content:[
        `\\**${interaction.user.tag}**, repped **${amount}** to **${member.user.tag}**.`,
        overflow ? `\n\\**Overflow Warning**: **${member.user.tag}**'s wallet just overflowed! You need to transfer some of your credits to your bank!` : '',
        unregistered ? `\n\\ **Unregistered**: **${member.user.tag}** is unregistered, the bonus credits will not be added.` : ''
      ].join('')}))
      .catch(() => interaction.reply({content:`\`[DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`}))
    
  
}catch(e){
      console.log(e.message)
}}

    

  }