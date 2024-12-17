require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType} = require("discord.js");

const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN);

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'echo',
    description: 'Replies with your input!',
    options: [
      {
        type: 3, // STRING type
        name: 'message',
        description: 'The message to echo',
        required: true,
      },
    ],
  },
];

(async () => {
    try {
        console.log('Registering commands');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands}
        )
        console.log("Commands registered without error.");
    } catch (error) {
        console.log(`Error when registering commands. Check command naming convention and/or the tokens: ${error}`);
    }
})()