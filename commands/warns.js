const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const dateFormat = require("dateformat");

module.exports.run = async (client, message, args) => {
 
  const member = message.mentions.members.first() || message.member;
  if(!message.member.hasPermission("MANAGE_MESSAGES"||"ADMINISTRATOR")) return message.channel.send("You do not have permission to run this command!");
  const warns = await client.db.all(`SELECT * FROM warns WHERE guildid = "${message.guild.id}" AND userid = "${member.id}"`)
  
const embed = new MessageEmbed();
embed.setAuthor(`Warns | ${member.user.tag}`, member.user.displayAvatarURL());
embed.setColor(0xffdd00);
if (warns.length > 0) {
  warns.forEach(async warnings => {
      const mod = await client.users.fetch(warnings.modid).catch(() => null);
      const warnedAt = dateFormat(warnings.warndate, "longDate");
    embed.addField(`Warned`, `Moderator: ${mod.tag}\nReason: *${warnings.reason}*\nDate: ${warnedAt}`);
    message.channel.send(embed);
    
  });
} else {
  embed.setDescription(`${member} has 0 warnings!`);
  message.channel.send(embed);
}
  };

module.exports.help = {
  name: "warns",
  description: "Shows a user's warns",
  usage: "warns"
};
