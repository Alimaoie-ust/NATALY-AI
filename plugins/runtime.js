import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
let handler = async (m, { conn, args, command }) => {
  let _muptime;
  if (process.send) {
    process.send("uptime");
    _muptime =
      (await new Promise((resolve) => {
        process.once("message", resolve);
        setTimeout(resolve, 1000);
      })) * 1000;
  }
  let muptime = clockString(_muptime);
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);

  let tag = `@${m.sender.replace(/@.+/, "")}`;
  let mentionedJid = [m.sender];

  m.reply(`乂 *U P T I M E*\n•> ${uptime}`);
};
handler.help = ["runtime"];
handler.tags = ["tools"];
handler.command = ["runtime", "rt"];

export default handler;

function ucapan() {
  const time = moment.tz("Africa/Casablanca").format("HH");
  let res = "It's early in the morning, why haven't you slept yet?? 🥱";
  if (time >= 4) {
    res = "morning 🌄";
  }
  if (time >= 10) {
    res = "morning ☀️";
  }
  if (time >= 15) {
    res = "evening 🌇";
  }
  if (time >= 18) {
    res = "night 🌙";
  }
  return res;
}
function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [d, " *Days* ", h, " *Hours* ", m, " *Minutes* ", s, " *Seconds* "]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
