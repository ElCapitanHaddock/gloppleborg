

//import secrets from '../secrets.json' assert { type: 'json' }
import { Configuration, OpenAIApi } from "openai";


class GPTSingleton {
    //fields
    #ai

    constructor(key) {
        const c = new Configuration({ apiKey: key })
        this.#ai = new OpenAIApi(c)
        console.log("Connected to openAI!")
    }

    async chat(args) {
        try {
            let res = await this.#ai.createChatCompletion(args)
            return res.data
        }
        catch (e) { return e.message }
    }

    async complete(args) {
        try {
            let res = await this.#ai.createCompletion(args)
            return JSON.parse(res).data
        }
        catch (e) { return e.message }
    }
}

export default new GPTSingleton(process.env.openai_key)