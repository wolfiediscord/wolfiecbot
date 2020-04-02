const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
 
  let number = args.join(" ");
  const delmessage = new MessageEmbed()
    .setTitle(`Removed ${number} messages`)
    .setColor(0xff0000)
    .setDescription(`Successfully removed **${number}** messages.`);
  if (!message.member.hasPermission("MANAGE_MESSAGES"||'ADMINISTRATOR'))
    return message.channel.send(
      "You do not have permission to run this command!"
    );
  if (isNaN(number))
    return message.channel.send("You did not specify a number!");
  try {
    await message.delete();
    await message.channel.bulkDelete(number);
    await message.channel.send(delmessage).then(sendMessage => {setTimeout(function() {sendMessage.delete();}, 10000); }).catch(e => console.log(e.message));
  } catch (e) {
    // An error happened
    // This is generally due to the bot not being able to kick the member,
    // either due to missing permissions or role hierarchy
    message.reply(
      "I was unable to clear the messages. I either don't have permission or the messages are older than 14 days!"
    );
    // Log the error
    console.error(
      `[ERR] Error Received in ${message.guild.name}. Error Message: ${e.message}`
    );
  }
};

module.exports.help = {
  name: "clear",
  description: "clears x amount of messages",
  usage: "ping"
};
