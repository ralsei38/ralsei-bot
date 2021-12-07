// READ THE DOC ! https://discord.js.org/#/docs/main/stable/general/welcome
//importing discordjs lib, to interact with discord api, destructuring into theses vars
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

//importing config.json destructuring into token
const { token } = require('./config.json');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');


//importing fs to interact with the filesystem
const fs = require('fs');

function getGrade(JSONFormat=true, prettify=false){
    let rawGrade = fs.readFileSync('grade.json');

	if(prettify === true){
		return  prettifyGradeResponse(JSON.parse(rawGrade)); //to lazy to indent myself tbh
	}
	else if(JSONFormat === true){
		return JSON.parse(rawGrade);
	}
	else{
		return rawGrade;
	}
}

function prettifyGradeResponse(grade){
	//=> takes as parameter a JSON grade variable { courseName: [coef, grade], courseName2: [coef2, grade2], etc }
	let content = []
	let i = 0;
	for(let [key, value] of Object.entries(grade)){
		i += 1;
		if(i == 8){
			break;
		}
		let  tmpEmbed = new MessageEmbed()
		tmpEmbed.setColor('GREEN')
		// empty strings creates an error, replacing
		let grade = value[1].length == 0 ? "currently unavailable" : value[1];
		tmpEmbed
			.addFields(
				{name: 'course', value: key, inline: false},
				{name: 'coef', value: value[0].toString(), inline: true},
				{name: 'grade', value: grade.toString(), inline: true},
			);
		content.push(tmpEmbed);
	}
	// let content = [];
	// for(const [key, value] of Object.entries(grade)){
	// 	let courseName = bold(key )+ "\n";
	// 	let coef =  "coef:\t\t"  + italic(value[0])+ "\n";
	// 	let grade =  "grade:\t\t" + italic(value[1])+ "\n";
	// 	content.push(blockQuote(courseName + coef + grade));
	// }
	console.log(content);
	return content;
}


// Create a new client instance using class Client({intents; ;[list of intents]})
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//dictionnary like object, a better approach for discordjs they say
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
		const { commandName } = interaction
		//print command name
		if(commandName === 'ping'){
			await interaction.reply('pong')
		}
		else if(commandName === 'grade'){
			const response = prettifyGradeResponse(getGrade(prettify=true));
			await interaction.reply({embeds: response});
		}
		else{
			console.log(`this function has for parameter, interaction: ${interaction}`);
			await interaction.reply('an interaction has been created');
		}
});
// Logs the client in, establishing a WebSocket co	nnection to Discord.
client.login(token);