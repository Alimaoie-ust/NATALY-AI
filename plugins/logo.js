import axios from "axios";
import pkg from "@adiwajshing/baileys";
const { proto } = pkg;

const handler = async (m, { conn, args, text }) => {
  const logos = {
    1: "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html",
    2: "https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html",
    3: "https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html",
    4: "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html",
    5: "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html",
    6: "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html",
    7: "https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html",
    8: "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html",
    9: "https://en.ephoto360.com/free-bear-logo-maker-online-673.html",
    10: "https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html",
    11: "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html",
    12: "https://en.ephoto360.com/create-typography-status-online-with-impressive-leaves-357.html",
    13: "https://en.ephoto360.com/dragon-ball-logo-maker-online-704.html",
    14: "https://en.ephoto360.com/hand-written-logo-effect-768.html",
    15: "https://en.ephoto360.com/neon-light-effect-771.html",
    16: "https://en.ephoto360.com/3d-castle-pop-749.html",
    17: "https://en.ephoto360.com/frozen-christmas-350.html",
    18: "https://en.ephoto360.com/3d-foil-balloons-351.html",
    19: "https://en.ephoto360.com/3d-colorful-paint-652.html",
    20: "https://en.ephoto360.com/american-flag-3d-721.html",
  };

  // If no arguments are provided, show the list of available logos
  if (!text) {
    let menu = `*🎨 NATALY LR Logo Maker 🎨*\n\n\n`;
    menu += `*Available logo styles*:\n\n`;
    for (const [number, url] of Object.entries(logos)) {
      menu += `${number}. ${url.split("/").pop().replace(/-/g, " ")}\n`;
    }
    menu += `\nUsage: \`.logo <text> <effect number>\`\nExample: \`.logo Nour 1\``;
    return conn.sendMessage(m.chat, { text: menu }, { quoted: m });
  }

  // Split the input into text and effect number
  const [inputText, effectNumber] = text.split(" ");
  const choice = parseInt(effectNumber);

  // Validate the effect number
  if (!logos[choice]) {
    return conn.sendMessage(
      m.chat,
      { text: `Invalid effect number. Please choose a number between 1 and ${Object.keys(logos).length}.` },
      { quoted: m }
    );
  }

  try {
    const url = logos[choice];
    const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=${encodeURIComponent(
      url
    )}&name=${encodeURIComponent(inputText)}`;

    const response = await axios.get(apiUrl);
    const result = response.data.result.download_url;

    await conn.sendMessage(
      m.chat,
      {
        image: { url: result },
        caption: `*NATALY LR* 🗣️✅`,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    conn.sendMessage(
      m.chat,
      { text: "Failed to generate logo. Please try again later." },
      { quoted: m }
    );
  }
};

handler.help = ["logo"];
handler.tags = ["tools"];
handler.command = ["logo"];
handler.limit = true
export default handler;
