const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
    let gold = await db.fetch(`gold_${message.member.id}`);
    let user = message.mentions.users.first() || message.author;

    const requiredRole = "1215412989667057694";
    const userRoles = message.member.roles.cache.map(role => role.id);

    if (!userRoles.includes(requiredRole)) {
        return message.reply("Bu komutu kullanmak için gerekli <@&1215412989667057694> rolüne sahip değilsiniz.");
    }

    const yardimlistesi2 = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTimestamp()
        .setTitle(`> <:klan:1342237452990939166> 『 𝚂𝚄𝙽𝚄𝙲𝚄 』 Yardım Menüsü`)
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
        .setDescription(`
> <a:8onking:1215015475814076508> **Merhaba <@${message.author.id}>! Prefix: \`${prefix}\`**

> <a:gelistirici:1050119158387458068> ───────── [ Genel Komutlar ] ─────────
> \`${prefix}üye\` → Üyeler hakkında bilgi verir.
> \`${prefix}afk [sebep]\` → Sunucuda AFK olmanızı sağlar.
> \`${prefix}bot @Kullanıcı [isim]\` → Bot kaydı için kullanılır.
> \`${prefix}sunucubilgi\` → Sunucu bilgilerini gösterir.
> \`${prefix}isim\` → İsim değiştirmenizi sağlar. (24 saatte 1 defa)
> \`${prefix}kurallar\` → Sunucudaki [KURALLAR] uymayan [Atılır]...
> \`${prefix}kurallar2\` → Sunucudaki [KURALLAR] uymayan [Atılır]...

> <a:gelistirici:1050119158387458068> ───────── [ Etkileşimli Komutlar ] ─────────
> \`${prefix}laf @Kullanıcı\` → Kullanıcıya laf atarsınız 😄
> \`${prefix}öneri [mesajınız]\` → Öneride bulunursunuz.
> \`${prefix}hile\` → Hile bildirimi yaparsınız.

> 🕒 **Bu mesaj 30 saniye içinde otomatik olarak silinecektir.**`)
        .setImage('https://cdn.discordapp.com/attachments/1341193865461366844/1345741375597187182/woe.png');

    message.channel.send(yardimlistesi2).then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 30000); // 30 saniye sonra siler
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yardım", "sunucu-yardım"],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
    description: 'Sunucu yardım menüsünü gösterir.',
    usage: 'yardım'
};
