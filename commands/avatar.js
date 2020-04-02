const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
 
  let botmsg = args.slice(1).join(" ");
  const user = message.mentions.users.first() || message.author;
  const avatarmsg = new MessageEmbed()
    .setTitle("Avatar")
    .setColor(0x00bcff)
    .setDescription(
      `Avatar of ${user.tag}`
    )
   .setImage(user.avatarURL())
   .setURL(user.avatarURL())
  ;
  await message.channel.send(avatarmsg).catch(e => {message.channel.send("Sorry, I encountered an error."); console.log(e.message);});
};

module.exports.help = {
  name: "avatar",
  description: "Gets an avatar of a user",
  usage: "avatar"
};