import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("Please provide a query. Example: .ai-devs calculator");

  async function chat(query) {
    const url = "https://api.gravitywrite.com/api/singlePrompt/contentsnew";
    const params = new URLSearchParams({
      access_token: "MPRgSfbvscIEdOKY3307nfU5oIdva20qYDeO98SIaee3309d",
      prompt_id: "2008",
      tone_id: "10",
      question_461: query, // Dynamic query from user input
      question_449: "python", // Can be changed to js, python, etc.
    });
    const requestUrl = `${url}?${params.toString()}`;
    const headers = {
      Authorization: "Bearer MPRgSfbvscIEdOKY3307nfU5oIdva20qYDeO98SIaee3309d",
      Accept: "stream",
      "sec-ch-ua-platform": '"Android"',
      app: "MTIzfFdsd2Vi",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      "sec-ch-ua": '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?1",
      Origin: "https://app.gravitywrite.com",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      Referer: "https://app.gravitywrite.com/",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    };

    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Response:", data); // Log the response for debugging
        m.reply(data); // Send the response to the user
      } else {
        console.error("Error in response:", response.status, response.statusText);
        m.reply("An error occurred while fetching the response.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      m.reply("Failed to process your request. Please try again later.");
    }
  }

  // Call the chat function with user input
  chat(text);
};

handler.help = handler.command = ["ai-devs"];
handler.tags = ["ai"];
export default handler;
