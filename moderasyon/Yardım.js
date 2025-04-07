const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
    let gold = await db.fetch(`gold_${message.member.id}`);
    let user = message.mentions.users.first() || message.author;

    // Gerekli rolün ID'si
    const requiredRole = "1345740320192598099";
    const userRoles = message.member.roles.cache.map(role => role.id);

    if (!userRoles.includes(requiredRole)) {
        return message.reply("Bu komutu kullanmak için gerekli <@&1345740320192598099> rolüne sahip değilsiniz.");
    }

    const yardimEmbed = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
        .setTitle(`> <:klan:1342237452990939166> 『 𝙼𝙾𝙳𝙴𝚁𝙰𝚂𝚈𝙾𝙽 』 Yardım Menüsü`)
        .setDescription(`
> <a:8onking:1215015475814076508> **Merhaba <@${message.author.id}>! Prefix: \`${prefix}\`**

> <a:gelistirici:1050119158387458068> ─────── [ Moderasyon Komutları ] ───────
> \`${prefix}mute @Kullanıcı [süre] [sebep]\` → **[MUTE]'Ler'**
> \`${prefix}uyarı ekle @Kullanıcı\` → **Uyarı ekler**
> \`${prefix}ban @Kullanıcı [süre] [sebep]\` → **[BAN]'Lar'**
> \`${prefix}kick @Kullanıcı [sebep]\` → **[KİCK]'Ler'**
> \`${prefix}link\` → **Link engelleme w!aç/kapat**
> \`${prefix}küfür\` → **Küfür engelleme w!aç/kapat**
> \`${prefix}büyükharf\` → **Büyük harf engelleme w!aç/kapat**

> 🕒 **Bu mesaj 30 saniye içinde otomatik olarak silinecektir.**
        `)
        .setImage('https://cdn.discordapp.com/attachments/1341193865461366844/1345741375597187182/woe.png');

    message.channel.send(yardimEmbed).then(msg => {
        setTimeout(() => {
            msg.delete().catch(() => {});
        }, 30000); // 30 saniye sonra silinir
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod', 'mod-yardım', 'moderasyon-yardım'],
    permLevel: 0
};

exports.help = {
    name: 'modyardım',
    description: 'Moderasyon komutları yardım menüsünü gösterir.',
    usage: 'modyardım'
};
