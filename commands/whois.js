const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  let botmessage = args.slice(1).join(' ');
  let user = message.mentions.users.first() || message.author;
  const member = message.guild.member(user);
  let mroles = member.roles.cache.map(r => `${r}`).join(' | ');
  let permstxt = [];
  if(member.hasPermission("ADMINISTRATOR")) {
    permstxt.push("Administrator");
  }
  if(member.hasPermission("CREATE_INSTANT_INVITE")) {
    permstxt.push("Create Invites")    
  }
  if(member.hasPermission("KICK_MEMBERS")) {
    permstxt.push("Kick Members")
  }
  if(member.hasPermission("BAN_MEMBERS")) {
    permstxt.push("Ban Members")
  }
  if(member.hasPermission("MANAGE_CHANNELS")) {
    permstxt.push("Manage Channels")
  }
  if(member.hasPermission("MANAGE_GUILD")) {
    permstxt.push("Manage Server")
  }
  if(member.hasPermission("VIEW_AUDIT_LOG")) {
    permstxt.push("View Audit Logs")
  }
  if(member.hasPermission("MANAGE_MESSAGES")) {
    permstxt.push("Manage Messages")
  }
  if(member.hasPermission("MENTION_EVERYONE")) {
    permstxt.push("Mention Everyone")
  }
  if(member.hasPermission("MANAGE_ROLES")) {
    permstxt.push("Manage Roles")
  }
  if(member.hasPermission("MANAGE_NICKNAMES")) {
    permstxt.push("Manage Nicknames")
  }
  if(member.hasPermission("MANAGE_WEBHOOKS")) {
    permstxt.push("Manage Webhooks")
  }
  if(member.hasPermission("MANAGE_EMOJIS")) {
    permstxt.push("Manage Emojis")
  }
  const infomsg = new MessageEmbed()
    .setTitle("User Information")
    .setColor(0x00bcff)
    .setDescription(
      `**Name**: ${user.tag}
**User ID**: ${user.id}
**Nickname**: ${member.displayName}
**Joined At**: ${member.joinedAt}
**Joined Discord At**: ${user.createdAt}
**Is bot?**: ${user.bot}
**Roles**: ${mroles}
**Key Permissions**: ${permstxt}
`
    )
    .setThumbnail(user.avatarURL())
  ;
  await message.channel.send(infomsg);
};

module.exports.help = {
  name: "whois",
  description: "Gives the sender info about a user or themself",
  usage: "whois"
};
