const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.guild)
    return message.channel.send("Sorry, I don't respond to messages in DMs.");
  const user = message.mentions.users.first() || client.users.cache.get(args[0]);
  let botmessage = args.slice(1).join(" ")
  const warnmessage = new MessageEmbed()
    .setTitle("Warn")
    .setColor(0xff0000)
    .setDescription(
      `You have been warned in ${message.guild.name} for: "${botmessage}"`
    );
if(!message.member.hasPermission("MANAGE_MESSAGES"||"ADMINISTRATOR")) {
  return message.channel.send("You do not have permission to use this command!")
}
 if (user) {
    // Now we get the member from the user
    const member = message.guild.member(user);
    // If the member is in the guild
    if (member) {
      const confirmmsg = new MessageEmbed()
    .setTitle(`Are you sure?`)
    .setColor(0xff0000)
    .setDescription(
      `Are you sure you want to warn ${user.tag}?`
    ).setFooter("This command will be cancelled in 10 seconds if you don't react.")
          const successmsg = new MessageEmbed()
    .setTitle(`Successfully warned ${user.tag}`)
    .setColor(0xff0000)
    .setDescription(
      `Successfully warned ${user.tag} for: "${botmessage}".`
    );
      message.channel.send(confirmmsg).then(sentMessage => {
                sentMessage.react('✅')
                .then(() => sentMessage.react('❌'));

                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                  };
                  
                  sentMessage.awaitReactions(filter, { max: 1, time: 10000, errors: ['time']})
                  .then(collected => {
                    const reaction = collected.first();
                    
                    if (reaction.emoji.name === '✅') {
                      // put your code here
                      if(!botmessage) botmessage === 'No reason specified.';
                      try {
                         client.db.run("INSERT INTO warns (guildid, userid, modid, reason, type, warndate) VALUES (?, ?, ?, ?, ?, ?)", [ 
message.guild.id,
member.id,
message.author.id,
botmessage,
'Warn',
Date.now()
])

                         member.send(warnmessage);
                         sentMessage.edit(successmsg)
                          } catch (e) {
        console.log(
          `[ERR] Error received in ${message.guild.name}. Error: ${e.message}.`
        );
      }
                    } else if (reaction.emoji.name === '❌') { 
                     message.reply('Cancelled command.')
                    }
                    else {
                      message.reply('You reacted with something else. Cancelled command.');
                    }
                  })
                  .catch(collected => {
                    message.reply('You didn\'t react with anything. Cancelled command.');
                  });
            });
      /**
       * Kick the member
       * Make sure you run this on a member, not a user!
       * There are big differences between a user and a member
       */
      
    } else {
      // The mentioned user isn't in this guild
      message.reply("That user isn't in this guild!");
    }
    // Otherwise, if no user was mentioned
  } else {
    message.reply(`You didn\'t mention the user to warn!`);
  }
};

module.exports.help = {
  name: "warn",
  description: "Sends a message to someone's DMs",
  usage: "warn"
};

