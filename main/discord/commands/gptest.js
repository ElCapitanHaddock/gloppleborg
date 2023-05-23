
import gpt from '../../openai/openai_api.js'
import { SlashCommandBuilder } from "discord.js"

export default {
    data: new SlashCommandBuilder()
        .setName('gptest')
        .setDescription('Tests gpt-turbo-3.5')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription("What do you want to say?")
                .setRequired(true)
        ),

    async execute(interaction) {
        let m = interaction.options.getString('message')

        await interaction.deferReply()
        let res = await gpt.chat({
            model: 'gpt-3.5-turbo',
            messages: [ {'role': 'user', 'content': m} ],
            max_tokens: '500' //2000-character limit on Discord
        })
        await interaction.editReply(res.choices[0].message.content)
    }

}