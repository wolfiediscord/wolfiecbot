const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES"||"ADMINISTRATOR"))
    return message.channel.reply(
      "You do not have permission to use this command!"
    );
  let botmessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botmessage);
};

module.exports.help = {
  name: "say",
  description: "Says a message",
  usage: "say"
};
