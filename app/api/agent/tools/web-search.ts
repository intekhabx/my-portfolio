import { tavily } from "@tavily/core";


const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});


// method 1: use tavily using sdk
export async function webSearch(query: string, site?: string) {

  const finalSite = site?.trim()
                        .replace(/^site:\s*/i, "")   // remove site: if site has
                        .replace(/^https?:\/\//, "") // remove https://
                        .replace(/^www\./, "")       // remove www.
                        .replace(/\/$/, "");

  const finalQuery = finalSite ? `site:${finalSite} ${query}` : query;
  // console.log("Tavily query:", finalQuery);

  const response = await tvly.search(finalQuery, {
    maxResults: 5,
    searchDepth: "advanced",
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
    description: "Search the public web for current or missing information. If the user wants results from a specific website, provide the website separately using the site parameter.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The actual search query or terms, for example 'projects' or 'repository'.",
        },
        site: {
          type: "string",
          description: "Optional website/domain to restrict the search to, for example 'github.com/intekhabx'"
        }
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
