// dependencies
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
// to get fancy embeds
const { Client, MessageEmbed } = require("discord.js");
// more dependencies
const sql = require("sqlite");
const dateFormat = require("dateformat");
// a bunch of config stuff
const logchannelID = process.env.LOGCHANNEL;
const discord_token = process.env.TOKEN;
const defaultprefix = process.env.PREFIX;
const ownerid = process.env.OWNERID;
// for the warn database
const load = async () => {
  await sql.open("./db.sqlite");
  await sql.run(
    "CREATE TABLE IF NOT EXISTS warns (guildid TEXT, userid TEXT, modid TEXT, reason TEXT, type TEXT, warndate INT)"
  );
  client.db = sql;
};
load();
client.on("ready", () => {
  let currentTime = dateFormat(Date.now());
  if(logchannelID) {
    let embed = {
      author: {
        name: `${client.user.tag} is now online.`,
        icon_url: `${client.user.avatarURL()}`
      },
      color: '#3cff00',
      footer: {
        text: `Info | ${currentTime}`
      }
    };
     const channel = client.channels.cache.find(channel => channel.id === logchannelID);
    channel.send({embed: embed})
  } else return;
  console.log(`[INFO] Connected to discord!`);
   client.user.setPresence({
    activity: { name: `Starting up!` },
    status: "online"
  });
  let statuses = [
    /*
    {
       // template
       activity: {name: ``},
       status: ''
    }, */
    {
      activity: {name: `wolfie.glitch.me | ${defaultprefix}help`},
      status: 'PLAYING'
    },
    {
      activity: {name: `${client.users.cache.size} users! | ${defaultprefix}help`},
      status: 'WATCHING'
    }, {
      activity: {name: `${client.guilds.cache.size} guilds! | ${defaultprefix}help`},
      status: 'WATCHING'
    },
    {
      activity: {name: `In the internet! | ${defaultprefix}help`},
      status: 'PLAYING'
    }
    ];
    
  setInterval(() => {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status.activity, { type: status.status})
  }, 30000);
  
});
client.on('warn', (warn) => {
  let currentTime = dateFormat(Date.now());
  if(logchannelID) {
      let embed = {
      author: {
        name: `Warning!`,
        icon_url: `${client.user.avatarURL()}`
      },
      description: `${warn}`,
      color: '#fff700',
      footer: {
        text: `Warning | ${currentTime}`
      }}
     const channel = client.channels.cache.find(channel => channel.id === logchannelID);
     channel.send({embed: embed});
    } else return;
  console.log(`[WARN] ${warn}`)
})

// checks when the bot gets pinged and logs it
app.get("/", (request, response) => {

  let currentTime = dateFormat(Date.now());
  if(logchannelID) {
        let embed = {
      author: {
        name: `Ping Received!`,
        icon_url: `${client.user.avatarURL()}`
      },
      color: '#fcfcfc',
      footer: {
        text: `Info | ${currentTime}`
      }
    };
    const channel = client.channels.cache.find(channel => channel.id === logchannelID);
     channel.send({embed: embed});
  } else return;
  console.log(`[INFO] Ping received at ${currentTime} GMT.`);
  response.sendStatus(200);
});

// This keeps the bot running 24/7
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// our message event. this is where we do the command handling
client.on("message", message => {
   let currentTime = dateFormat(Date.now());
  // prefix handling
  const prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  // checkpoints
  if(!message.guild) return;
  if (message.author.bot) return;
// sets default prefix if there isn't one
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: process.env.PREFIX
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;
  // checks if bot has been pinged and sends a message if so
  if (
    message.mentions.has(client.user.id, {
      ignoreEveryone: true,
      ignoreRoles: true
    })
  ) {
    message.reply(
      `Hello! My current prefix is **${prefix}**! Type ${prefix}help if you need to find the commands.`
    );
  }
  // if message isn't a command
  if (message.content.indexOf(prefix) !== 0) return;
  
  // This is the best way to define args. Trust me.
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
    if(logchannelID) {
        let embed = {
      author: {
        name: `Error received in ${message.guild}`,
        icon_url: `${client.user.avatarURL()}`
      },
      color: '#ff0000',
      fields: {
        name: `Command Runner: ${message.author.tag}`,
        value: `${err}`
      },
      footer: {
        text: `Error | ${currentTime}`
      }
    };
    const channel = client.channels.cache.find(channel => channel.id === logchannelID);
    if(ownerid) {
      channel.send(`<@${ownerid}>`)
      channel.send({embed: embed})  
    } else {
      channel.send({embed: embed}) 
    }   
    } else return;
  }
});
client.on("guildCreate", message => {
   let currentTime = dateFormat(Date.now());
  console.log(`[INFO] Joined a new guild.`);
  if(logchannelID) {
     let embed = {
      author: {
        name: `Joined a new guild.`,
        icon_url: `${client.user.avatarURL()}`
      },
      description: `I am now in ${client.guilds.cache.size} guilds.`,
      color: '#fcfcfc',
      footer: {
        text: `Info | ${currentTime}`
      }
    };
    const channel = client.channels.cache.find(channel => channel.id === logchannelID);
    channel.send({embed: embed});
  } else return;
});
client.on("guildDelete", message => {
  
   let currentTime = dateFormat(Date.now());
  console.log("[INFO] Left a guild.");
  if(logchannelID) {
    let embed = {
      author: {
        name: `Left a guild.`,
        icon_url: `${client.user.avatarURL()}`
      },
      description: `I am now in ${client.guilds.cache.size} guilds.`,
      color: '#fcfcfc',
      footer: {
        text: `Info | ${currentTime}`
      }
    };
    const channel = client.channels.cache.find(channel => channel.id === logchannelID);
    channel.send({embed: embed});
  } else return;
});

client.login(discord_token);
