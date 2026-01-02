let handler = async (m, { conn }) => {
  const teks = `📦 *رابط السورس كود الخاص بالبوت:*\n` +
    `https://github.com/alimaoie-us/Nataly-AI\n\n` +
    `📢 *القناة الرسمية على واتساب:*\n` +
    `https://whatsapp.com/channel/0029Vb71THB0bIdswhCzVJ0f\n\n` +
    `⭐ لا تنسَ وضع نجمة على المستودع إذا أعجبك المشروع!`;

  await conn.reply(m.chat, teks, m);
};

handler.help = handler.command = ['sc','script'];
handler.tags = ['tools'];
handler.limit = true;
export default handler;
