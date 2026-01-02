import fetch from 'node-fetch';

let handler = async function (m, { conn }) {

    // بيانات المستخدم
    let user = global.db.data.users[m.sender];

    // إذا لم يكن مسجلاً
    if (!user.registered)
        return conn.reply(m.chat, `❌ *أنت غير مسجل في قاعدة البيانات.*\n\nاستخدم:  @verify للتسجيل.`, m);

    // حذف البيانات
    user.registered = false;
    user.name = "";
    user.age = 0;
    user.regTime = 0;

    // الحصول على صورة البروفايل أو صورة افتراضية
    let pp;
    try {
        pp = await conn.profilePictureUrl(m.sender, 'image');
    } catch {
        pp = "https://telegra.ph/file/ee60957d56941b8fdd221.jpg";
    }

    // جلب الصورة وتحويلها إلى Buffer
    let resp = await fetch(pp);
    let arrayBuffer = await resp.arrayBuffer();
    let thumb = Buffer.from(arrayBuffer);

    // جلب الصورة المصغرة من الرابط الخارجي
    let thumbUrl = "https://raw.githubusercontent.com/alimaoie-us/Nataly-AI/main/src/Nataly.jpg";
    let respThumb = await fetch(thumbUrl);
    let arrayBufferThumb = await respThumb.arrayBuffer();
    let thumbBuffer = Buffer.from(arrayBufferThumb);

    // نص الرسالة
    let msg = `
✔️ *تم حذف تسجيلك بنجاح!*

يمكنك التسجيل مرة أخرى عبر الضغط على الزر 👇
`;

    // إرسال الرسالة مع صورة البروفايل + زر + صورة مصغرة مختلفة
    await conn.sendMessage(
        m.chat,
        {
            image: thumb, // الصورة الكبيرة من البروفايل
            caption: msg,
            contextInfo: {
                externalAdReply: {
                    title: "✔️ حذف التسجيل",
                    body: "تم مسح جميع بيانات حسابك",
                    mediaType: 1,
                    thumbnail: thumbBuffer, // الصورة المصغرة الجديدة
                    renderLargerThumbnail: true,
                    sourceUrl: "https://whatsapp.com"
                }
            },
            buttons: [
                {
                    buttonId: "@verify",
                    buttonText: { displayText: "تسجيل جديد" },
                    type: 1
                }
            ],
            headerType: 4
        },
        { quoted: m }
    );
}

handler.help = ["unreg"];
handler.tags = ["infobot"];
handler.command = /^unreg$/i;

export default handler;