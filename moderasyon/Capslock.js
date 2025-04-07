const db = require("quick.db");

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Kullanım: `w!büyükharf aç yada w!büyükharf kapat`");

    const status = args[0].toLowerCase();

    if (status !== "aç" && status !== "kapat") return message.channel.send("Lütfen 'aç' veya 'kapat' şeklinde bir değer girin.");

    // Sunucu içinde büyük harf engelleme sisteminin durumunu sakla
    db.set(`capslock_${message.guild.id}`, status === "aç");

    message.channel.send(`Büyük harf engelleme sistemi başarıyla ${status === "aç" ? "açıldı" : "kapatıldı"}.`);
};

exports.conf = {enabled: true, permLevel: 1}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['büyükharf', 'bh',],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [ʙᴜ̈ʏᴜ̈ᴋ ʜᴀʀғ]',
    description: "",
    usage: ',büyükharf'
};