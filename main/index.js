

//import secrets from './secrets.json' assert { type: 'json' }

//TODO: Sharding
import DISCORD from './discord/discord_api.js'
//new DISCORD(secrets.discord_token)
new DISCORD(process.env.discord_token)