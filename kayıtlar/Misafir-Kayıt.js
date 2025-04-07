const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
let kayıtlar = require('../veriler/kayıtlar.json'); // kayıt sayısı dosyası

module.exports.run = async (bot, message, args) => {
  const klog = message.guild.channels.cache.get("1196601005975027934");
  const sohbetKanal = message.guild.channels.cache.get("1196600269677535232");

  if (!message.member.roles.cache.has("1116750023623987302")) 
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Komutu kullanmak için <@&1116750023623987302> yetkisine sahip olman gerek.")
      .setColor("RED"));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user)
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`Kullanıcıyı etiketlemelisin! Örnek: \`${ayarlar.prefix}erkek @kullanıcı İsim Yaş\``)
      .setColor("RED"));

  const isim = args[1];
  const yaş = args[2];

  if (!isim || !yaş)
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`Eksik bilgi! Doğru kullanım: \`${ayarlar.prefix}erkek @kullanıcı İsim Yaş\``)
      .setColor("RED"));

  try {
    await user.roles.add('1240083408605151332');
    await user.roles.remove('1116750038081732710');

    // === KAYIT SAYISI TUTMA ===
    let id = message.author.id;
    if (!kayıtlar[id]) kayıtlar[id] = 0;
    kayıtlar[id]++;
    fs.writeFileSync('./veriler/kayıtlar.json', JSON.stringify(kayıtlar, null, 2));

    // === EMBED ===
    const embed01 = new Discord.MessageEmbed()
      .setDescription(`
\`👤 Kayıt Eden Yetkili:\` \n${message.author}
\`👥 Kayıt Edilen Kullanıcı:\` \n${user}
\`🎭 Verilen Rol:\` <@&1240083408605151332>  
\`📤 Alınan Rol:\` <@&1116750038081732710>
\`📊 Kayıt Sayın:\` **[${kayıtlar[id]}]**
`)
      .setColor("RED")
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }));

    klog.send(embed01);
    sohbetKanal.send(embed01);

    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) 
      return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Botun **Üyeleri Yönet** yetkisi yok! Nick değiştiremem.")
        .setColor("RED"));

    await user.setNickname(`〔🧑〕・ ${isim} : [${yaş}]`);

  } catch (err) {
    console.error("Hata oluştu:", err);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek"],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
  description: 'Kullanıcıyı erkek olarak kayıt eder.',
  usage: 'erkek @kullanıcı İsim Yaş'
};