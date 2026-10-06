import { tavily } from "@tavily/core";


const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});


// method 1: use tavily using sdk
export async function webSearch(query: string) {
  const response = await tvly.search(query, {
    maxResults: 5,
  });

  // console.log("Response", response);
  return response.results.map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content,
  }));
}



export const webSearchTool = {
  type: "function" as const,
  function: {
    name: "web_search",
    description: "Search the public web for current or missing information.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The search query.",
        },
      },
      required: ["query"],
    },
  },
};


// method 2: use tavily using fetch
// async function webSearch(query: string) {
//   const response = await fetch("https://api.tavily.com/search", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
//     },
//     body: JSON.stringify({
//       query,
//       max_results: 5,
//     }),
//   });

//   const data = await response.json();

//   return data.results.map((result: any) => ({
//     title: result.title,
//     url: result.url,
//     content: result.content,
//   }));
// }
