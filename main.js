require('dotenv').config();
    const https = require('https')
require('./register-commands');
const utils = require('./utils.js');

const {Client, IntentsBitField, REST } = require('discord.js');
const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN
);

// add_cmd(rest, commands, Routes)
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online. Make sure that the commands registered.`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand && interaction.message.content === "ping") {
        interaction.reply({content: 'pong!'});
    }
    if (interaction.commandName === utils.CMD_PING) {
        interaction.reply({content:"Pong!"})
    }
    // console.log(interaction);


})

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase().includes("ping") && !message.author.bot) {
        await message.reply({content:"Pong!"});
    }
})