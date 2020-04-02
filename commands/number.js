const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
 
  let rnumber = Math.floor(Math.random()*50)
  const numbermessage = new MessageEmbed()
    .setTitle("The Number")
    .setColor(0x00bcff)
    .setDescription(
      `The number I was thinking of was **${rnumber}**.`
    );
  await message.channel.send(numbermessage);
};

module.exports.help = {
  name: "number",
  description: "Gets a random number and sends it",
  usage: "number"
};
