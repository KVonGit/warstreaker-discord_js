const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streakcheck')
		.setDescription('Check the streaks.'),
	async execute(interaction) {
		let activeStreaks = {};
		fs.readFile('./.activeStreaks', 'utf8', async function(err, data) {
			if (err) {
		        return err;
			}
			if (typeof data == 'undefined' || data.trim() == '') return;
			activeStreaks = JSON.parse(data);
			const streak = ['Active Streaks\n', '--------------\n'];
			for (const i in activeStreaks) {
	        streak.push(i + ': ' + activeStreaks[i] + '\n');
			}
			await interaction.reply(streak.join(''));
		});
	},
};