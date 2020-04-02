const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const dateFormat = require('dateformat');

module.exports.run = async (client, message, args) => {
  let channelcount = message.guild.channels.cache.keyArray();
  let rolecount = message.guild.roles.cache.keyArray();
  let textchannelcount = 0;
  let voicechannelcount = 0;
  let categorycount = 0;
  channelcount.forEach(channel => {
    let channelfetch = message.guild.channels.cache.get(channel);
    if(channelfetch.type === 'text') return textchannelcount++;
    if(channelfetch.type === 'voice') return voicechannelcount++;
    if(channelfetch.type === 'category') return categorycount++;
  });
const serverinfo = {
    color: '#00c8ff',
    author: {
      name: `Server Info`,
      icon_url: message.guild.iconURL()
    },
    fields: [{
      name: 'Owner',
      value: `${message.guild.owner.user.tag}`,
      inline: true
    }, 
      {
        name: 'Region',
        value: `${message.guild.region}`,
        inline: true
      },
      {
        name: 'Catagories',
        value: `${categorycount}`,
        inline: true
      }, {
        name: 'Text Channels',
        value: `${textchannelcount}`,
        inline: true
      }, {
        name: 'Voice Channels',
        value: `${voicechannelcount}`,
        inline: true
      },
      {
       name: 'Members',
       value: `${message.guild.memberCount}`,
       inline: true
      },
      {
        name: 'Roles',
        value: `${rolecount.length - 1}`,
        inline: true
      },
      {
        name: 'Large? (250+ Members)',
        value: `${message.guild.large}`,
        inline: true
      }
    ],
    thumbnail: {
      url: message.guild.iconURL()
    },
    footer: {
      text: `ID: ${message.guild.id} | Created at: ${dateFormat(message.guild.createdTimestamp, 'longDate')}`
    }
};
  message.channel.send({embed: serverinfo});
};

module.exports.help = {
  name: "serverinfo",
  description: "Gets info about a server",
  usage: "serverinfo"
};
