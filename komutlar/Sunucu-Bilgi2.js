const Discord = require("discord.js");

exports.run = async (client, message, args, prefix, ayar, emoji) => {
  // Sunucu bilgilerini al
  const guild = message.guild;

  // Sunucudaki rol sayısını al
  const roleCount = guild.roles.cache.size;

  // Sunucudaki emoji sayısını al
  const emojiCount = guild.emojis.cache.size;

  // Sunucudaki kanal sayısını al
  const channelCount = guild.channels.cache.size;

  // Sunucudaki kategori sayısını al
  const categoryCount = guild.channels.cache.filter(ch => ch.type === 'category').size;

  // Sunucudaki ses kanalı sayısını al
  const voiceChannelCount = guild.channels.cache.filter(ch => ch.type === 'voice').size;

  // Sunucudaki metin kanalı sayısını al
  const textChannelCount = guild.channels.cache.filter(ch => ch.type === 'text').size;

  // Sunucunun güvenilirlik durumu (bot onaylı)
  const verificationLevel = guild.verificationLevel;

  // Sunucudaki takviye sayısını al (boost sayısı)
  const boostCount = guild.premiumSubscriptionCount;

  // Sunucunun seviyesini al
  const level = guild.premiumTier;

  // Embed mesajı oluştur
  const embeddd = new Discord.MessageEmbed()
    .setColor("GOLD")
    .setTitle("<:klan:1342237452990939166> [Sunucu] Bilgileri")
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setThumbnail(message.guild.iconURL())
    .setThumbnail(guild.iconURL())
    .addFields(
      { name: "📜 ・Rol Sayısı", value: `[${roleCount}]`, inline: true },
      { name: "😀 ・Emoji Sayısı", value: `[${emojiCount}]`, inline: true },
      { name: "📡 ・Kanal Sayısı", value: `[${channelCount}]`, inline: true },
      { name: "📂 ・Kategori Sayısı", value: `[${categoryCount}]`, inline: true },
      { name: "🔊 ・Ses Kanalı Sayısı", value: `[${voiceChannelCount}]`, inline: true },
      { name: "💬 ・Metin Kanalı Sayısı", value: `[${textChannelCount}]`, inline: true },
      { name: "✅ ・Güvenilirlik Seviyesi", value: `[${verificationLevel}]`, inline: true },
      { name: "🚀 ・Takviye (Boost) Sayısı", value: `[${boostCount}]`, inline: true },
      { name: "🌟 ・Sunucu Seviyesi", value: `[${level}]`, inline: true },
    );

  // Log kanalını al
  let logChannel = message.guild.channels.cache.find(ch => ch.name === "「→」・ᴅᴜʏᴜʀᴜ"); // Burada 'log-channel' kanalını kendi kanalınızın adıyla değiştirin
  if (!logChannel) return message.channel.send("Log kanalı bulunamadı.");

  // Log kanalına embed mesajını gönder
  logChannel.send(embeddd);

  // Kullanıcıya bilgilendirme mesajı gönder
  message.channel.send("Sunucu bilgileri log kanalına başarıyla gönderildi.");

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucubilgi', 'sunucubilgisi'],
  permLevel: 0
};

exports.help = {
  name: "sunucubilgi",
  description: "Sunucudaki çeşitli istatistikleri toplar ve log kanalına gönderir.",
  usage: "!sunucubilgi",
  kategori: "moderasyon"
};
