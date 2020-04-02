const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
   console.log(`[INFO] ${message.author.tag} (${message.author.id}) is running "about" in ${message.guild}.`)
 
  const ping = new MessageEmbed()
    .setTitle("About WolfieCBOT")
    .setColor(0x00bcff)
    .setDescription(
      `WolfieCBOT is a bot coded in discord.js. It was originally coded in C#, but was changed to discord.js recently. It was made by Wolfie#7968 as a moderation/fun bot. You can view it's commands by typing -help in chat. It is currently on discord.js V12.0.1 as of 3-3-20.`
    )
    .setThumbnail(client.user.avatarURL());
  await message.channel.send(ping);
};

module.exports.help = {
  name: "about",
  description: "Tells the user about the bot",
  usage: "about"
};
