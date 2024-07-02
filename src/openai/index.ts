import {OpenaiHandler} from "./openai.handler";
import {openai} from "./openai.connect";

import config from "./../../config.json"
export const openAIHandler = new OpenaiHandler(openai, config['OPENAI_MODEL'])