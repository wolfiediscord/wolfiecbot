const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  console.log(`[INFO] ${message.author.tag} (${message.author.id}) is running "8ball" in ${message.guild}.`)
 
  let randomnumber = Math.floor(Math.random() * 6);
  const message1 = new MessageEmbed()
    .setTitle(":8ball: The Magic 8ball Says")
    .setColor(0x00bcff)
    .setDescription("Absolutely not.");
  const message2 = new MessageEmbed()
    .setTitle(":8ball: The Magic 8ball Says")
    .setColor(0x00bcff)
    .setDescription("Reply hazy, try again later.");
  const message3 = new MessageEmbed()
    .setTitle(":8ball: The Magic 8ball Says")
    .setColor(0x00bcff)
    .setDescription("Maybe.");
  const message4 = new MessageEmbed()
    .setTitle(":8ball: The Magic 8ball Says")
    .setColor(0x00bcff)
    .setDescription("It is likely.");
  const message5 = new MessageEmbed()
    .setTitle(":8ball: The Magic 8ball Says")
    .setColor(0x00bcff)
    .setDescription("It is certain.");
  const message6 = new MessageEmbed()
    .setTitle(":8ball: The Magic 8ball Says")
    .setColor(0x00bcff)
    .setDescription("Most likely not.");
  const error = new MessageEmbed()
    .setTitle("Error")
    .setColor(0xff0000)
    .setDescription("An error occured. Please contact the bot developer.");
  if (randomnumber === 0) {
    return await message.channel.send(message1);
  } else if (randomnumber === 1) {
    return await message.channel.send(message2);
  } else if (randomnumber === 2) {
    return await message.channel.send(message3);
  } else if (randomnumber === 3) {
    return await message.channel.send(message4);
  } else if (randomnumber === 4) {
    return await message.channel.send(message5);
  } else if (randomnumber === 5) {
    return await message.channel.send(message6);
  } else {
    return await message.channel.send(error);
  }
};

module.exports.help = {
  name: "8ball",
  description: "Gives the user a random answer",
  usage: "8ball"
};
