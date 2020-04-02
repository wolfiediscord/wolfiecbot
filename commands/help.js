const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const prefix = process.env.PREFIX;
module.exports.run = async (client, message, args) => {
  let modtxt = {
    name: "Moderation",
    value: `${prefix}kick <user> <reason> - Kicks a user for a specific reason. (Requires Kick Members Permission)
${prefix}ban <user> <reason> - Bans a user for a specific reason. (Requires Ban Members Permission)
${prefix}unban <userid> <reason> - Unbans a user for a specific reason. (Requires Ban Members Permission)
${prefix}hackban <userid> <reason> - Bans a user that isn't in the server for a specific reason. (Requires Ban Members Permission)
${prefix}announce <message> - Pings everyone and says a message in the channel. (Requires Manage Messages Permission)
${prefix}npannounce <message> - Sends a message in an embed without pinging everyone. (Requires Manage Message Permission)
${prefix}mute <user> - Adds the "Muted" role to a user. (Requires Manage Messages Permission)
${prefix}unmute <user> - Removes the "Muted" role from a user. (Requires Manage Messages Permission)
${prefix}clear <number> - Removes the specified amount of messages. (Requires Manage Messages Permission)
${prefix}warn <user> <reason> - Warns the user for a specific message.(Requires Manage Messages Permission)`
  };
  let modtext2 = {
    name: "Moderation (continued)",
    value: `${prefix}warns <user> - Checks a mentioned users warns (Requires Manage Messages Permission)
${prefix}pardon <user> - Pardons a user of all of their warns. (Requires Manage Messages Permission)
${prefix}setprefix <prefix> - Sets the server prefix. (Requires Manage Server Permission)`
  };
  let funtxt = {
    name: "Fun/Utilities",
    value: `${prefix}ping - Gets the bot's ping 
${prefix}say <message> - Makes the bot say a message. (Requires Manage Messages Permission) 
${prefix}8ball - Tells you a random response to a question.
${prefix}invite - DMs you a link to add the bot.
${prefix}about - Tells you about the bot.
${prefix}number - Gives you a random number from 1-50.
${prefix}avatar <user> - Gets an avatar for either you or a mentioned user.
${prefix}whois <user> - Gets info about you or a mentioned user.
${prefix}serverinfo - Gets info about the server.
${prefix}roleinfo <role> - Gets info about a role.
`
  };
  const help1 = new MessageEmbed()
    .setAuthor("Help", client.user.avatarURL())
    .setColor(0x00bcff)
    .setDescription("These are the available commands.")
    .addFields(modtxt)
    .addFields(modtext2)
    .addFields(funtxt);
  if (!message.guild)
    return message.channel.send("Sorry, I don't respond to messages in DMs.");
  try {
    await message.author.send(help1);
    await message.react("✅");
  } catch (e) {
    message.channel.send(
      "I was unable send you any messages. Please enable your DMs."
    );
    console.log(
      `[ERR] Error received in ${message.guild.name}. Error: ${e.message}.`
    );
  }
};

module.exports.help = {
  name: "help",
  description: "Shows the help prompt",
  usage: "help"
};
