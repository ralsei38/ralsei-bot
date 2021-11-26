// to build your own /commands
const {Builder} = require('@discordjs/builders');
// builder dependencies
const { REST } = require('@discordjs/rest');
const { Routes } = require('@discordjs/route');

const commands = [
	new Builder().setName('ping').setDescription('We calling this commands, ralsei responds \'pong\''),
	
]