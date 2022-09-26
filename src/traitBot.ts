import {Client, GatewayIntentBits, REST, Routes} from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const commands = [
	{
		description: 'Replies with Pong!',
		name: 'ping',
	},
];

const rest = new REST({version: '10'}).setToken(process.env.BOT_TOKEN || '');

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands('1024090086360498269'), {
			body: commands,
		});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.on('ready', () => {
	console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

void client.login(process.env.BOT_TOKEN);
