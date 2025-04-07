const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');
let kayıtlar = require('../veriler/kayıtlar.json');

module.exports.run = async (bot, message, args) => {
  const klog = message.guild.channels.cache.get("1196601005975027934");
  const sohbetKanal = message.guild.channels.cache.get("1196600269677535232");

  if (!message.member.roles.cache.has("1116750023623987302")) 
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Komutu kullanmak için <@&1116750023623987302> yetkisine sahip olmalısın.")
      .setColor("RED"));

  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user)
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`Kullanıcıyı etiketlemelisin! Örnek: \`${ayarlar.prefix}kadın @kullanıcı İsim Yaş\``)
      .setColor("RED"));

  const isim = args[1];
  const yaş = args[2];

  if (!isim || !yaş)
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`Eksik bilgi! Doğru kullanım: \`${ayarlar.prefix}kadın @kullanıcı İsim Yaş\``)
      .setColor("PİNK"));

  // Kayıt sayısını güncelle
  const id = message.author.id;
  if (!kayıtlar[id]) kayıtlar[id] = 0;
  kayıtlar[id]++;
  fs.writeFileSync('./veriler/kayıtlar.json', JSON.stringify(kayıtlar, null, 2));

  const embed = new Discord.MessageEmbed()
    .setDescription(`
\`👤 Kayıt Eden Yetkili:\` ${message.author}
\`👩 Kayıt Edilen Kullanıcı:\` ${user}
\`🎭 Verilen Rol:\` <@&1240083457518997544>
\`📤 Alınan Rol:\` <@&1116750038081732710>
\`📊 Kayıt Sayın:\` **[${kayıtlar[id]}]**
`)
    .setColor("PINK")
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

  klog.send(embed);
  sohbetKanal.send(embed);

  await user.roles.add('1240083457518997544');
  await user.roles.remove('1116750038081732710');
  await user.setNickname(`〔👩〕・ ${isim} : [${yaş}]`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kadın"],
  permLevel: 0
};

exports.help = {
  name: 'kadın',
  description: 'Kullanıcıyı kadın olarak kayıt eder.',
  usage: 'kadın @kullanıcı İsim Yaş'
};
