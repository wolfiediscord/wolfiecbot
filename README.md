# WolfieCBOT

WolfieCBOT is a Discord bot which uses the Discord.js Library, with this bot we're using a Command Handler.

## Prerequisites

You'll need:
 - A [Discord account](https://discordapp.com/register)
 - A [Glitch Account](https://glitch.com)
 - Permission to add accounts to a server, or your own server

## Steps to set up:

1. Follow [this tutorial](https://github.com/jagrosh/MusicBot/wiki/Getting-a-Bot-Token)
2. Remix [this repository](https://glitch.com/edit/#!/wolfiecbot-old)
3. Set the `TOKEN` value in `.env` using the Bot User token (you should have this copied)
4. Add the App Bot User to your Discord server using this link: `https://discordapp.com/oauth2/authorize?&client_id=<CLIENT ID>&scope=bot&permissions=2146958591` replacing `<CLIENT_ID>` with the Client ID found on the page of your App

**Note:** NEVER **EVER** SHARE YOUR TOKEN! People could mess up your server!

**Notice:** If you would like your bot to run 24/7, boost the project by becoming a [Glitch Member](https://glitch.com/pricing).

## The code

Unlike bots which store commands in bot.js, this bot stores commands in the commands folder.

For now the prefix is `!`, You can change it in the `.env` file.

We're using the [Discord.js](https://discord.js.org/#/) library to interact with the Discord API.

To check if the bot is working, check the logs to find "Connected!"
