// READ THE DOC ! https://discord.js.org/#/docs/main/stable/general/welcome

//importing discordjs lib, to interact with discord api, destructuring into theses vars
const { Client, Intents, Collection } = require('discord.js');

//importing fs to interact with the filesystem
const fs = require('fs');

//importing config.json destructuring into token
const { token } = require('./config.json')

// Create a new client instance using class Client({intents; ;[list of intents]})
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//dictionnary like object, opti for discordjs
client.commands = new Collection()

// .once to run code only on time...
client.once('ready', () => {
	console.log('Ready!');
});

//on() is used to check for events. It accepts an event name, and then a callback function to be called when the event takes place.
//intents = Intents.FLAGS.GUILDS, so interaction exposes attributes such as interaction.guild.name interaction.guild.foo
//TODO: see how async await works
client.on('interactionCreate', async interaction => {
		//if the interaction is a commmand
		if(!interaction.isCommand()) return;
		//print command name
		console.log("this function has for parameter, interaction: ${interaction}");
		await interaction.reply('an interaction has been created');
});
// Logs the client in, establishing a WebSocket connection to Discord.
client.login(token);