const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Bunu yapabilmek için yeterli yetkin yok").then(msg => msg.delete({ timeout: 5000 })); // Hata mesajını 5 saniye sonra otomatik olarak sil
  let mesajid = args[0];
  let yenimesaj = args.slice(1).join(" ");
  message.channel.messages.fetch({ around: mesajid, limit: 1 }).then(messages => {
    const mesaj = messages.first();
    if (!mesaj) return message.channel.send("Belirtilen ID ile bir mesaj bulunamadı").then(msg => msg.delete({ timeout: 5000 })); // Hata mesajını 5 saniye sonra otomatik olarak sil
    mesaj.edit(yenimesaj);
    message.react("✅");
  }).catch(err => {
    console.error(err);
    message.channel.send("Bir hata oluştu. Lütfen konsolu kontrol edin.").then(msg => msg.delete({ timeout: 5000 })); // Hata mesajını 5 saniye sonra otomatik olarak sil
  });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["edit", "mesajdüzenle"],
  permLevel: 0
};

exports.help = {
    name: 'Komut : [ʙᴏᴛ ᴍᴇsᴀᴊ ᴅüᴢᴇɴ]',
    description: "",
    usage: ',edit <mesaj id> <yeni mesaj>'
};