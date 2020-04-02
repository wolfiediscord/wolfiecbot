const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  const ping = new MessageEmbed()
    .setTitle("Ping")
    .setColor(0x00bcff)
    .setDescription(
      `My ping is: **${Date.now() - message.createdTimestamp}ms**`
    );
  await message.channel.send(ping);
};

module.exports.help = {
  name: "ping",
  description: "Gets a ping",
  usage: "ping"
};
