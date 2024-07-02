import OpenAI from "openai";
import config from "./../../config.json"
export const openai = new OpenAI({
    apiKey: config['OPENAI_API_KEY'], // This is the default and can be omitted
    dangerouslyAllowBrowser: true
});