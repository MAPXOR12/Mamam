const Discord = require("discord.js");
const profile = require(`../../data/user.js`);
const { createCanvas, loadImage } = require("canvas");
const text = require(`${process.cwd()}/util/string.js`);
const moment = require("moment");
moment.suppressDeprecationWarnings = true;
const wait = require("util").promisify(setTimeout);
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js")
module.exports = {
  name:"profile",
  description:"user profile",
  options:[{
    
      name:"target_user",
      description:"target user profile",
    type:ApplicationCommandOptionType.User,
      required:false,
    
    
  }],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  enabled: true,
  category: ["general"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
try{
    const member =
      interaction.options.getMember("target_user") || interaction.user;
    if (member.bot) {
      return interaction.reply({
        content: `sir I don't have data in databse please mention user not bot `,
      });
    }
    let doc = await User.findOne({ userID: member.id }) || new User({userID: member.id});

    const server_rank = await User.find({ "data.xp.id": interaction.guild.id })
      .then((docs) =>
        Promise.resolve(
          docs.sort(
            (A, B) =>
              B.data.xp.find((x) => x.id === interaction.guild.id).xp -
              A.data.xp.find((x) => x.id === interaction.guild.id).xp
          )
        )
      )
      .then((sorted) => sorted.findIndex((x) => x.userID === doc.userID) + 1);

    const server_data = doc.data.xp.find((x) => x.id === interaction.guild.id);

    const cap = 50 * Math.pow(server_data.level, 2) + 250 * server_data.level;
    const lowerLim =
      50 * Math.pow(server_data.level - 1, 2) + 250 * (server_data.level - 1);
    const range = cap - lowerLim;
    const currxp = server_data.xp - lowerLim;
    const percentDiff = currxp / range;

    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");
    const color = doc.attch.color || "rgb(255,182,193)";
    const birthday = moment(doc.birthdate).format("dddd, MMMM Do YYYY"); ///doc.birthdate

    const hat = doc.attch.hat ? await loadImage(doc.attch.hat) : null;
    const emblem = doc.attch.emblem ? await loadImage(doc.attch.emblem) : null;
    const wreath = doc.attch.wreath ? await loadImage(doc.attch.wreath) : null;
    const def = await loadImage(
      doc.attch.background ||"https://i.imgur.com/57eRI6H.jpg"
    );
  
    const defpattern = doc.attch.pattern
      ? await loadImage(doc.attch.pattern || "https://i.imgur.com/nx5qJUb.png")
      : null;
    ///const m = docawait loadImage(doc.attch.background || "https://i.imuger.com/nx5qJUb.png");
    const avatar = await loadImage(/*member.displayAvatarURL({ format: "jpg" })*/`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}`);
    const badge = doc.data.badge ? await loadImage(doc.data.badge) : null;
    // add the wallpaper
    ctx.drawImage(def, 300, 65, 475, 250);

    // add the bio card
    ctx.beginPath();
    ctx.moveTo(300, 315);
    ctx.lineTo(canvas.width - 5, 315);
    ctx.lineTo(canvas.width - 5, canvas.height - 25);
    ctx.lineTo(300, canvas.height - 25);
    ctx.fillStyle = "#0000"; /// "rgba(255,255,255,0.8)";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = -10;
    ctx.shadowOffsetY = -40;
    ctx.fill();

    // add bio outline
    ctx.beginPath();
    ctx.moveTo(370, 338);
    ctx.lineTo(canvas.width - 40, 338);
    ctx.arcTo(canvas.width - 20, 338, canvas.width - 20, 358, 20);
    ctx.lineTo(canvas.width - 20, 378);
    ctx.arcTo(canvas.width - 20, 398, canvas.width - 40, 398, 20);
    ctx.lineTo(330, 398);
    ctx.arcTo(310, 398, 310, 378, 20);
    ctx.lineTo(310, 358);
    ctx.arcTo(310, 338, 330, 338, 20);
    ctx.lineWidth = 1;

    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();

    // add bio title
    ctx.beginPath();
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "rgba(255,225,250,255)";
    ctx.fillText("BIO", 330, 345, 50);

    // add bio text to bio carrd
    ctx.beginPath();
    ctx.font = "15px sans-serif";
    ctx.fillStyle = "rgba(255, 255,255,225)";
    ctx.textAlign = "center";
    ctx.fillText(doc.info || "Not set", 555, 368, 490);

    // add birthday outline
    ctx.beginPath();
    ctx.moveTo(410, 419);
    ctx.lineTo(520, 419);
    ctx.arcTo(540, 419, 540, 439, 20);
    ctx.arcTo(540, 459, 520, 459, 20);
    ctx.lineTo(330, 459);
    ctx.arcTo(310, 459, 310, 439, 20);
    ctx.arcTo(310, 419, 320, 419, 20);
    ctx.stroke();

    // add birthday title
    ctx.beginPath();
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,255)";
    ctx.textAlign = "left";
    ctx.fillText("BIRTHDAY", 330, 425, 80);

    // add birthday text to birthday card
    ctx.beginPath();
    ctx.font = "15px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText(birthday || "Not Set", 315, 445, 250);

    // add balance outline
    ctx.beginPath();
    ctx.moveTo(410, 479);
    ctx.lineTo(520, 479);
    ctx.arcTo(540, 479, 540, 499, 20);
    ctx.lineTo(540, 509);
    ctx.arcTo(540, 529, 520, 529, 20);
    ctx.lineTo(330, 529);
    ctx.arcTo(310, 529, 310, 509, 20);
    ctx.lineTo(310, 499);
    ctx.arcTo(310, 479, 330, 479, 20);
    ctx.stroke();

    // add balance title
    ctx.beginPath();
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,255)";
    ctx.fillText("BALANCE", 330, 485, 80);

    // add balance text to balance card
    ctx.beginPath();
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText(`💴: ${doc.money || "0"}`, 330, 512, 80);
    ///  ctx.fillText(`🏦: ${doc.bank || "0"}`, 430, 512, 80);

    // add emblem indicator
    if (!emblem) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,255,255)";
      ctx.font = "bold 25px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("NO", 660, 469, 150);
      ctx.fillText("EMBLEM", 660, 500, 150);
    } else {
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.drawImage(emblem, 580, 400, 160, 160);
    }

    // add the tip shape
    ctx.beginPath();
    ctx.moveTo(800, 10);
    ctx.lineTo(575, 10);
    ctx.lineTo(600, 80);
    ctx.lineTo(800, 80);
    ctx.fillStyle = color;
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 30;
    ctx.fill();

    // write tip on tip shape
    ctx.beginPath();
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.textAlign = "left";
    ctx.fillText("REP", 610, 50, 50);

    // write received tips on tip shape
    ctx.beginPath();
    ctx.font = "bold 30px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(doc.data.reps.received, canvas.width - 30, 50, 120);
