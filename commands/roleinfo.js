const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const dateFormat = require('dateformat');
module.exports.run = async (client, message, args) => {
const rolearg = args.join(" ");
if(args.length === 0) return message.channel.send('You did not specify a role!');
let rolefetch = message.guild.roles.cache.find(role => role.name === rolearg);
if(rolefetch === undefined) { rolefetch = message.guild.roles.cache.find(role => role.id === rolearg); };
if(rolefetch === undefined) return message.channel.send('You did not specify a role!');
const rmembers = rolefetch.members.keyArray();
let rolecreatedat = dateFormat(rolefetch.createdAt, 'longDate');
const embed = {
    title: `${rolefetch.name}`,
    fields: [{
        name: `ID`,
        value: `${rolefetch.id}`,
        inline: true
    }, {
      name: `Name`,
      value: `${rolefetch.name}`,
      inline: true
    },{
      name: 'Color',
      value: `${rolefetch.hexColor}`,
      inline: true
    },{
      name: 'Mentionable?',
      value: `${rolefetch.mentionable}`,
      inline: true
    }, {
      name: 'Members',
      value: `${rmembers.length}`,
      inline: true
    },{
      name: 'Hoisted?',
      value: `${rolefetch.hoist}`,
      inline: true
    },{
      name: 'Position',
      value: `${rolefetch.position}`,
      inline: true
    }],
    footer: {
      text: `Role Created At ${rolecreatedat}`
    },
    color: `${rolefetch.hexColor}`
};
message.channel.send({embed: embed})
};

module.exports.help = {
  name: "roleinfo",
  description: "Gets info about a role",
  usage: "roleinfo"
};
