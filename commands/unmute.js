const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
 
  const user = message.mentions.users.first();
  let botmessage = args.slice(1).join(" ");
  // embed
  if (!message.member.hasPermission("MANAGE_MESSAGES"||"ADMINISTRATOR"))
    return message.channel.send(
      "You do not have permission to use this command!"
    );
  if (user) {
    // Now we get the member from the user
    const member = message.guild.member(user);
    let role = message.guild.roles.cache.find(r => r.name === "Muted");
    // If the member is in the guild
    if (member) {
      /**
       * Kick the member
       * Make sure you run this on a member, not a user!
       * There are big differences between a user and a member
       */
      if (role) {
        member.roles
          .remove(role)
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully unmuted ${user.tag}!`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply(
              "I was unable to unmute the member. Do I have permission?"
            );
            // Log the error
            console.error(
              `[ERR] Error Received in ${message.guild.name}. Error Message: ${err.message}`
            );
          });
      } else {
        return await message.channel.send(
          'There is not a role named "Muted" in the guild!'
        );
      }
    } else {
      // The mentioned user isn't in this guild
      message.reply("That user isn't in this guild!");
    }
    // Otherwise, if no user was mentioned
  } else {
    message.reply(`You didn\'t mention the user to unmute!`);
  }
};
