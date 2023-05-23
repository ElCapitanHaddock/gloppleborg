import gpt from "../../openai/openai_api.js";
import {EmbedBuilder} from "discord.js";

export default async message => {
    if (message.author.id === '1100893359398191164') return

    if (message.channel.type === 11) {
        const first = await message.channel.fetchStarterMessage()

        //thread was created by gloppleborg
        if (first.member.id === '1100893359398191164') {
            //messages: [ {'role': 'user', 'content': m} ]

            //check last message
            let last = ( await message.channel.messages.fetch({ limit: 2 }) ).last()

            if (last.author.id === '1100893359398191164' && last.content === '*Thinking...*') {
                message.delete()
                return
            }

            let ctx = []
            let size = 0
            let previous

            while (true) {
                const options = { limit: 100 };
                if (previous) options.before = previous

                const messages = await message.channel.messages.fetch(options)
                //16360

                messages.forEach( m => {
                    size += m.length
                    let isbot = m.author.id === '1100893359398191164'
                    let c = m.embeds.length > 0 ? m.embeds[0].description : m.content
                    ctx.unshift( { role: isbot ? 'system' : 'user', content: c } );

                })
                previous = messages.last().id;

                if (messages.size !== 100 || size >= 16360) {
                    break;
                }
            }

            //concat to fit 4900 tokens (16360 characters)
            while (size > 16360) {
                size -= ctx.pop().content.length
            }

            let reply = await message.channel.send('*Thinking...*')

            let attempts = 0
            while (attempts < 3) {
                attempts++

                let res = await gpt.chat({
                    model: 'gpt-3.5-turbo',
                    messages: ctx
                })
                if (res.choices) {

                    let cont = res.choices[0].message.content
                    const emb = new EmbedBuilder()
                        .setDescription(cont)

                    reply.edit({ content: '', embeds: [emb] });
                    break
                }
                else console.log(`[FAILURE: ${res}], attempt #${attempts}`)
            }
        }
    }
}
