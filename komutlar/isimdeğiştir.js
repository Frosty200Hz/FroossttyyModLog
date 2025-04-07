const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

let cooldowns = new Map(); // Kullanıcılar için cooldown sürelerini saklamak

exports.run = async (client, message, args) => {
  // Mesaj Geçmişini Okuma izni kontrolü
  if (!message.member.hasPermission("READ_MESSAGE_HISTORY")) {
    return message.reply(`<:klan:1342237452990939166> Bunu yapabilmek için gerekli izne sahip değilsiniz!`);
  }

  // Kullanıcının cooldown kontrolü
  const userId = message.author.id;
  const currentTime = Date.now();
  
  // Kullanıcı daha önce komut kullanmış mı?
  if (cooldowns.has(userId)) {
    const lastUsed = cooldowns.get(userId);
    const diff = currentTime - lastUsed;
    
    // Eğer 1 gün geçmemişse, komutu engelle
    if (diff < 86400000) { // 86400000 ms = 1 gün
      const timeLeft = Math.floor((86400000 - diff) / 1000);
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;
      return message.reply(`<:klan:1342237452990939166> Bu komutu tekrar kullanabilmek için ${hours} saat ${minutes} dakika ${seconds} saniye daha beklemelisiniz.`);
    }
  }

  // Kullanıcı ve isim kontrolü
  let isim = args.slice(1).join(' ');
  let kullanici = message.mentions.users.first();
  if (!kullanici) return message.reply(`<:klan:1342237452990939166> Lütfen bir kullanıcı giriniz! \nDoğru Kullanım; \`${prefix}isim @${client.user.username}#${client.user.discriminator} \``);
  if (!isim) return message.reply(`<:klan:1342237452990939166> Lütfen bir kullanıcı adı giriniz! \nDoğru Kullanım; \`${prefix}isim @${client.user.username}#${client.user.discriminator} \``);
  if (isim.length > 32) return message.reply(`<:klan:1342237452990939166> Lütfen \`32\` karakteri geçmeyecek şekilde bir isim giriniz!`);

  // Kullanıcı adını değiştirme işlemi
  try {
    await message.guild.members.cache.get(kullanici.id).setNickname(isim);

    // Kullanıcı için son kullanım zamanını güncelle
    cooldowns.set(userId, currentTime);

    // Embed mesajını oluşturma
    const embed = new Discord.MessageEmbed()
      .setColor('#00FF00') // Rengi istediğiniz şekilde değiştirebilirsiniz
      .setDescription(`<:klan:1342237452990939166> Başarılı bir şekilde ${kullanici} kişinin kullanıcı adı <:klan:1342237452990939166> \`${isim}\` değiştirildi`)
      .setTimestamp()

    // Embed mesajı gönderme
    message.channel.send(embed);
  } catch (err) {
    console.error(err);
    message.reply(`<:klan:1342237452990939166> Takma ad değiştirilemedi. Bir hata oluştu.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isim'],
  permLevel: 0
};

exports.help = {
  name: 'isimdeğiştir',
  description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
  usage: 'isimdeğiştir @kullanıcı '
};