ctx.shadowOffsetY = 0;
    // reset shadow

    ctx.beginPath();
    ctx.moveTo(800, 0);
    ctx.lineTo(575, 10);
    ctx.lineTo(600, 80);
    ctx.lineTo(800, 80);
    ctx.fillStyle = color;
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 30;
    ctx.fill();

      ctx.shadowOffsetY = 0;
    /*
      ctx.beginPath();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.textAlign = "left";
      ctx.fillText("BADGE", 400, 50, 50);

      // write received tips on tip shape
      ctx.beginPath();
      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.drawImage(badge, 450, -30, 150, 130);
    }*/
    // add card on left side
    // add pattern inside card
    if (defpattern) {
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.beginPath();
      ctx.moveTo(0, 65);
      ctx.lineTo(0, 535);
      ctx.arcTo(0, 585, 50, 585, 50);
      ctx.lineTo(250, 585);
      ctx.lineTo(300, 585);
      ctx.arcTo(300, 15, 250, 15, 50);
      ctx.lineTo(50, 15);
      ctx.arcTo(0, 15, 0, 65, 50);
      ctx.stroke();
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 10;
      ctx.fill();
      ctx.save();
      ctx.clip();
      ctx.drawImage(defpattern, 0, 0, 300, 600);
      ctx.restore();
    }
    // reset shadow
    ctx.shadowOffsetX = 0;
    /////// bashi xwarawai rasmaka dasta chap

    // ctx.drawImage(defpattern, 0, 0, 300, 225);
    // add wavy shape below the pattern
    ctx.beginPath();
    ctx.moveTo(0, 255);
    ctx.bezierCurveTo(0, 265, 50, 265, 50, 255);
    ctx.bezierCurveTo(50, 245, 100, 245, 100, 255);
    ctx.bezierCurveTo(100, 265, 150, 265, 150, 255);
    ctx.bezierCurveTo(150, 245, 200, 245, 200, 255);
    ctx.bezierCurveTo(200, 265, 250, 265, 250, 255);
    ctx.bezierCurveTo(250, 245, 300, 245, 300, 255);
    ctx.lineTo(300, 585);
    ctx.lineTo(50, 585);
    ctx.arcTo(0, 585, 0, 535, 50);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
    //---------///////------------------//////
    // add name
    ctx.beginPath();
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = "#FFFF";
    ctx.textAlign = "center";
    ctx.fillText(member.username, 150, 350, 280);
    ctx.font = "20px sans-serif";
    ctx.fillText(member.tag, 150, 375, 280);

    // add xp
    ctx.arc(60, 460, 35, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      60,
      460,
      35,
      Math.PI * 1.5,
      Math.PI * 1.5 + (Math.PI * 2 * percentDiff || 1)
    );
    ctx.strokeStyle = "#FFFF";
    ctx.stroke();

    ctx.beginPath();
    ctx.font = "bold 25px sans-serif";
    ctx.fillStyle = "#FFFF";
    ctx.textAlign = "center";
    ctx.fillText(server_data.level || "1", 60, 460, 35);
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("LEVEL", 60, 480, 35);

    ctx.beginPath();
    ctx.arc(150, 460, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFF";
    ctx.fill();

    ctx.beginPath();
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(
      server_rank ? text.ordinalize(server_rank) : "N/A",
      150,
      460,
      50
    );
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SERVER", 150, 480, 50);
    ////--------xp
    ctx.beginPath();
    ctx.arc(240, 460, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFF";
    ctx.fill();

    ctx.beginPath();
    ctx.font = "bold 30px sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(currxp, 240, 460, 50);
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("XP", 240, 480, 50);
    ///------xp///---////
    // add avatar
    ctx.beginPath();
    ctx.arc(150, 225, 75, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(0,0,0,0.6)";
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.drawImage(avatar, 75, 150, 150, 150);
    ctx.restore();

    // add wreath
    if (wreath) {
      ctx.beginPath();
      ctx.drawImage(wreath, 60, 145, 180, 180);
    }

    if (hat) {
      ctx.beginPath();
      ctx.drawImage(hat, 0, 0, 300, 300);
    }

    await interaction.deferReply();
    await wait(5000);
    await interaction.followUp({
      files: [{ attachment: canvas.toBuffer(), name: "profile.png" }],
    }).catch(()=>{});
}catch(e){
  console.log(e)
}
  },
};
