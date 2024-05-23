const stringCleaner = require("@sindresorhus/slugify");
const Canvas = require("canvas"),
      { Discord,AuditLogEvent} = require("discord.js");
const { resolve } = require("path");
const kick = require (`${process.cwd()}/util/antibankick/antikick.js`);
const canvas = Canvas.createCanvas(1024, 450);
const ctx = canvas.getContext("2d");
// Register assets fonts


const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};

module.exports = class {
  async run(member) {
    
      
      
    
    
    

    


    
    
    const guildData = (await Guild.findOne({ guildID: member.guild.id })) ||
      (await Guild.create({ guildID: member.guild.id }));

    try {
          const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;

      await kick(member);

    let guildDB = await Guild.findOne({
      guildID: member.guild.id
    });
  
  /*ait Guild.updateOne({guildID: member.guild.id},{
    $inc:{
      leaves:
      
    }})*/
  if(guildDB && guildDB.leaves){

  guildDB.leaves.forEach(async(leave)=>{


    let xx = leave - Date.now();
    let createdd = Math.floor(xx / 86400000);
    
    

    if(6 <= createdd) {
    removeA(guildDB.leaves, leave)
    await guildDB.save().catch(()=>{})

    }
  });

  guildDB.leaves.push(Date.now())
  await guildDB.save().catch(()=>{})
  };
  
  if (member.guild) {
        const { guild } = member,
          user = member;
    if(!guild.members.me.permissions.has(["ManageGuild", "ManageChannels","ViewAuditLog"])) return;

          
        const entry1 = await member.guild
          .fetchAuditLogs()
          .then((audit) => audit.entries.first());
        if (entry1.action === AuditLogEvent.MemberKick) {
          if (!guildData.plugins.logs.kick) {
            await Guild.updateOne(
              { guildID: member.guild.id },

              {
                $set: {
                  "plugins.logs.kick.enabled": false,
                  "plugins.logs.kick.color": null,
                  "plugins.logs.kick.channel": null,
                },
              }
            );
          }
         /// if (!guildData.plugins.logs.enabled) return;
          if(guildData.plugins.logs){
          if (guildData.plugins.logs.kick.enabled) {
            const entry2 = await member.guild
              .fetchAuditLogs({ type: AuditLogEvent.MemberKick })
              .then((audit) => audit.entries.first());
            const user2 = entry1.executor;
            if (!guildData.plugins.logs.kick.enabled) return;
            const channelEmbed = await guild.channels.cache.get(
              guildData.plugins.logs.kick.channel
            );

            if (!channelEmbed) return;
            const embed = new Discord.EmbedBuilder()
              .setDescription(`:pencil: **Kick Action**`)
              .addFields({name:"Moderator Name", value:user2.tag,inline: true})
              .addFields({name:"User kicked", value:entry1.target.tag,inline: true})
              .addFields({name:"Reason", value:entry1.reason || " No have Reason", inline:true})
              .setFooter({ text: guild.name })
              .setThumbnail(guild.iconURL())
              .setTimestamp()
              .setColor(guildData.plugins.logs.kick.color);

            if (
              channelEmbed &&
              channelEmbed.viewable &&
              channelEmbed
                .permissionsFor(guild.members.me)
                .has(["SendMessages", "EmbedLinks"])
            ) {
              channelEmbed.send({ embeds: [embed] }).catch((err) => {
                console.log(err);
              });

              setTimeout(() => {}, 3000);
            }
          }
        }
        member.guild.data = guildData;

        // Check if goodbye message is enabled
        if (!guildData.plugins.goodbye) {
          await Guild.updateOne(
            { guildID: guild.id },
            {
              $set: {
                "plugins.logs.goodbye.enabled": false,
                "plugins.logs.goodbye.channel": null,
                "plugins.logs.goodbye.message": null,
              },
            }
          );
        }
        if (guildData.plugins.goodbye.enabled) {
          const channel = member.guild.channels.cache.get(
            guildData.plugins.goodbye.channel
          );
          if (channel) {
            if (guildData.plugins.goodbye.enabled) {
              const message = guildData.plugins.goodbye.message
                .replace(/{user}/g, member.user.tag)
                .replace(/{server}/g, member.guild.name)

                .replace(/{membercount}/g, member.guild.memberCount);
              if (message) {
                if (guildData.plugins.goodbye.withImage) {
                  // Background language"
                  const background = await Canvas.loadImage(
                    "https://imgur.com/Aa0j1pA.png"
                  );
                  // This uses the canvas dimensions to stretch the image onto the entire canvas
                  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                  // Draw username
                  ctx.fillStyle = "#ffffff";
                  const username = stringCleaner(member.user.username, {
                    separator: " ",
                    lowercase: false,
                    decamelize: false,
                    preserveLeadingUnderscore: true,
                  });
                  ctx.font = applyText(canvas, username, 48);
                  ctx.fillText(
                    username,
                    canvas.width - 660,
                    canvas.height - 248
                  );
                  // Draw server name
                  ctx.font = applyText(canvas, member.guild.name, 53);
                  ctx.fillText(
                    member.guild.name,
                    canvas.width - 690,
                    canvas.height - 65
                  );
                  // Draw discriminator
                  ctx.font = "40px Bold";
                  ctx.fillText(
                    member.user.discriminator,
                    canvas.width - 623,
                    canvas.height - 178
                  );
                  // Draw number
                  ctx.font = "22px Bold";

                  ctx.fillText(
                    member.guild.memberCount,

                    40,
                    canvas.height - 50
                  );
                  // Draw # for discriminator
                  ctx.fillStyle = "#44d14a";
                  ctx.font = "75px SketchMatch";
                  ctx.fillText("#", canvas.width - 690, canvas.height - 165);
                  // Draw Title with gradient
                  ctx.font = "90px Bold";
                  ctx.strokeStyle = "#1d2124";
                  ctx.lineWidth = 15;
                  ctx.strokeText(
                    "GOODBYE",
                    canvas.width - 620,
                    canvas.height - 330
                  );
                  var gradient = ctx.createLinearGradient(
                    canvas.width - 780,
                    0,
                    canvas.width - 30,
                    0
                  );
                  gradient.addColorStop(0, "#e15500");
                  gradient.addColorStop(1, "#e7b121");
                  ctx.fillStyle = gradient;
                  ctx.fillText(
                    "GOODBYE",
                    canvas.width - 620,
                    canvas.height - 330
                  );

                  // Pick up the pen
                  ctx.beginPath();
                  //Define Stroke Line
                  ctx.lineWidth = 10;
                  //Define Stroke Style
                  ctx.strokeStyle = "#df0909";
                  // Start the arc to form a circle
                  ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
                  // Draw Stroke
                  ctx.stroke();
                  // Put the pen down
                  ctx.closePath();
                  // Clip off the region you drew on
                  ctx.clip();

                  const options = { format: "png", size: 512 },
                    avatar = await Canvas.loadImage(
                      member.user.displayAvatarURL(options)
                    );
                  // Move the image downwards vertically and constrain its height to 200, so it"s a square
                  ctx.drawImage(avatar, 45, 90, 270, 270);

                  const attachment = new Discord.AttachmentBuilder(
                    canvas.toBuffer(),{name:
                    "goodbye.png"
                                      });

                  channel.send({ content: message, files: [attachment] });
                } else {
                  channel.send({ content: message });
                }
              } else {
                const attachment = new Discord.AttachmentBuilder(
                  canvas.toBuffer(),{name:
                  "goodbye.png"}
                );
                channel.send({ files: [attachment] });
              }
            }
          }
        }
      }}
    } catch (err) {
      return console.log(err);
    }
  }
};
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}