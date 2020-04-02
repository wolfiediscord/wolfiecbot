const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send(
      "You do not have permission to use this command!"
    );
  let memberToBan = await client.users.fetch(args[0]);
  if (!memberToBan)
    return message.channel.send("You didn't provide a user id to hackban!");
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason stated.";
  if (!message.guild.me.hasPermission("BAN_MEMBERS"||"ADMINISTRATOR"))
    return message.channel.send(
      "I couldn't hackban that user. Do I have permission?"
    );
  try {
    message.guild.members.ban(
      memberToBan,
      `Banned by ${message.author.username}. Reason: ${reason}`
    );
    message.channel.send(`Successfully banned ${memberToBan.tag}!`);
  } catch (e) {
    console.log(
      `[ERR] Error Received in ${message.guild.name}. Error Message: ${e.message}`
    );
  }

  module.exports.help = {
    name: "hackban",
    description: "Hackbans a member",
    usage: "hackban"
  };
};
