import { createHash } from 'crypto'

let handler = async function (m, { conn }) {

    let name = await conn.getName(m.sender)
    let user = global.db.data.users[m.sender]

    if (user.registered === true)
        throw `أنت مسجل بالفعل.\nإذا أردت إلغاء التسجيل استخدم:\n*/unreg*`

    let age = pickRandom([1,2,3,4,5,6,7,8,9]) * 2

    user.name = name
    user.age = age
    user.regTime = +new Date()
    user.registered = true

    let sn = createHash('md5').update(m.sender).digest('hex')

    const pp = await conn.profilePictureUrl(m.sender, "image")
        .catch(_ => "https://telegra.ph/file/ee60957d56941b8fdd221.jpg")

    let cap = `
╭━━「 *Information* 」
│• *Name:* ${name}
│• *Age:* ${age} Years
│• *Status:* _Success_
│• *Serial Number:* ${sn}
╰╾•••
`

    let fkon = {
        key: {
            fromMe: false,
            participant: m.sender,
            remoteJid: m.chat
        },
        message: {
            extendedTextMessage: {
                text: "✔️ تم إنشاء حسابك بنجاح"
            }
        }
    }

    await conn.sendMessage(
        m.chat,
        {
            text: cap,
            contextInfo: {
                externalAdReply: {
                    title: "✔️ تم التسجيل بنجاح",
                    body: "مرحباً بك!",
                    mediaType: 1,
                    thumbnail: await (await fetch(pp)).arrayBuffer(),
                    renderLargerThumbnail: true,
                    sourceUrl: "https://whatsapp.com"
                }
            }
        },
        { quoted: fkon }
    )
}

handler.help = ['verify']
handler.tags = ['infobot']

// الأمر الحقيقي: ".verify"
handler.command = /^\.verify$/i 

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}