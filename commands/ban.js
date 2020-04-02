const Discord = module.require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.guild)
    return message.channel.send(
      "You are not in a guild. Please go to one to ban users."
    );
  const user = message.mentions.users.first() || client.users.cache.get(args[0]);
  let botmessage = args.slice(1).join(" ");
  // embed
  const banmessage = new MessageEmbed()
    .setTitle(`Banned from ${message.guild.name}`)
    .setColor(0xff0000)
    .setDescription(
      `You were banned for "${botmessage}" in ${message.guild.name}`
    );
  if (!message.member.hasPermission(("BAN_MEMBERS"||"ADMINISTRATOR")))
    return message.channel.send(
      "You do not have permission to use this command!"
    );
  if (user) {
    // Now we get the member from the user
    const member = message.guild.member(user);
    // If the member is in the guild
    if (member) {
      const confirmmsg = new MessageEmbed()
    .setTitle(`Are you sure?`)
    .setColor(0xff0000)
    .setDescription(
      `Are you sure you want to ban ${user.tag}?`
    ).setFooter("This command will be cancelled in 10 seconds if you don't react.")
          const successmsg = new MessageEmbed()
    .setTitle(`Successfully banned ${user.tag}`)
    .setColor(0xff0000)
    .setDescription(
      `Successfully banned ${user.tag} for: "${botmessage}".`
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
'Ban',
Date.now()
])
         member.send(banmessage);
      } catch (e) {
        console.log(
          `[ERR] Error received in ${message.guild.name}. Error: ${e.message}.`
        );
      }
      member
        .ban(`Banned by "${message.author.username}" Reason: "${botmessage}"`)
        .then(() => {
          // We let the message author know we were able to kick the person
          sentMessage.edit(successmsg);
        })
        .catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply(
            "I was unable to ban the member. Do I have permission?"
          );
          // Log the error
          console.error(
            `Error Received in ${message.guild.name}. Error Message: ${err.message}`
          );
        
        });
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
    message.reply(`You didn\'t mention the user to ban!`);
  }
};
module.exports.help = {
  name: "ban",
  description: "Bans a user",
  usage: "ban"
};
