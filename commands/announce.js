const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
   console.log(`[INFO] ${message.author.tag} (${message.author.id}) is running "announce" in ${message.guild}.`)
 
  let input = args.join(" ");
  let todayDate = new Date().toISOString().slice(0, 10);
  const messagetoannounce = new MessageEmbed()
    .setTitle(":information_source: Announcement")
    .setColor(0x00bcff)
    .setDescription(input)
    .setFooter(
      `${message.author.username} | ${todayDate}`,
      message.author.avatarURL()
    );
  if (!message.member.hasPermission("MANAGE_MESSAGES"||"MENTION_EVERYONE"||"ADMINISTRATOR"))
    return message.channel.send(
      "You do not have permission to use this command!"
    );
  message.delete().catch;
  await message.channel.send("@everyone");
  await message.channel.send(messagetoannounce);
};

module.exports.help = {
  name: "announce",
  description: "Announces a message",
  usage: "announce"
};
