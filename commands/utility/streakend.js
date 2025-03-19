const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streakend')
		.setDescription('End a streak')
		.addStringOption(option =>
			option.setName('player')
				.setDescription('The player\'s name')),
	async execute(interaction) {
		const player = interaction.options.getString('player');
		if (typeof player == 'undefined') {
			await interaction.reply('Target not defined.');
			return;
		}
		let activeStreaks = {};
		fs.readFile('./.activeStreaks', 'utf8', function(err, data) {
			if (err) {
		  return err;
			}
			if (typeof data == 'undefined' || data.trim() == '') return;
			activeStreaks = JSON.parse(data);
			delete (activeStreaks[player]);
			fs.writeFile('./.activeStreaks', JSON.stringify(activeStreaks), async function(err) {
				if (err) {
					console.log(err);
					return err;
				}
				// console.log(fname + " saved!");
				console.log('.activeStreaks' + ' saved!');
				const streak = ['Active Streaks\n', '--------------\n'];
				for (const i in activeStreaks) {
					streak.push(i + ': ' + activeStreaks[i] + '\n');
				}
				await interaction.reply(streak.join(''));
			});
		});
	},
};