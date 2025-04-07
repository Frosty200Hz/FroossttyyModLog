const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;

  const sebep = args.join(" "); // Kullanıcının sebebini al

  let kullanıcı = message.guild.members.cache.get(message.author.id);
  const b = kullanıcı.displayName;

  // Sebep girilmediyse "Sebep Girilmemiş" mesajını atıyoruz
  if (!sebep) {
    await db.set(
      `afkSebep_${message.author.id}_${message.guild.id}`,
      "Sebep Girilmemiş"
    );
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);

    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    message.channel.send(`<:owner:1266391560883539968> Sunucuda Başarıyla [AFK] Oldunuz Girilen Sebep: ${a}`);

    // Kullanıcının takma adını değiştir
    try {
      message.member.setNickname(`[AFK] ` + b); // AFK tag'ını ekliyoruz
    } catch (error) {
      console.error("Takma ad değiştirilirken bir hata oluştu:", error);
      message.channel.send("Takma adınızı değiştirme yetkim yok veya bir hata oluştu.");
    }
  } else {
    // Sebep uzunluğu kontrolü ve AFK olma
    if (sebep.length > 100) {
      return message.channel.send("Sebep 100 karakterden uzun olamaz. Lütfen daha kısa bir sebep girin.");
    }

    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id);
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);

    const a = await db.fetch(`afkSebep_${message.author.id}_${message.guild.id}`);

    message.channel.send(`<:owner:1266391560883539968> Sunucuda Başarıyla [AFK] Oldunuz Girilen Sebep: ${a}`);

    // Kullanıcının takma adını değiştir
    try {
      message.member.setNickname(`[AFK] ` + b); // AFK tag'ını ekliyoruz
    } catch (error) {
      console.error("Takma ad değiştirilirken bir hata oluştu:", error);
      message.channel.send("Takma adınızı değiştirme yetkim yok veya bir hata oluştu.");
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk [sebep]"
};
