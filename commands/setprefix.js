const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const fs = require('fs');

module.exports.run = async (client, message, args) => {
  
  
  if(!message.member.hasPermission("ADMINISTRATOR"||"MANAGE_SERVER")) return message.channel.send("You do not have permission to use this command!")
  if(!args[0]) return message.reply("You did not specify a prefix to set to!");
  let prefixes = JSON.parse(fs.readFileSync('./prefixes.json','utf8'))
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };
  fs.writeFile('./prefixes.json', JSON.stringify(prefixes), (err) => {
    if(err) return console.log(err);
  })
  const prefixsetmsg = new MessageEmbed()
    .setTitle("Prefix Set!")
    .setColor(0x00bcff)
    .setDescription(
      `Prefix set to: **${args[0]} **!`
    );
  await message.channel.send(prefixsetmsg);
};

module.exports.help = {
  name: "setprefix",
  description: "Sets a prefix to the server",
  usage: "setprefix"
};
