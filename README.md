# ralsei-bot
Discord bot fetching student grades from chamilo
<i>This repo packages:</i>

## chamilo.py
A program based on selenium used to scrap grades from Chamilo.<br/>
The result is written in a file under the JSON format<br/>
Logging on Chamilo using credentials stored in a .env file, default conf below:
```bash
#create a '.env' file and write a conf like the one below inside it:
CHAMILO_USERNAME=WriteYourUsernameHere
CHAMILO_PASSWORD=WriteYourPassHere
```
## ralsei-bot
A simple discord bot alerting you when your grade changes. based on chamilo.py

## notions
<i>A reminder about simple discord concepts</i>

### <u>Interactions</u>
```text
An Interaction is the message that your application receives,
when a user uses an application command or a message component.
```
interaction object (if it is one) holds attribute about guild user & more, example below:
```js
client.on('interactionCreate', async interaction => {
        console.log("guild-info: ${interaction.guild}");
        console.log("user-info: ${interaction.user}");
		await interaction.reply('an interaction has been created');
});
```

<hr/>

### <u>Intents</u>
```text
Intents are defined to express what kind of event your bot should listen to.
```

<hr/>
