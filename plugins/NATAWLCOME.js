import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply("❗️استعمل:\n*.welcome <group-jid>*");

    const groupId = text.trim(); // JID المجموعة
    const welcomeText = `👋 مرحباً بكم في المجموعة!\nأنا *NATALY AI*، رفيقتكم الذكية 🤖\nاختر أحد الخيارات أدناه:`;

    // إعداد قائمة الخيارات بنفس هيكل menu.js
    const menus = ['💡 قائمة الأوامر', '👤 المطور'];
    const gc = ['Welcome/Goodbye'];

    let isiMenu = menus.map((item) => ({
        header: item,
        title: item,
        description: item === '💡 قائمة الأوامر' ? "إظهار قائمة أوامر البوت" : "معلومات صاحب البوت",
        id: item === '💡 قائمة الأوامر' ? ".menu" : ".owner"
    }));

    let isiGrup = gc.map((item) => ({
        header: item,
        title: item,
        description: "إعدادات الترحيب/الوداع",
        id: ".welcome"
    }));

    const datas = {
        title: "🧩 الترحيب & الخيارات",
        sections: [
            { title: "قائمة الأوامر", highlight_label: "New", rows: [...isiMenu] },
            { title: "قائمة الترحيب", highlight_label: "Hot", rows: [...isiGrup] }
        ]
    };

    const thumbnail = "https://raw.githubusercontent.com/alimaoie-us/Nataly-AI/main/src/Nataly.jpg";

    try {
        await conn.sendListImageButton(
            groupId,        // JID المجموعة
            welcomeText,    // نص الترحيب
            datas,          // بيانات القائمة
            "اختر خياراً", // Footer / wm
            thumbnail       // الصورة
        );

        await m.reply("✅ تم إرسال الترحيب مع الصورة وقائمة الخيارات ✔");
    } catch (e) {
        console.log("WELCOME ERROR:", e);
        return m.reply("❌ فشل في إرسال الترحيب. تأكد أن البوت داخل المجموعة وأن الـJID صحيح.");
    }
};

handler.help = ["welcome"];
handler.tags = ["owner"];
handler.command = /^welcome$/i;
handler.rowner = true;

export default handler;