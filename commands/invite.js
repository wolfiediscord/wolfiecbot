const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  const invitemessage = new MessageEmbed()
    .setTitle("Invite")
    .setColor(0x00bcff)
    .setDescription(
      `Invite me to your server by clicking the title!
You can also join the discord server by visiting https://discord.me/contactwolfie !`
    )
    .setURL(
      "https://discordapp.com/oauth2/authorize?client_id=309132696658116609&permissions=8&scope=bot"
    );
  try {
    await message.author.send(invitemessage);
    await message.channel.send(":e_mail: Check your DMs!");
  } catch (e) {
    message.channel.send(
      "I was unable send the message to you. Please enable your DMs."
    );
    console.log(
      `[ERR] Error received in ${message.guild.name}. Error: ${e.message}.`
    );
  }
};

module.exports.help = {
  name: "invite",
  description: "Sends the user an invite for the bot",
  usage: "invite"
};
