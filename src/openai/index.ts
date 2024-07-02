import {OpenaiHandler} from "./openai.handler";
import {openai} from "./openai.connect";
export const openAIHandler = new OpenaiHandler(openai, process.env.OPENAI_MODEL)