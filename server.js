const { Discord, Client, GatewayIntentBits, Partials } = require("discord.js");
const bot = new Client({
  intents: [ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildVoiceStates
    
  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
  ],
});
const { Webhook } = require("discord.js");
global.config = require("./config.json");
const { Util } = require("discord.js");
const fs = require("fs");

global.bot = bot;

const DisTube = require("distube").default;

const prefix = (global.prefix = config.prefix);
const { Collection, MessageEmbed } = require("discord.js");
const beautify = require("js-beautify");
const { inspect } = require("util");
const cmd = require("node-cmd");
const translate = require("@vitalets/google-translate-api");
const data = {
  id: config.webhook.id2,
  token: config.webhook.token2,
};
bot.queue = new Map();
global.webhook = new Webhook(data);
///const { YtDlpPlugin } = require("@distube/yt-dlp")
global.mongoose = require("mongoose");
global.Log = bot.channels.cache.get(config.channels.logChannel);
global.Debug = bot.channels.cache.get(config.channels.debug);
global.Ban = require("./data/ban.js");
global.Guild = require("./data/guild.js");
global.User = require("./data/user.js");
global.Owner = require("./data/owner.js");
global.Prime = require("./data/prime.js");
global.Partner = require("./data/partner.js");
global.Mute = require("./data/mute.js");
global.Warns = require("./data/warns.js");
global.Member = require("./data/member.js");
global.Site = require("./data/analysts.js");
global.News = require("./data/news.js");
global.Maintenance = require("./data/maintenance.js");
global.Black = require("./data/blacklist");
global.Antis = require ("./data/antis.js");
global.Raider = require ("./data/raiders.js") ;
global.Lang = require("./data/lang.js");
global.Reaction= require("./data/reactionrole.js")
bot.commands = new Collection();
bot.aliases = new Collection();
bot.slash = new Collection();
bot.cooldowns = new Collection();
bot.react = new Map();
bot.databaseCache = {};
bot.databaseCache.users = new Collection();
bot.databaseCache.guilds = new Collection();
bot.databaseCache.members = new Collection();
bot.databaseCache.usersReminds = new Collection(); // members with active reminds
bot.databaseCache.mutedUsers = new Collection(); // members who are currently muted

bot.databaseCache.channels = new Collection();
bot.databaseCache.guilds = new Collection();

bot.databaseCache.channelsReminds = new Collection();
bot.databaseCache.lockedChannels = new Collection();

bot.xp = new Collection();
bot.catagories = fs.readdirSync("./commands/");/*
["command", "event", "slash","distube"].forEach((handler) => {
  require(`./handler/${handler}`)(bot);
});
*/
bot.rest.on("rateLimited", (RateLimitData) => {
  console.log(RateLimitData);
});/*
bot.translate = async (text, message) => {
  const data = await Guild.findOne({ guildID: message.guild.id });
  const lang = data.language ? await data.language : "en";
  const translated = await translate(text, { from: "en", to: lang });
  return translated.text;
};*/
require("./dashboard/index.js")(bot);

require("./data/connect.js")(bot);

process.on("unhandledRejection", (err) => {
  console.log(`[ERROR] Unhandled promise rejection: ${err}.`);
  
});

////music
const filters = require(`./helpers/filters.json`);

const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
};
if (config.spotify_api.enabled) {
  spotifyoptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  };
}
global.distube = new DisTube(bot, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: false,
  //emitAddListWhenCreatingQueue: false,
  searchSongs: 0,
  youtubeCookie: config.youtubeCookie, //Comment this line if you dont want to use a youtube Cookie
  nsfw: true, //Set it to false if u want to disable nsfw songs
  emptyCooldown: 25,
  ytdlOptions: {
    //requestOptions: {
    //  agent //ONLY USE ONE IF YOU KNOW WHAT YOU DO!
    //},
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 64,
  },
  
  
  customFilters: filters,
  plugins: [new SpotifyPlugin(spotifyoptions), new SoundCloudPlugin()],
});
["command", "event","slash","distube"].forEach((handler) => {
  require(`./handler/${handler}`)(bot, distube)
});
bot.rest.on("rateLimit",(rateLimitData)=>{
  
  
    console.log(rateLimitInfo)
})
setTimeout(() => {
    if(!bot || !bot.user) {
    console.log("The Client Didn't Login Proccesing Kill 1")

        process.kill(1);
    } else {
        console.log("The Client Has Logged In Successfully")
    }
}, 10000); 

//const colors = require('colors')

bot.login(config.token);
