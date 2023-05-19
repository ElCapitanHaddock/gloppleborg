
import { SlashCommandBuilder } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with ⚪'),

    async execute(interaction) {
        await interaction.reply('⚪')
    }
}