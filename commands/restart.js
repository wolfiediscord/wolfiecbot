const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const dateFormat = require('dateformat');

module.exports.run = async (client, message, args) => {
  const logchannelID = process.env.LOGCHANNEL;
  let currentTime = dateFormat(Date.now());
  const restartmsg = {
    author: {
      name: 'Restarting bot...',
      icon_url: client.user.avatarURL()
    },
    color: '#4dff00',
    description: 'The bot is now restarting.'
  };
 if(message.author.id != process.env.OWNERID) return message.channel.send('You do not have permission to run this command!');
 await message.channel.send({embed: restartmsg});
 await console.log(`[INFO] Restarting bot! Time: ${currentTime}`)
try {
  const embed = {
    author: {
      name: 'Restarting...',
      icon_url: `${client.user.avatarURL()}`
    },
    footer: {
      text: `Info | ${currentTime}`
    },
    color: '#fff700'
  }
  const channel = client.channels.cache.find(channel => channel.id === logchannelID);
   await channel.send({embed: embed});
   await process.exit();
} catch (err) {
  console.log(`[CRITICAL ERR] ${err}`); 
}
};

module.exports.help = {
  name: "restart",
  description: "Restarts the bot (OWNER ONLY)",
  usage: "restart"
};
