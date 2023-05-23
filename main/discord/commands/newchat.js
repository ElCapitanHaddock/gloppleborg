
import {SlashCommandBuilder, TextChannel} from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName('newchat')
        .setDescription('Creates a new gpt-3.5-turbo thread.')
        .addStringOption(option =>
            option
                .setName('title')
                .setDescription("Thread title") //🤖
                .setRequired(true)
        ),

    async execute(interaction) {
        let title = interaction.options.getString('title')
        let channel = await interaction.channel

        let thread
        if (channel instanceof TextChannel) {
            thread = await channel.threads.create({
                name: title + ' 🤖'
            })
        }

        await interaction.reply(`New gpt-3.5-turbo thread created`, {ephemeral: true})
    }

}