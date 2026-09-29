import OpenAI from "openai";


const API_KEY = process.env.GEMINI_API_KEY;

if(!API_KEY){
  console.error("GEMINI API KEY is missing in the env");
  process.exit(1);
}


// creating a openai client
const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export default client;
