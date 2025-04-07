const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

exports.run = async (client, message) => {
    const requiredRole = "1215412989667057694";
    const userRoles = message.member.roles.cache.map(role => role.id);

    if (!userRoles.includes(requiredRole)) {
        return message.reply("Bu komutu kullanmak için gerekli <@&1215412989667057694> rolüne sahip değilsiniz.");
    }

    let komutlar = "";
    client.commands.forEach(cmd => {
        let usage = cmd.help.usage || "";
        let desc = cmd.help.description || "Açıklama yok.";
        komutlar += `\`${prefix}${usage}\` → ${desc}\n`;
    });

    const embed = new Discord.MessageEmbed()
        .setColor('#00BFFF')
        .setTitle(`:klan: 『 SUNUCU 』 Yardım Menüsü`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`
👑 Merhaba <@${message.author.id}>! Prefix: \`${prefix}\`

</> ──────── [ Genel Komutlar ] ────────

${komutlar}

</> ──────── [ Bilgilendirme ] ────────

🕒 Bu mesaj 30 saniye içinde otomatik olarak silinecektir.
        `)
        .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı. • ${new Date().toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}`)
        .setTimestamp();

    message.channel.send(embed).then(msg => {
        setTimeout(() => {
            msg.delete().catch(() => {});
        }, 30000); // 30 saniye
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["komut", "komutlar", "help"],
    permLevel: 0
};

exports.help = {
    name: "komutlar",
    description: "Bot komutlarını listeler.",
    usage: "komutlar"
};
