
import { Client, Collection, Events, GatewayIntentBits, REST, Routes } from 'discord.js'
import config from './config.json' assert { type: 'json' }

class DiscordWrapper {

    //fields
    #client
    #rest

    constructor(token) {

        //initialize client object with intents
        this.#client = new Client({
            intents: config.intents.map(i => GatewayIntentBits[i])
        })

        //initializes REST, for application commands
        this.#rest = new REST().setToken(token)

        //load in event handlers
        this.loadEvents(config.events)
        this.loadCommands(config.commands, config.appid)

        //logs in to bot with token
        this.#client.login(token)
    }

    async loadEvents(events) {
        for (const e in events) {
            let event = ( await import( events[e]) ).default
            this.#client.on( Events[e], event )
        }
    }

    async loadCommands(commands, appid) {
        this.#client.commands = new Collection()
        for (let c of commands) {
            let cmd = ( await import(c) ).default
            await this.#client.commands.set( cmd.data.name, cmd )
        }

        //cause discordjs is stupid af
        let parseable_commands = Array.from(this.#client.commands.values()).map(i => i.data.toJSON() )
        await this.#rest.put(Routes.applicationCommands(appid), { body: parseable_commands } )
    }

}


export default DiscordWrapper