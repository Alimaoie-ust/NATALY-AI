let handler = async (m, { conn, text }) => {

    if (!text) return m.reply("❗️استعمل:\n\n*.welcome <group-id>*");

    let groupId = text.trim();
    const thumb = "https://raw.githubusercontent.com/alimaoie-us/Nataly-AI/main/src/Nataly.jpg";

    let welcome = `*مـرحـبـاً 👋*

أنا *NATALY AI* المساعدة الذكية الخاصة بالمجموعة 🙆‍♀️  
تم تطويــري بواسطة *ALI M..*  

سأكون هنا لمساعدتكم في كل ما تحتاجونه 💫  
اضغطوا على أحد الأزرار بالأسفل للاستكشاف!`;

    try {

        let buttons = [
            { buttonId: ".menu", buttonText: { displayText: "💡 قائمة الأوامر" }, type: 1 },
            { buttonId: ".owner", buttonText: { displayText: "👤 المطور" }, type: 1 },
            { buttonId: "url#https://whatsapp.com/channel/0029Vb71THB0bIdswhCzVJ0f", buttonText: { displayText: "📢 قناة البوت" }, type: 1 },
        ];

        let msg = {
            image: { url: thumb },
            caption: welcome,
            footer: "NATALY AI",
            buttons: buttons,
            headerType: 4
        };

        await conn.sendMessage(groupId, msg);

        await m.reply("✅ تم إرسال رسالة الترحيب بنجاح ✔");

    } catch (e) {
        console.log("WELCOME ERROR:", e);
        return m.reply("❌ فشل في إرسال الترحيب. تأكد أن البوت داخل المجموعة.");
    }
};


handler.command = /^welcome$/i;
handler.rowner = true;

export default handler;