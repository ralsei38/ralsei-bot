// READ THE DOC ! https://discord.js.org/#/docs/main/stable/general/welcome
// Require the necessary discord.js classes
// destructuration of the discord.js req into theses variables
const { Client, Intents } = require('discord.js');

//destructuring config.json file finding corresponding token entry and writing to the token variable.
const { token } = require('./config.json')

// Create a new client instance
//ARGS: 
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// .once to run code only on time...
client.once('ready', () => {
	console.log('Ready!');
});

// Logs the client in, establishing a WebSocket connection to Discord.
client.login(token);