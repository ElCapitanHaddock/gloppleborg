
export default async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return

    try {
        await command.execute(interaction)
    }
    catch (e) {
        await interaction.followUp({ content: `There was an error! \`${e}\``, ephemeral: 'true'} )
    }
}
