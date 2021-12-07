// to build your own /commands
const { SlashCommandBuilder } = require('@discordjs/builders');
// builder dependencies
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('grade').setDescription('Ralsei says \'yup\' if there is a new grade'),
]
	.map(command => command.toJSON());
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
.then(() => console.log('Successfully registered application commands.'))
.catch(console.error);