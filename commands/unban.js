const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS"||"ADMINISTRATOR"))
    return message.channel.send(
      "You do not have permission to use this command!"
    );
  let bannedMember = await client.users.fetch(args[0]);
  if (!bannedMember)
    return message.channel.send("You didn't provide a user id to unban!");
  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason stated.";
  if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send(
      "I was unable to unban that user. Do I have permission?"
    );
  try {
    message.guild.members.unban(
      bannedMember,
      `Unbanned by "${message.author.username}" Reason: "${reason}"`
    );
    message.channel.send(`Successfully unbanned ${bannedMember.tag}!`);
  } catch (e) {
    console.log(
      `[ERR] Error Received in ${message.guild.name}. Error Message: ${e.message}`
    );
  }

  module.exports.help = {
    name: "unban",
    description: "Unbans a member",
    usage: "unban"
  };
};
