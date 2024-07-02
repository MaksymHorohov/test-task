import OpenAI from "openai";
export class OpenaiHandler {
    client: OpenAI
    model: string

    constructor(instance: OpenAI, model: string) {
        this.client = instance
        this.model = model
    }

    async renderThroughAI(payload: string) {
        const result = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                {role: 'user', content: payload}]
        });
        return result.choices[0].message
    }
}