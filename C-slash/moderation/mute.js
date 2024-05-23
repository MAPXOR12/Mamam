const Discord = require("discord.js");
const resolve = require("../../helpers/resolvers");
const ms = require("ms");
const { PermissionsBitField } = require('discord.js');
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name: "tempmute",
  
  description: "mute user",

  options:[{
    
      
      name: "target",
      description:" Target this member you want",
    type:ApplicationCommandOptionType.User,
    
      required:true,
    },{
    
      name:"reason",
      description: "what is your reason to mute this member ",
    type:ApplicationCommandOptionType.String,
      required:true,
    
           
    
  },{

     
     name:"time",
     description:"time must be 1min ,1h, 1mon",
    type:ApplicationCommandOptionType.String,
     required:false,
  
    
  }],
  category: ["moderation"],
  enabled: false,
  memberPermissions: ["SendMessages", "MuteMembers"],
  botPermissions: ["SendMessages", "EmbedLinks", "MuteMembers"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (interaction, bot,data) => {
    
    try{
    
  const member = await interaction.options.getMember('target');

  const time = await interaction.options.getString('time')|| "10min";
      const reason= await interaction.options.getString('reason');
    if (!member) {
      return interaction.reply({ content: `member  not found` });
    }

    if (member.id === interaction.user.id) {
      return await interaction.reply({ content: `you cant mute yourself` });
    }

    const memberPosition = member.roles.highest.position;
    const moderationPosition = interaction.member.roles.highest.position;
    if (
      interaction.member.ownerId !== interaction.user.id &&
      !(moderationPosition > memberPosition)
    ) {
      return await interaction.reply({ content: `You cant mute this member ` });
    }
    const memberData = await Mute.findOneAndUpdate({
      id: member.id,
      guildID: interaction.guild.id,
    });
    //if(!memberData) new Member({id:member.id, guildID: message.guild.id});

  
    if (!time || isNaN(ms(time))) {
      return await interaction.reply({
        content: `time must include (10s,10min,10h,1mon)`,
      });
    }

    
    let mute = interaction.guild.roles.cache.find((role) => role.name === "Muted");
    if (!mute)
      mute = await interaction.guild.roles.create({
        name: "Muted",
        color: "#0000",
        permissions: [],
      });

    await interaction.guild.channels.cache.forEach(async (channel) => {
      await channel.permissionOverwrites.create(mute, {
        SendMessages: false,
        AddReactions: false,
        Connect: false,
      });
    }); /**/
    setTimeout(() => {
      interaction.guild.members.cache.get(member.id).roles.add(mute);
    }, 2000);
    member
      .send(
        `Sir **${member.user.username}**
			You are muted in **${interaction.guild.name}** with voice and text
			by **${interaction.user.tag}**
			for **${time}**
			with reason **${reason || "no specify"}
		`
      )
      .catch(() => {});

    await interaction.reply({
        content: `muted **${member.user.tag}** in **${interaction.guild.name}** by **${
          interaction.user.tag
        }** for **${time}** ${reason || "no specify"}
		`,
      })
      .catch(() => {});
    if (memberData && data) {
      data.guild.casesCount++;

      const caseInfo = {
        channel: interaction.channel.id,
        moderator: interaction.user.id,
        date: Date.now(),
        type: "mute",
        case: data.guild.casesCount,
        reason,
        time,
      };

      memberData.mute.muted = true;
      memberData.mute.endDate = Date.now() + ms(time);
      memberData.mute.case = data.guild.casesCount;
      memberData.sanctions.push(caseInfo);

   /*   memberData.markModified("sanctions");
      memberData.markModified("mute");
    */  await memberData.save();

      await data.guild.save();

      bot.databaseCache.mutedUsers.set(
        `${member.id}${interaction.guild.id}`,
        memberData
      );
    }
  } catch(e){
      console.log(e.message)
   // return interaction.reply({content:` I can't mute this member`});
    
    
  }
  },
};
