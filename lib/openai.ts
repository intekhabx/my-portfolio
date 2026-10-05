import OpenAI from "openai";


const API_KEY = process.env.LLM_API_KEY;
const BASE_URL = process.env.LLM_BASE_URL;

if(!API_KEY || !BASE_URL){
  console.error("LLM_API_KEY or LLM_BASE_URL is missing in the env");
  process.exit(1);
}


// creating a openai client
const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export default client;
